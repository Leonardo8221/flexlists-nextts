import { FieldType } from 'src/enums/SharedEnums'
import { Role } from 'src/enums/SharedEnums'
import { ViewType } from 'src/enums/SharedEnums'
import { ListCategory } from 'src/enums/SharedEnums'

export type CmpValueType = 'Field' | 'Array' | 'Variable' | 'SearchString'

export type WhereCmp = {
    Or: never,
    And: never,
    left: number | string, // fieldId or value 
    leftType: CmpValueType,
    cmp: 'eq' | 'neq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'nin',
    right: number | string | Date, // fieldId or value
    rightType: CmpValueType
}
export type FlatWhere = WhereCmp | 'Or' | 'And'

export type Field = {
    id:number
    listId:number
    name:string
    uiField: string
    type:FieldType
    ordering:number
    required:boolean
    detailsOnly:boolean
    deleted:boolean
    config:any
    icon:any
    description?:string
    minimum?:number
    maximum?:number
    system:boolean
    defaultValue?:string
    indexed:boolean
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
export type FieldUIType = {
    name:string;
    description:string;
    baseType:FieldType;
    minimum:number;
    maximum:number;
    group:string;
    validator:(value:any)=>boolean;
}
export type SearchTypeModel = {
    name:string;
    description:string;
    text:string;
}