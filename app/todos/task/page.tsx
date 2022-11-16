"use client"
import React from 'react'
export type data={
    title:string,
    status:boolean
}
type propdata={
    title:string,
    status:boolean,
    check:(e:React.ChangeEvent ,task: data) => void,
    deletehandle:(e:React.MouseEvent ,task: data) => void

}

function Task(props:propdata) {
  return (
    <div className='flex justify-center'>
    <div className='flex space-x-6 bg-gray-100 px-[1%] py-[1%] my-[1%] rounded-md'>
    <input className="w-6 h-6 rounded border-black text-green-600 focus:ring-green-500"
             type="checkbox" checked={props.status} onChange={(e)=>{props.check(e,{title:props.title,status:props.status})}}></input>
    <div className='flex flex-row space-x-4 space-y-7'>
    
            <h3 className='text-black'>{Object(props.title).toString()} </h3>
            
            
            
        
        </div>
        
        
        <div>
        </div>
        <div className=' mx-[2%] float-right '>
            <button className="bg-red-500 size-sm rounded-full" onClick={(e)=>{props.deletehandle(e,{title:props.title,status:props.status})}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</button>
        </div>
    </div>
    </div>
  )
}

export default Task