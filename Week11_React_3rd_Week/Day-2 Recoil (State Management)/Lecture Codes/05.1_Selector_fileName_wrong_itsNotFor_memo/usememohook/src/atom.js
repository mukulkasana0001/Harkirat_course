import { atom, selector } from 'recoil'

export const counterstate=atom({
key:"counter",
default:0
})

export const isEven=selector({
    key:"Even",
    get:({get})=>{
        const currentcount=get(counterstate);
         
        const iseven=(currentcount%2==0);
        return iseven

    }
})

 