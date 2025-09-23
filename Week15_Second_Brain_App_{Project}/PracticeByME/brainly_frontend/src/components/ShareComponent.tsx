import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ShareCard } from "./ShareCard"

export const ShareComponent = () => {
    const [sharecontent, setsharecontent] = useState(null)
    const {sharehash}=useParams()

    
    useEffect(() => {
    async function sharelink() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/brain/share/${sharehash}`
        )
        setsharecontent(response.data)
        console.log("share: ",sharehash)
      } catch (err) {
        console.error("Error fetching share data:", err)
        console.log("share: ",sharehash)
      }
    }
    sharelink()
  }, [sharehash])


    return <>
        <div className="h-screen w-screenl">
            {sharecontent && (
                <div className="p-2 ">
                <h1 className="p-2 bg-gray-300 text-center"> UserName: {sharecontent.username}</h1>
                
                <div className=' p-6 flex  flex-wrap overflow-y-scroll '>
                    {sharecontent.content.map(({ type, link, title }) => (

                        <ShareCard
                            type={type}
                            link={link}
                            title={title}
                        />
                    ))
                    }
                </div>

                </div>
            )

            }


        </div>
    </>
}