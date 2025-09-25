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

    const response = await axios.post("http://localhost:3000/api/v1/brain/share", {

      share: true
    }, {
      headers: {
        "token": localStorage.getItem("token")
      }
    })

    const hash = response.data.hash
    navigator.clipboard.writeText(`http://localhost:5173/shared/${hash}`)
    console.log("hash: ", hash)
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

      <div className='overflow-y-scroll h-screen '>
        <div className='ml-72   p-1.5 flex  flex-wrap '>



          {contents.length > 0 && (contents.map(({ type, link, title, _id }) => (
            <Card onClick={() => deleteContent(_id)}
              type={type}
              link={link}
              title={title}
            />
          )))
          }
        </div>

        {contents.length == 0 && <div className=' flex flex-col items-center  w-full '>

          <h1 className=' p-8  text-5xl '>✨ Welcome to Revisitly</h1>
          <div className=' w-full p-4 flex flex-col items-center justify-center  ' >
            <div className='pl-96 '>
              <p className='p-6  rounded-2xl shadow-2xl'>Revisitly is your personal space to save, organize, and revisit content that matters to you. <br />
                Whether it’s a thought-provoking YouTube video, a tweet you don’t want to lose, <br /> or a resource you’ll need later — Revisitly makes it easy to store everything in one place.
              </p>
            </div>

            <div className='pl-52 mt-6'>
              <p className='p-6  rounded-2xl shadow-2xl '>🔹Students collecting study resources <br />🔹Creators saving inspiration <br />🔹Professionals bookmarking useful content <br />🔹Anyone who wants a clutter-free way to revisit the best of the internet </p>
            </div>

             <div className='pl-96 mt-20'>
              <h2 className='pl-52 text-2xl'> <ul>👉 Revisit today, share tomorrow — with Revisitly.</ul></h2>
            </div>

           

          </div>
        </div>
        }
      </div>


      <Sidebar></Sidebar>
    </>
  )
}

export default Mainpage
