import { Role } from 'src/enums/SharedEnums'
export type CreateListOutputDto = {
    listId:number
}
export type PublishListOutputDto = {
    code:string
}
export type GetUsersOutputDto = {
    userId:number
    name:string
    role:Role
}
export type AddAccessToListOutputDto = {
    keyId:number
    key:string
}
export type GetKeysOutputDto = {
    keyId:number
    key:string
    role:Role
}
export type CreateFieldOutputDto = {
    fieldId:number
}
export type CreateContentOutputDto = {
    listId:number
    contentId:number
}
export type GetContentsOutputDto = {
    listId:number
    count:string
    content:any[]
}
export type GetContentOutputDto = {
    listId:number
    count:number
    content:any
}
export type SearchContentsOutputDto = {
    listId:number
    count:number
    content:any[]
}
export type CreateViewOutputDto = {
    listId:number
    viewId:number
}
export type GetProfileOutputDto = {
    name:string
    firstName:string
    lastName:string
    phonenumber:string
    avatar:string
}
