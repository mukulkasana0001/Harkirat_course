// Q: Write a function that
//   Reads the contents of a file
//   Trims the extra space from the left and right
//   Writes it back to the file


 const fs = require("fs");

  function cleanFile(filepath,cb){
    return new Promise((resolve) => {
        fs.readFile(filepath,"utf-8",(err,data)=>{
        data= data.trim();
        fs.writeFile(filepath,data,()=>{
            resolve()
        })
        })
    })
  }


 function fun(){
  console.log("done cleaning file fun  ")
 }


 function main() {
    let p=  cleanFile("./a.txt").then(fun)
    console.log(p);
   console.log("Done cleaning file");
}


main();
