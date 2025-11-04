import { useNavigate } from "react-router-dom"

 


export default function AppbarNoLogin() {
     const navigator= useNavigate();

    return <div className="flex flex-col ">
        <div className="shadow h-14 flex justify-between ">

            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>
            <div className="flex">

                <div className="rounded-sm h-12 w-20 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        <button className="cursor-pointer" onClick={() => {navigator('/signup')}}>SignUp</button>
                    </div>

                </div>
                <div className="rounded-sm h-12 w-20 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        <button className="cursor-pointer" onClick={() => { navigator('/signin')}}>SignIn</button>
                    </div>
                </div>
            </div>

        </div>




        <div className="">
            <div className=' flex flex-col items-center  w-full '>

                <h1 className=' p-8  text-5xl '>✨ Welcome to  PayTM App</h1>
                <div className=' w-full p-4 flex flex-col items-center justify-center  ' >
                    <div className='pl-96 '>
                        <p className='p-6  rounded-2xl shadow-2xl'>Instantly send and receive money with the secure, simple payment app. <br />
                           "The fastest way to pay bills and split expenses with friends and family .
                        </p>
                    </div>

                    <div className='pl-52 mt-6'>
                        <p className='p-6  rounded-2xl shadow-2xl '>🔹Secure. Fast. Effortless 🔹Your Wallet's Best Friend <br />🔹Payments Made Painless🔹Move Money, Move the World </p>
                    </div>

                    <div className='pl-96 mt-20'>
                        <h2 className='pl-52 text-2xl'> <ul>👉 Tap, Pay, Go!</ul></h2>
                    </div>
                </div>


            </div>
        </div>
    </div>

}
