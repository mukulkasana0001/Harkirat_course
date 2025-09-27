import  Express  from 'express'
import { Client } from 'pg'

const app = Express()

const client = new Client({
     connectionString:  'add here from neon console website '
})

async function createUsersTable() {
    await client.connect()
    const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log(result)
}

createUsersTable();


app.post("/signup",async(req,res)=>{
   
    const username=  req.body.username;
    const password=  req.body.password;
    const email = req.body.email
    let query = "INSERT INTO users (username, email, password) VALUES ($1,$2,$3);"
    await client.query('INSERT INTO users (username, email, password) VALUES ("mukul","kasana@gmail.com",12345678);')


    res.json({
     msg:"signup successfully"
    })
})

const result = await client.query('SELECT * FROM USERS;')
console.log(result)

app.listen(3000)