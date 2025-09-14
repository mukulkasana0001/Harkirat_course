import { useCallback, useRef } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { useSetRecoilState } from "recoil";
import { Disableatom } from "./Atom";
import Clock from "./Clock";

export function Otp() {

    const setdisable = useSetRecoilState(Disableatom);

    const refrence = useRef([]);

    // const refrence1 = useRef();
    // const refrence2 = useRef();
    // const refrence3 = useRef();
    // const refrence4 = useRef();
    // const refrence5 = useRef();
    // const refrence6 = useRef();

    // function onBackspace1(e) {
    //     if (e.key === "Backspace") {
    //         refrence1.current.focus();
    //     } else {
    //         refrence2.current.focus();
    //     }
    // }

    // function onBackspace2(e) {
    //     if (e.key === "Backspace") {
    //         refrence1.current.focus();
    //     } else {
    //         refrence3.current.focus();
    //     }
    // }

    // function onBackspace3(e) {
    //     if (e.key === "Backspace") {
    //         refrence2.current.focus();
    //     } else {
    //         refrence4.current.focus();
    //     }
    // }
    // function onBackspace4(e) {
    //     if (e.key === "Backspace") {
    //         refrence3.current.focus();
    //     } else {
    //         refrence5.current.focus();
    //     }
    // }
    // function onBackspace5(e) {
    //     if (e.key === "Backspace") {
    //         refrence4.current.focus();
    //     } else {
    //         refrence6.current.focus();
    //     }
    // }
    // function onBackspace6(e) {

    //     if (e.key === "Backspace") {
    //         refrence5.current.focus();
    //         setdisable(false)
    //     } else {
    //         refrence6.current.blur();

    //         setdisable(true)
    //     }
    // }


    const handleBackspace = useCallback((e, index) => {
        if (e.key === "Backspace") {
            if (index === 0) {
                refrence.current[index].focus();
            } else if (index === 5) {
                refrence.current[index - 1].focus();
                setdisable(false);
            } else {
                refrence.current[index - 1].focus();
            }
        } else {
            if (index === 5) {
                refrence.current[index].blur();
                setdisable(true);
            } else {
                refrence.current[index + 1].focus();
            }
        }
    }, [setdisable]);



    return <>
        <div className="flex flex-col items-center">


            <div>


                {Array(6).fill(1).map((x, index) => <Input refrence={e => refrence.current[index] = e} key={index} type="text"

                    // onBackspace={(e) => {
                    //     if (e.key === "Backspace") {
                    //         if (index == 0) {
                    //             refrence.current[index].focus();
                    //         } else if (index == 5) {
                    //             refrence.current[index - 1].focus();
                    //             setdisable(false)
                    //         } else {
                    //             refrence.current[index - 1].focus();
                    //         }
                    //     } else {
                    //         if (index == 5) {
                    //             refrence.current[index].blur();
                    //             setdisable(true)
                    //         } else {
                    //             refrence.current[index + 1].focus();
                    //         }

                    //     }
                    // }}
                    onBackspace={e => handleBackspace(e, index)}
                >

                </Input>)}



                {/* <Input refrence={refrence1} type="text" onBackspace={onBackspace1}></Input>
                <Input refrence={refrence2} type="text" onBackspace={onBackspace2}></Input>
                <Input refrence={refrence3} type="text" onBackspace={onBackspace3}></Input>
                <Input refrence={refrence4} type="text" onBackspace={onBackspace4}></Input>
                <Input refrence={refrence5} type="text" onBackspace={onBackspace5}></Input>
                <Input refrence={refrence6} type="text" onBackspace={onBackspace6}></Input> */}




            </div>

            <Clock></Clock>
            <Button >verify</Button>
        </div>


    </>
}