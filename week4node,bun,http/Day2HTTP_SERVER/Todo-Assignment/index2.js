import express from 'express'
import fs from "fs"

const app = express()


app.use(express.json());


app.post('/', function (req, res) {

    const title = req.body.title;
    const userNo = req.body.userNo;
    const Id = Math.random().toString(36).substring(2, 10).toUpperCase();
    console.log(Id)

    fs.readFile('./todo.txt', 'utf-8', (err, fileData) => {
        let data = [];


        if (err) {
            res.json({
                msg: "ERROR = " + err
            })
        }
        else {
            if (fileData) {
                try {
                    data = JSON.parse(fileData);
                } catch (parseError) {
                    return res.status(500).json({ msg: "Failed to parse todo file." });
                }

                if (data.length > 0) {
                    let t = 0
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].userNo == userNo) {
                            data[i].todo.push({ id: Id, title });
                            t++;
                            break;
                        }

                    }
                    if (t == 0) {
                        data.push({
                            userNo,
                            todo: [{ id: Id, title }]
                        }
                        )
                    }

                }
                else {
                    data = [{
                        userNo,
                        todo: [{
                            id: Id,
                            title
                        }]
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

            }else{
                 res.json({
                    msg: "EMPTY FILE"
                })
            }

        }


    })

})

app.delete('/', function (req, res) {
    const userNo = req.body.userNo;
    const todoID = req.body.todoID;

    fs.readFile('./todo.txt', 'utf-8', (err, fileData) => {
        let data = [];
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
                for (let i = 0; i < data.length; i++) {
                    if (data[i].userNo == userNo) {
                        for (let j = 0; j < data[i].todo.length; j++) {
                            if (data[i].todo[j].id == todoID) {
                                data[i].todo.splice(j, 1);
                                break;
                            }

                        }
                    }
                }
                data = JSON.stringify(data)
                fs.writeFile('./todo.txt', data, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing file:', err);
                    } else {
                        res.json({
                            msg: "user = " + userNo + " Todo id = " + todoID + " deleted successfully "
                        })
                    }
                })


            } else {
                res.json({
                    msg: "EMPTY FILE"
                })
            }

        }


    })



})

app.get('/', function (req, res) {

    fs.readFile('./todo.txt', 'utf-8', (err, fileData) => {
        let data = []
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
            } else {
                res.json({
                    msg: "EMPTY FILE"
                })
            }
        }

    })

})


app.listen(3000)