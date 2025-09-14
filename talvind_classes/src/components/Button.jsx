export function Button({ disable, children }) {


    return <>
        <button className={`cursor-pointer border-4 rounded-3xl w-50 h-10 text-center  ${disable ? "bg-amber-400" : "bg-gray-500"}`} >
            {children}
        </button>
    </>
}