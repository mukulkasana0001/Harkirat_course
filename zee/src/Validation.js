import { checkInTime, checkOutTime, date, department, emailAddress, finalCheck, mobNumber, personName } from "./common.js";
import { removeError } from "./removeError.js";
import { showError } from "./showError.js";


function validatePersonName(pName) {
     try {
          if (pName.length < 4) throw new Error("Enter Valid  Name");

          finalCheck.personName=true
          removeError(personName)
          return true
     } catch (error) {
          finalCheck.personName=false
          showError(personName,error.message)
          console.log(error.message)
     }
}

function validateEmailAddress(pEmail) {
     try {
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!pattern.test(pEmail)) throw new Error("Enter Valid  Email");

          finalCheck.emailAddress=true
          removeError(emailAddress)
          return true
     } catch (error) {
          finalCheck.emailAddress=false
          showError(emailAddress,error.message)
          console.log(error.message)
     }
}
function validateMobNumber(pnumber) {
     try {
          console.log(pnumber.length !== 10 || Number(pnumber) < 1)
          if (pnumber.length !== 10 || Number(pnumber) < 1) throw new Error("Enter Valid  Email");

          finalCheck.mobNumber=true
          removeError(mobNumber)
          return true
     } catch (error) {
          finalCheck.mobNumber=false
          showError(mobNumber,error.message)
          console.log(error.message)
     }
}

function validateDepartment(pdepartment) {
     try {
          if (pdepartment.length < 2) throw new Error("Enter Valid  Department");

          finalCheck.department=true
           removeError(department)
          return true
     } catch (error) {
          finalCheck.department=false
          showError(department,error.message)
          console.log(error.message)
     }
}

function validateDate(pdate) {
     try {
          console.log(Date.parse(pdate) <= Date.now())
          if (!pdate) throw new Error("Enter Valid  Date");

          finalCheck.date=true
          removeError(date)
          return true
     } catch (error) {
          finalCheck.date=false
          showError(date,error.message)
          console.log(error.message)
     }
}

function validateCheckInTime(pCheckInTime) {
     try {
          if (!pCheckInTime) throw new Error("Enter Valid  Date");
          let [hours, minutes] = pCheckInTime.split(":")

          let currentDate = new Date()
         if (Number(hours) > currentDate.getHours()) {
               throw new Error("Enter Valid  Time")
          }
          if (hours === currentDate.getHours() && minutes >currentDate.getMinutes() )throw new Error("Enter Valid Time")
              


               finalCheck.checkInTime=true
                removeError(checkInTime)
               return true
     } catch (error) {
          finalCheck.checkInTime=false
          showError(checkInTime,error.message)
          console.log(error.message)
     }
}

function validateCheckOutTime(pCheckOutTime) {
     try {
          if (!pCheckOutTime) throw new Error("Enter Valid  Date");
          let [hours, minutes] = pCheckOutTime.split(":")

          let currentDate = new Date()
          if (Number(hours) > currentDate.getHours()) {
               throw new Error("Enter Valid  Time")
          }
          if (hours === currentDate.getHours() && minutes >currentDate.getMinutes() )throw new Error("Enter Valid Time")
              

               finalCheck.checkOutTime=true
               removeError(checkOutTime)
               return true

     } catch (error) {
          finalCheck.checkOutTime=false
          showError(checkOutTime,error.message)
          console.log(error.message)
     }
}

function velidateAttendenceStatus(pAttendenceStatus) {
     try {
          if (!pAttendenceStatus) throw new Error("Enter Valid  Date");
               return true

     } catch (error) {
          console.log(error.message)
     }
}


export { validatePersonName, validateEmailAddress, validateMobNumber, validateDepartment, velidateAttendenceStatus,validateDate, validateCheckInTime, validateCheckOutTime }