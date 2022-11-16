"use client"
import React from 'react'
import {useAtom } from 'jotai'
import {taskAtom,todolist} from '../atoms/todoAtom'
import Task,{data} from './task/page'
import {createRoot} from 'react-dom/client'


function Todos() {
  const [task,setTask]=useAtom(taskAtom)
  const [tasklist,setTasklist]=useAtom(todolist)

  


  
  function RenderStuff(){
    const x:JSX.Element=(
        <div id="eles">{
            tasklist.map((item,i)=>
            <Task title={item.title} status={item.status} check={handleUpdate} deletehandle={DeleteTask}/>
            )
            }</div>
    )
    
    const root=createRoot(document.getElementById('temp') as HTMLElement)
    root.render(x)
    const x2:HTMLElement|null=document.getElementById('check')
    const check:HTMLElement|null=document.getElementById('status')

    if (x2!=null && check!=null){
        //console.log("ehere",x2,x1)
        if(tasklist.length==0){
        x2.hidden=false
        check.hidden=true
        
        
        }
        else{
        x2.hidden=true
        
        check.innerHTML=`Completed:${tasklist.filter((item)=>item.status==true).length}`
        check.hidden=false
        }
    }
    if(check!=null){
        check.innerHTML=`Completed:${tasklist.filter((item)=>item.status==true).length} / ${tasklist.length}`
    }
    /*const x1:string=renderToStaticMarkup(x)
    */
    //return renderToStaticMarkup(x)
    
  } 
  
  
function AddTask(task_title:data){
const temp:data[]=tasklist
temp.push(task_title)
setTasklist(temp)
//console.log(tasklist)

}

function Delete(task_title:data){

    //console.log("in")
    const index=tasklist.findIndex((item)=>item.title===task_title.title)
    //console.log(index)
    var temp:Array<data>=[]
    if (index>-1){temp=tasklist.slice(0,index).concat(tasklist.slice(index+1,tasklist.length))}
    //console.log(temp)
    while(tasklist.length>0){
        tasklist.pop()
    }
    temp.forEach(element=>tasklist.push(element))

    
    
    //console.log(temp)
    setTasklist(tasklist)
    //console.log(tasklist)
}

const handleAdd =(task:data)=>{
if (task.title.trim()=="" || tasklist.findIndex((item)=>item.title===task.title)!=-1){
    return
}
task.title=task.title.trim()
AddTask(task)

RenderStuff()
setTask({title:'',status:false})    

}


const DeleteTask=(e:React.MouseEvent,task:data)=>{
    e.preventDefault()
    Delete(task)
    //const x:HTMLElement|null=document.getElementById('temp')
    
    RenderStuff()
    
    
    
  }
function Update(task:data){
    var temp:Array<data>=[]
    const index=tasklist.findIndex((item)=>item.title===task.title)
if (index>-1){temp=tasklist.slice(0,index).concat([task]).concat(tasklist.slice(index+1,tasklist.length))}
    while(tasklist.length>0){
        tasklist.pop()
    }
    temp.forEach(element=>tasklist.push(element))
    setTasklist(tasklist)
    RenderStuff()
}

const handleUpdate=(e:React.ChangeEvent,task:data)=>{
task.status=!(task.status)
e.preventDefault()
Update(task)
}

    
  return (
    <>
    <div className='py-[3%]'>
        <p>To-do List in todos</p>
        <div className='flex flex-row justify-center py-[2%]'>
            <input type="text" name="title" value={task.title} onChange={(e)=>setTask({title:e.target.value,status:false})}></input>
            <button className="bg-green-500 rounded-full m-[1%]" onClick={(e)=>handleAdd(task)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</button>
        </div>
        <div id="status" hidden>
            Completed:{tasklist.filter((item)=>item.status==true).length}
        </div>
    </div>
        <div id='temp'>
            <div id="temp1" hidden></div>
        </div>
        <div id="check">
            <h1>No Tasks! Add one to get Going!</h1>
        </div>
        

</>
  )
}

export default Todos