import Express, { type NextFunction, type Request, type Response } from 'express'
import { WebSocketServer, WebSocket } from 'ws';
import { Client } from 'pg'
import Jwt, { type JwtPayload } from 'jsonwebtoken'

import dotenv from "dotenv";
dotenv.config();

const JWTSECRET = process.env.JWTSECRET as string;
const POSTGRESSURL = process.env.POSTGRESSURL as string;

const app = Express()

const client = new Client({
    connectionString: POSTGRESSURL
})

client.connect()

// ###### websockit    ###########

const wss = new WebSocketServer({ port: 8080 })



type clientSockit = {
    Sockit: WebSocket;
    user_id: number
};

type riderSockit = {
    Sockit: WebSocket;
    user_id: number
};



let forCommunication: {
    client: clientSockit[];
    rider: riderSockit[];
} = {
    client: [],
    rider: [],
};

wss.on("connection", (socket) => {
    // socket.send("connected ");


    socket.on("message", (e) => {

        const data = JSON.parse(e.toString());
        const { token, type } = data;
        const decoded = Jwt.verify(token, JWTSECRET);
        const user_id = (decoded as JwtPayload).id;

        if (type === "rider") {
            forCommunication.rider.push({ Sockit: socket, user_id });

            socket.send(JSON.stringify({ msg: "Registered as rider" }));
        } else if (type === "client") {
            forCommunication.client.push({ Sockit: socket, user_id });
            socket.send(JSON.stringify({ msg: "Registered as client" }));
        }


    });

    socket.on("close", () => {
        forCommunication.client = forCommunication.client.filter(c => c.Sockit !== socket);
        forCommunication.rider = forCommunication.rider.filter(r => r.Sockit !== socket);
    });

})


// ###### websockit    ###########











app.use(Express.json())

app.post("/signup", async (req, res) => {
    const type = req.body.type
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email


    const values = [username, email, password]
    let query = "";
    if (type == "client") {
        query = "INSERT INTO client (username, email, password) VALUES ($1,$2,$3);"

    } else if (type == "rider") {
        query = "INSERT INTO rider (username, email, password) VALUES ($1,$2,$3);"
    } else {
        res.json({
            msg: "choose valide type: client or rider"
        })
        return;
    }

    await client.query(query, values)


    res.json({
        msg: "signup successfully"
    })
})


app.post("/signin", async (req, res) => {

    const type = req.body.type
    const email = req.body.email;
    const password = req.body.password;

    const values = [email, password]
    let query = "";
    if (type == "client") {
        query = 'SELECT id FROM client WHERE email = $1 AND password = $2;'

    } else if (type == "rider") {
        query = 'SELECT id FROM rider WHERE email = $1 AND password = $2;'
    } else {
        res.json({
            msg: "choose valide type: client or rider"
        })
        return;
    }

    const founduser = await client.query(query, values)

    if (founduser.rows.length > 0) {
        const jwtToken = Jwt.sign({
            id: founduser.rows[0].id
        }, JWTSECRET)

        res.json({
            token: jwtToken
        })
    } else {
        res.json({
            msg: "user not exist"
        })
    }


})

const usermiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.token;

    const founduser = Jwt.verify(token as string, JWTSECRET);


    if (founduser) {
        //@ts-ignore
        req.userId = (founduser as JwtPayload).id;;
        next();
    }
    else {
        res.json({
            msg: "NOT LOGED IN "
        })
    }


}


app.post("/client/bookride", usermiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const target = req.body.target;
    const destination = req.body.destination
    let query = "INSERT INTO targettodestination (user_id,target, destination) VALUES ($1,$2,$3);"

    let values = [userId, target, destination]
    await client.query(query, values)

    res.json({
        msg: `Request from ${target} to ${destination} conformed`
    })
})

app.post("/rider/updatelocation", usermiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const currentlocation = req.body.currentlocation;
    const isactive = req.body.isactive
    let query = "INSERT INTO activerider (user_id,currentlocation, isactive) VALUES ($1,$2,$3);"

    let values = [userId, currentlocation, isactive]
    await client.query(query, values)

    res.json({
        msg: `current location:${currentlocation} Active:${isactive}`
    })
})

app.get("/client/avilablerider", usermiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;

    let query = 'SELECT target FROM targettodestination WHERE (user_id) = $1 ;'

    let values = [userId]

    const target = (await client.query(query, values)).rows[0].target
    console.log("target : ", target)

    let query2 = 'SELECT r.id, r.username, r.email, a.currentlocation, a.isactive FROM activerider a JOIN rider r ON a.user_id = r.id WHERE a.currentlocation = $1 AND a.isactive = TRUE;'

    let values2 = [target]

    const avilbleriders = await client.query(query2, values2)

    res.json({
        AvilableRiders: avilbleriders.rows
    })

})





app.post("/client/sendmessage", usermiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const { rider_id, message } = req.body;

    const neededriderSocket = forCommunication.rider.find(r => r.user_id === rider_id);

    if (!neededriderSocket) {
        return res.status(404).json({ msg: "Rider not connected" });
    }

    neededriderSocket.Sockit.send(
        JSON.stringify({
            from: userId,
            message
        }));

    res.json({ msg: `Message sent to rider: ${neededriderSocket} ` });
});


app.post("/rider/sendmessage", usermiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const { client_id, message } = req.body;

    const neededclientSocket = forCommunication.client.find(r => r.user_id === client_id);

    if (!neededclientSocket) {
        return res.status(404).json({ msg: "client not connected" });
    }

    neededclientSocket.Sockit.send(
        JSON.stringify({
            from: userId,
            message
        }));

    res.json({ msg: `Message sent to client: ${neededclientSocket} ` });
});





app.listen(3000)