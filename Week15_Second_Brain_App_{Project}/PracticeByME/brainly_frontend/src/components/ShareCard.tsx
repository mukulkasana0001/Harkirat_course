import { DeleteIcon } from "../icons/DeleteIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";


interface cardprops {
    title: string;
    type: "twitter" | "youtube";
    link: string;
    onClick?:()=>{}
}



export const ShareCard = (props: cardprops) => {
   
    


    return <>
        <div className="p-4 mb-1.5 bg-white rounded-md border-gray-200 max-w-72 m-2 border min-h-48 min-w-72">
            <div className="flex justify-between">

                {props.type == "twitter" &&<TwitterIcon/>}
                {props.type == "youtube" &&<YoutubeIcon/>}
                <div>{props.title}</div>
                
            </div>

            <div className={`h-72 w-72  mt-4 items-center   ${props.type == "twitter" ? " overflow-y-scroll" : ""}`}>
                {props.type == "twitter" &&
                    (

                        <div >
                           <blockquote className="twitter-tweet">
                            <a href={`${props.link.replace("x.com", "twitter.com")}`}>
                        </a></blockquote> 

                        </div>


                    )
                }


                {props.type == "youtube" &&
                    (<>
                        <div className="w-64">
                            <iframe className="  w-full rounded-2xl mt-10  "
                                src={`${props.link.replace("watch", "embed")
                                .replace("?v=", "/")}`}
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>

                            </iframe>
                        </div>

                        <div className="flex  justify-center  w-64   rounded p-2 mt-6">
                            <div className=" text-center w-full justify-center items-center border text-blue-600  rounded-2xl pl-5 pr-2">
                                {props.title}
                            </div>

                        </div>

                    </>

                    )
                }
            </div>
        </div>
    </>
}
