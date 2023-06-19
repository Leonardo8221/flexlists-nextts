import { Role } from 'src/enums/SharedEnums'
export type CreateListOutputDto = {
    listId:number
}
export type PublishListOutputDto = {
    code:string
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
export type CreateUIFieldOutputDto = {
    viewId:number
    fieldId:number
}
export type CreateFieldOutputDto = {
    viewId:number
    fieldId:number
}
export type UpdateListFieldOutputDto = {
    viewId:number
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
export type SearchOutputDto = {
    listId:number
    count:number
    content:any[]
}
export type CreateViewOutputDto = {
    listId:number
    viewId:number
}
export type AcceptInviteOutputDto = {
    viewId?:string
}
export type GetUserContactsOutputDto = {
    userId:number
    name:string
    email:string
}
export type GetProfileOutputDto = {
    name:string
    firstName:string
    lastName:string
    phonenumber?:string
    avatar?:string
}
