function RightComponent() {

    return <>
        <div className="grid bg-white grid-cols-12 mt-48 ">
            <div className="  col-span-3  h-40  ">
                <div className="text-center w-52 h-52 ml-2 -mt-7 pt-3 rounded-2xl bg-white  shadow-2xl"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3fGg33KuieCuoDec57yDDJCiFcNmSLMBSwg&s" alt="" className="w-36 ml-10 mt-5 rounded-4xl  " />Mukul kasana <br /> 997221314 </div>
            </div>
            <div className=" col-span-6 bg-white h-96 mt-4">

                <div className="">
                    <p className="text-black font-light">Tuesday,30 August</p>
                    <h1 className="text-blue-900 font-semibold">Good morning Mukul 👋</h1>
                </div>

                <div className=" mt-10  shadow-2xl rounded-2xl h-full p-4">
                    <div className="m-2">
                        <input type="date" id="datepickerId" class="p-2 border border-gray-300 rounded-md" placeholder="Select a date" />

                    </div>
                    <div className="m-2">
                        <input type="date" id="datepickerId" class="p-2 border border-gray-300 rounded-md" placeholder="Select a date" />

                    </div>
                    <div className="m-2">
                        <input type="date" id="datepickerId" class="p-2 border border-gray-300 rounded-md" placeholder="Select a date" />

                    </div>

                </div>

            </div>
            <div className="border-2 col-span-3  bg-amber-950 h-52 mt-32">three</div>



        </div>
    </>
}


export default RightComponent