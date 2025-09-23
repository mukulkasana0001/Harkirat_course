export const randomHash=(nums:number)=>{
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
   let ans = "";
   let length = str.length;
    for(let i=0;i<nums;i++){
      
        ans += str[Math.floor( Math.random() * length)]
        
    }
    console.log(ans)
    return ans;
}