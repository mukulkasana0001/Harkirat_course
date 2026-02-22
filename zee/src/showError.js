
function showError(element,msg){

    if(element.parentElement.querySelector(".error").classList.contains("hidden")){
       console.log(element.parentElement.querySelector(".error").classList.remove("hidden"))
       console.log(element.parentElement.querySelector(".error").textContent=msg)
    }

}
export {showError}