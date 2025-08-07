/* Question. Create a todo on your own HTTP server:
1.) Where you can perform the CRUD Operations
2.) Store the data of todos in json file example - todo.json
 */

import express from 'express'
import fs from "fs"

const app = express()

let todos = [];
// store the data into file 
// may be file called todo.json
// you me also add one thingh that is   seprate todos for each user 
// let user= {
//     1:{
//         todos:[]
//     },
//     2:{
//         todos:[]
//     }...
// }
app.use(express.json());   
let id = 0;
app.post('/', function (req, res) {

        const  title= req.body.title;
        
    todos.push({
        // create random id for todo 
        // extract todo title from body
        title,
        id
    })
    res.json({
           msg: "CREATED Todo ID = " + id
        })
        
    id++;
})

app.delete('/', function (req, res) {

    //    extract todo id from todo
    // remove the dodo from here 
    const key=req.body.key;
    for (let i = 0; i < todos.length; i++) {
         if(todos[i].id==key){
            todos.splice(i, 1);
         }
    }
     
        res.json({
           msg: 'Delete TODO ID = ' + key
        })
})

app.get('/', function (req, res) {

    if (todos.length >0) {
        res.json({
            todos
        })
    }
    else {
     res.json({
        msg:"Empty TODO NO Data"
     })
    }

})


app.listen(3000)