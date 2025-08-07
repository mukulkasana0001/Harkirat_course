import express from 'express'
import fs from "fs"

const app = express()

// let user= {
//     1:{
//         todos:[]
//     },
//     2:{
//         todos:[]
//     }
// }


app.use(express.json());
app.post('/', function (req, res) {

    const title = req.body.title;
    const userNo = req.body.userNo;

    fs.readFile('./todo.txt', 'utf-8', (err, fileData) => {
        let data = [];

        if (!err && fileData) {
            try {
                data = JSON.parse(fileData);
            } catch (parseError) {
                return res.status(500).json({ msg: "Failed to parse todo file." });
            }
        }

        if (data.length > 0) {
            let t = 0
            for (let i = 0; i < data.length; i++) {
                if (data[i].userNo == userNo) {
                    data[i].todo.push(title);
                    t++;
                }

            }
            if (t == 0) {
                data.push({
                    userNo,
                    todo: [title]
                }
                )
            }

        }
        else {
            data = [{
                userNo,
                todo: [title]
            }
            ]
        }
        data = JSON.stringify(data)
        fs.writeFile('./todo.txt', data, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                res.json({
                    msg: "Todo added successfully."
                })
            }
        })
    })

})

// app.delete('/', function (req, res) {
//     const userNo = req.body.userNo;
//     const todoNo  = req.body.todoNo;




// })

app.get('/', function (req, res) {

    fs.readFile('./todo.txt', 'utf-8', (err, fileData) => {
        let data=[]
        if (err) {
            res.json({
                msg: "ERROR = " + err
            })
        } else {

        if (fileData) {
            try {
                data = JSON.parse(fileData);
            } catch (parseError) {
                return res.status(500).json({ msg: "Failed to parse todo file." });
            }
            res.json({
                data
            })
        }
        }

    })

})


app.listen(3000)