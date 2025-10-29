import React from "react"
type inputboxtype={
  label ?:string,
  placeholder:string,
  refrence?: React.Ref<HTMLInputElement>
}

export function InputBox({label, placeholder,refrence}:inputboxtype) {
    return <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input ref={refrence} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}