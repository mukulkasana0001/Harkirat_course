import { useEffect, useState } from 'react'
import { AddIcon } from '../AddIcon'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Sidebar } from '../components/SIdebar'
import { useContent } from '../customhook/useContent'
import { ShareIcon } from '../icons/ShareIcon'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Mainpage() {
  const { contents, refresh } = useContent()

  useEffect(() => {
    refresh();
  }, [])



  async function deleteContent(_id: string) {

    await axios.delete("http://localhost:3000/api/v1/delet", {
      data: { contentId: _id },
      headers: {
        "token": localStorage.getItem("token")
      }
    })
    console.log(_id, " delleted")
    refresh();
  }


  const nevigator = useNavigate()

  function signuped() {
    nevigator("/signup")


  }

  function signined() {
    nevigator("/signin")


  }
   
  async function sharelink() {
    
    const response =await axios.post("http://localhost:3000/api/v1/brain/share",{
    
        share:true
      },{
headers:{
       "token": localStorage.getItem("token")
      }
      } )

    const hash = response.data.hash
    navigator.clipboard.writeText(`http://localhost:5173/shared/${hash}`)
    console.log("hash: ",hash)
  }



  // console.log(localStorage.getItem("token")?.length)

  console.log("contents =>", contents.length > 0 ? contents[0].type : "No content yet");

  return (
    <>


      <div className='flex  p-4 justify-end  bg-gray-200'>


        <div className='ml-2'>
          <Button text="Share" size="md" varient="secondary" startIcon={<ShareIcon size="md"></ShareIcon>} onClick={sharelink} ></Button>

        </div>

        <div className='ml-2'>
          <Button text="Add" size="md" varient="primary" startIcon={<AddIcon />} onClick={() => nevigator("/addlink")} ></Button>

        </div>

        {localStorage.getItem("token")?.length == 0 && (
          <>
            <div className='ml-2'>
              <Button text="signup" size="sm" varient="primary" onClick={signuped}  ></Button>

            </div>
            <div className='ml-2'>
              <Button text="signin" size="sm" varient="primary" onClick={signined} ></Button>

            </div>
          </>
        )
        }
        {localStorage.getItem("token")?.length != 0 && (<div className='ml-2'>
          <Button text="Logout" size="sm" varient="primary" onClick={() => { localStorage.setItem("token", ""); refresh() }}  ></Button>

        </div>)
        }





      </div>

      <div className='overflow-y-scroll h-screen'>
        <div className='ml-72   p-1.5 flex  flex-wrap'>



          {contents.length > 0 && (contents.map(({ type, link, title, _id }) => (
            <Card onClick={() => deleteContent(_id)}
              type={type}
              link={link}
              title={title}
            />
          )))
          }

        </div>
      </div>


      <Sidebar></Sidebar>
    </>
  )
}

export default Mainpage
