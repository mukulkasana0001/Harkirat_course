class promise2{
    constructor(fn){
        let  afterdon = ()=>{
                 this.callback(); 
        }
          fn(afterdon);
         
    }
    then(callback){
        this.callback = callback;
    }
}


function reading(resolve){
    setTimeout(function (){
        console.log("after 3 sec");
        resolve();
    }, 3000);
}


  function cll(){
    console.log("all is done")
  }
 
p= new promise2(reading);

p.then(cll)
