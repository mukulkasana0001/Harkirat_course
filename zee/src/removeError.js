function removeError(element){
    console.log(element)
    if(!element.parentElement.querySelector(".error").classList.contains("hidden")){
element.parentElement.querySelector(".error").classList.add("hidden")
    }  
}

export {removeError}