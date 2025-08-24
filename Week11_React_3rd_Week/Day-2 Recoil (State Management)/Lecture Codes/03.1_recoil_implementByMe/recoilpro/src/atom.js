import {atom} from 'recoil'

const counter = atom({
	key: "counter",
	default: 0
})

export default counter;