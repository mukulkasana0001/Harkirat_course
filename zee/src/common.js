const personName = document.querySelector("#personName")
const emailAddress = document.querySelector("#emailAddress")
const mobNumber = document.querySelector("#mobNumber")
const department = document.querySelector("#department")
const date = document.querySelector("#date")
const checkInTime = document.querySelector("#checkInTime")
const checkOutTime = document.querySelector("#checkOutTime")
const attendenceStatus = document.querySelector("#attendenceStatus")
const erroetext=document.querySelector(".error")
const removeTopUP=document.querySelector(".removeTopUP")
const addRecord=document.querySelector(".addRecord")
const totalRecord=document.querySelector(".totalRecord")
const totalPresent=document.querySelector(".totalPresent")
const dataTable=document.querySelector(".dataTable")
const cancleSubmit = document.querySelector(".cancleSubmit")
const search = document.querySelector("#search")
const sortBy= document.querySelector("#sortBy")
const paginationContainer = document.getElementById('pagination-container');

const  paginationInFO = {
 itemsPerPage :5,
 currentPage : 1,
}

console.log("S :",sortBy.value)

console.log(erroetext)

// const  submit = document.querySelector("#submit")
const form = document.querySelector("form")
console.log("form")

const data = JSON.parse(localStorage.getItem("data"))??[]

const persondata={}
persondata.attendenceStatus=attendenceStatus.value;
const finalCheck={
    personName:false,
    emailAddress:false,
    mobNumber:false,
    department:false,
    date:false,
    checkInTime:false,
    checkOutTime:false,
}



export {paginationContainer,paginationInFO,sortBy,search,cancleSubmit,totalPresent,dataTable,totalRecord,addRecord,finalCheck,removeTopUP,form,personName,emailAddress,mobNumber,department,data,persondata,checkInTime,date,checkOutTime,attendenceStatus}

