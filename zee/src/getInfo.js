import { attendenceStatus, checkInTime, checkOutTime, date, department, emailAddress, mobNumber, personName } from "./common.js";

import { validateCheckInTime, validateCheckOutTime, validateDate, validateDepartment, validateEmailAddress, validateMobNumber, validatePersonName, velidateAttendenceStatus } from "./Validation.js";




function getpersonName(){
     let pName= personName.value.trim()
     if(validatePersonName(pName)) return pName;
}

function getEmailAddress(){
     
     let pEmail= emailAddress.value.trim()
     if(validateEmailAddress(pEmail)) return pEmail;
}

function getMobNumber(){
     let pnumber= mobNumber.value.trim()
     if(validateMobNumber(pnumber)) return pnumber;
}

function getDepartment(){
     let pdepartment= department.value.trim()
     if(validateDepartment(pdepartment)) return pdepartment;
}

function getDate(){
     let pdate= date.value
     console.log(pdate)
     if(validateDate(pdate)) return pdate;
}

function getCheckInTime(){
     let pCheckInTime= checkInTime.value
     console.log("in gret",pCheckInTime)
     if(validateCheckInTime(pCheckInTime)) return pCheckInTime;
}

function getCheckOutTime(){
     let pCheckOutTime= checkOutTime.value
     console.log(pCheckOutTime)
     if(validateCheckOutTime(pCheckOutTime)) return pCheckOutTime;
}
function getAttendenceStatus(){
     let pAttendenceStatus= attendenceStatus.value
     console.log(pAttendenceStatus)
     if(velidateAttendenceStatus(pAttendenceStatus)) return pAttendenceStatus;
}

export {getpersonName,getEmailAddress,getMobNumber,getDepartment,getDate,getCheckInTime,getAttendenceStatus,getCheckOutTime}