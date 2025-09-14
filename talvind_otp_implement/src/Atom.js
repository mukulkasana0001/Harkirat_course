import { atom } from "recoil";




export  const TimerAtom = atom({
    key: "timer",
    default: 30,
});

export const RestartAtom = atom({
    default: false,
    key: "Restart"
});

export const Disableatom= atom({
    default: false,
    key: "disable"
});