import { data } from "./common.js";
import { displayPage, setupPagination } from "./Pagination.js";
// import { updateTableUI } from "./updateTableUI.js";

function getSearch(searchValue){

    
    const filteredData= data.filter((item)=>{
            let str=`${item.emailAddress} ${item.personName} ${item.department} `
               
            return str.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    })
 
    // updateTableUI(filteredData)
     displayPage(1,filteredData);
    setupPagination(filteredData);
}




function SortBYAttendence(){
    const arr= data.toSorted((itema,tiemb) => itema.attendenceStatus.toLowerCase().localeCompare(tiemb.attendenceStatus.toLowerCase()))

    // updateTableUI(arr)
    displayPage(1,arr);
    setupPagination(arr);
}

function SortBYDate(){
    //   console.log(data[0].date.split("-").join(""))
    const arr= data.toSorted((a, b) =>  Number(b.date.split("-").join("")) - Number(a.date.split("-").join(""))   )
    // updateTableUI(arr)
     displayPage(1,arr);
    setupPagination(arr);
}

export {getSearch,SortBYAttendence,SortBYDate}