import type { ReactElement } from "react";


interface ButtonParameter {
    text: string;
    size: "sm" | "md" | "lg";
    startIcon?: ReactElement;
    onClick?: () => void;
    varient: "primary" | "secondary";

}


const buttonsize = {
    "sm": "w-20",
    "md": "w-30",
    "lg": "w-60"

}
const buttonvarient = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"

}
const defaultStyles = "px-4 py-2  rounded-md font-light  flex items-center";

export const Button = (props: ButtonParameter) => {
    return <>
        <button onClick={props.onClick} className={`justify-evenly cursor-pointer ${defaultStyles} ${buttonsize[props.size]} ${buttonvarient[props.varient]}  `}>
            <div className="pr-2 ">
                {props.startIcon}
            </div>
            {props.text}
        </button>
    </>
}