import {atom}  from "jotai"

type data={
    title:string,
    status:boolean
}

export const todolist=atom<data[]>([])
export const taskAtom=atom<data>({title:'',status:false})