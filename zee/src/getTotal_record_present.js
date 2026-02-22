import { data } from "./common.js"

function getTotalRecord() {
      return data.length
}


function getTotalPresent() {
      console.log("present: ")
      const val = data.reduce((count, item) => {
            if (item.attendenceStatus === "Present") {
                  return count + 1
            }
            return count
      }, 0)
      console.log("val: ", val)
      return val
}
export { getTotalRecord, getTotalPresent }