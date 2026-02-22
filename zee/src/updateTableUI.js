import { cancleSubmit, data, dataTable, form, paginationInFO } from "./common.js"
import { editPreviousdata } from "./EditPreviousData.js";
import { displayPage, setupPagination } from "./Pagination.js";

function updateTableUI(datas) {
    console.log(datas)
    let str = ""
    datas.forEach(item => {
        let color = ""
        if (item.attendenceStatus == "Present") {
            color = 'bg-[#1a2a3a]'
        }
        if (item.attendenceStatus == "Absent") {
            color = 'bg-[#242537]'
        }
        if (item.attendenceStatus == "Late") {
            color = 'bg-[#262a35]'
        }
        str += `<tr class="flex parent border-b border-slate-700  flex-row font-light  border  ${color}  space-x-9 p-5 ">
               
                    <th class="w-50 targetID " >${item.id}</th>
                    <th class="w-30" >${item.personName}</th>
                    <th class="w-60" >${item.emailAddress}</th>
                    <th class="w-50" >${item.mobNumber}</th>
                    <th class="w-30 " >${item.department}</th>
                    <th class="w-30" >${item.date}</th>
                    <th class="w-20" >${item.checkInTime}</th>
                    <th class="w-20" >${item.checkOutTime}</th>
                    <th class="w-20" >${item.attendenceStatus}</th>
                    <th class="w-20   flex flex-row justify-around " >
                        <button class=" editData border rounded border-red-500">🖋️</button>
                       <button class="  removeData  border rounded border-red-500">🚮</button>
                     </th>
                </tr>
              `;
    });



    const tablestr = `
     <table class="  text-left border border-gray-700  text-slate-300 border-collapse  ">
                <tr class=" flex flex-row border  space-x-9 p-2    ">
                    <th class="w-50 ">Redord id </th>
                    <th class="w-30 " >Person name</th>
                    <th class="w-60 " >Email</th>
                    <th class="w-50 " >mobile number</th>
                    <th class="w-30 " >Department Class</th>
                    <th class="w-30 " >Date</th>
                    <th class="w-20 " >Check-in time</th>
                    <th class="w-20 " >Check-out time</th>
                    <th class="w-20 " >Status</th>
                    <th class="w-20 " >Action</th>
                </tr>
                ${str}
            </table>
    `
    




          



    




    

    dataTable.innerHTML = tablestr


    dataTable.addEventListener("click", (e) => {

        let val = e.target.closest(".parent").querySelector(".targetID").textContent
         console.log(val)
        const index = data.findIndex((item) => {
            return item.id == val
        })
            console.log("index: ",index)
        //  delete current index
        if (e.target.classList.contains("removeData")) {
            alert("are you sure")

            if (index == -1) return

            data.splice(index, 1)
            localStorage.setItem("data", JSON.stringify(data))
            // updateTableUI(data)
            displayPage(paginationInFO.currentPage, data);
            setupPagination(data);
        }

        // exit current index
        if (e.target.classList.contains("editData")) {
            if (!cancleSubmit.classList.contains("hidden")) {
                cancleSubmit.classList.add("hidden")
            }

           if (index == -1) return

            if (form.classList.contains("hidden")) {
                form.classList.remove("hidden")
            }
            
            editPreviousdata(index);
            data.splice(index, 1)
            localStorage.setItem("data", JSON.stringify(data))
            // updateTableUI(data)
            displayPage(paginationInFO.currentPage, data);
            setupPagination(data)
        }


    })

}

export { updateTableUI }