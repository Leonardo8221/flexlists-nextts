import { FieldType } from 'src/enums/SharedEnums'
import { Role } from 'src/enums/SharedEnums'
import { ViewType } from 'src/enums/SharedEnums'
import { ListCategory } from 'src/enums/SharedEnums'
export type CmpValueType = 'Field' | 'Array' | 'Variable' | 'SearchString'

export type WhereBoolOr = {
    Or: Where[],
    And: never,
    left: never,
    leftType: never,
    cmp: never,
    right: never,
    rightType: never
}

export type WhereBoolAnd = {
    Or: never,
    And: Where[],
    left: never,
    leftType: never,
    cmp: never,
    right: never,
    rightType: never
}

export type WhereCmp = {
    Or: never,
    And: never,
    left: number | string, // fieldId or value 
    leftType: CmpValueType,
    cmp: 'eq' | 'neq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'nin',
    right: number | string, // fieldId or value
    rightType: CmpValueType
}

export type Where = WhereBoolOr | WhereBoolAnd | WhereCmp

export type Field = {
    id:number
    listId:number
    name:string
    type:FieldType
    ordering:number
    icon:string
    config:any
    required:boolean
    detailsOnly:boolean
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
