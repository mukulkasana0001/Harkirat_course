
import { personName, emailAddress, mobNumber, persondata, department, checkInTime, date, checkOutTime, attendenceStatus, form, finalCheck, removeTopUP, addRecord, data, totalRecord, totalPresent, cancleSubmit, search, sortBy } from "./common.js"
import { getAttendenceStatus, getCheckInTime, getCheckOutTime, getDate, getDepartment, getEmailAddress, getMobNumber, getpersonName } from "./getInfo.js";
import { getTotalPresent, getTotalRecord } from "./getTotal_record_present.js";
import { displayPage, setupPagination } from "./Pagination.js";
import { generateRandomId } from "./randomId.js";
import { getSearch, SortBYAttendence, SortBYDate } from "./searchTofilter.js";




// toalrecord
totalRecord.textContent = getTotalRecord()
// totalPresent
totalPresent.textContent = getTotalPresent()
// Initial load
displayPage(1, data);
setupPagination(data);


personName.addEventListener('blur', () => {
     persondata.personName = getpersonName()
     console.log(persondata)
})


emailAddress.addEventListener('blur', () => {
     persondata.emailAddress = getEmailAddress()
     console.log(persondata)
})

mobNumber.addEventListener('blur', () => {
     persondata.mobNumber = getMobNumber()
     console.log(persondata)
})

department.addEventListener('blur', () => {
     persondata.department = getDepartment()
     console.log(persondata)
})

date.addEventListener('blur', () => {
     persondata.date = getDate()
     console.log(persondata)
})

checkInTime.addEventListener('blur', () => {

     persondata.checkInTime = getCheckInTime()
     console.log(persondata)
})

checkOutTime.addEventListener('blur', () => {
     persondata.checkOutTime = getCheckOutTime()
     console.log(persondata)
})

attendenceStatus.addEventListener('change', () => {
     persondata.attendenceStatus = getAttendenceStatus()
     console.log(persondata)

})






form.addEventListener("submit", (e) => {
     e.preventDefault()

     if (Object.values(finalCheck).includes(false)) return


     const id = generateRandomId(12)

     persondata.id = `ATD-${id}`
     data.push(structuredClone(persondata))
     console.log(data)

     totalRecord.textContent = getTotalRecord()
     totalPresent.textContent = getTotalPresent()


     localStorage.setItem("data", JSON.stringify(data))

     displayPage(1, data);
     setupPagination(data);
     form.reset()

     if (!form.classList.contains("hidden")) {
          form.classList.add("hidden")
     }
     persondata.attendenceStatus = attendenceStatus.value

})

cancleSubmit.addEventListener('click', () => {
     if (!form.classList.contains("hidden")) {
          form.classList.add("hidden")
     }
     form.reset()
})



removeTopUP.addEventListener('click', () => {
     if (!form.classList.contains("hidden")) {
          form.classList.add("hidden")
     }
})



addRecord.addEventListener("click", () => {
     if (cancleSubmit.classList.contains("hidden")) {
          cancleSubmit.classList.remove("hidden")
     }
     if (form.classList.contains("hidden")) {
          form.classList.remove("hidden")
     }
})


search.addEventListener('blur', () => {
     getSearch(search.value)
})


sortBy.addEventListener("change", () => {
     console.log(sortBy.value)
     if (sortBy.value == "attendenceStatus") {
          SortBYAttendence()
     } else {
          SortBYDate()
     }
})







