import { attendenceStatus, checkInTime, checkOutTime, data, date, department, emailAddress, finalCheck, mobNumber, persondata, personName } from "./common.js";

function editPreviousdata(index) {

    let toEditData = data[index]
  console.log("edited",toEditData)
    persondata.personName = personName.value = toEditData.personName
    persondata.emailAddress = emailAddress.value = toEditData.emailAddress
    persondata.mobNumber = mobNumber.value = toEditData.mobNumber
    persondata.department = department.value = toEditData.department
    persondata.date = date.value = toEditData.date
    persondata.checkInTime = checkInTime.value = toEditData.checkInTime
    persondata.checkOutTime = checkOutTime.value = toEditData.checkOutTime
    persondata.attendenceStatus = attendenceStatus.value = toEditData.attendenceStatus



    finalCheck.personName = true
    finalCheck.emailAddress = true
    finalCheck.mobNumber = true
    finalCheck.department = true
    finalCheck.date = true
    finalCheck.checkInTime = true
    finalCheck.checkOutTime = true
}

export { editPreviousdata }













