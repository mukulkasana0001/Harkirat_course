type SubHeadingprops = {
    label: string;
    style?:string;
}


export function SubHeading({label,style}:SubHeadingprops) {
  console.log(style)
  return <div className={`text-slate-500 text-md pt-1 px-4 pb-4 ${style} `}>
    {label}
  </div>
}