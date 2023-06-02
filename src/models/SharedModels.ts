import { FieldType } from 'src/enums/SharedEnums'
import { Role } from 'src/enums/SharedEnums'
import { ViewType } from 'src/enums/SharedEnums'
import { ListCategory } from 'src/enums/SharedEnums'
export type Field = {
    id:number
    listId:number
    name:string
    type:FieldType
    ordering:number
    icon:string
    required:boolean
    detailsOnly?:string
    description?:string
    minimum?:number
    maximum?:number
}
export type List = {
    id:number
    name:string
    fields:Field []
    subList:List []
    role:Role[]
    description?:string
}
export type Sort = {
    fieldId:number
    direction:string
}
export type Query = {
    table:string[]
    field:any
    query:any
}
export type View = {
    id:number
    name:string
    type:ViewType
    listId:number
    category:ListCategory
    template?:boolean
    config:any
    page?:number
    limit?:number
    order:Sort []
    query:Query 
    description?:string
}
