import { Role } from 'src/enums/SharedEnums'
import { TranslationKeyType } from 'src/enums/SharedEnums'
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
export type UpdateUiFieldOutputDto = {
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
export type GetViewUsersOutputDto = {
    userId:number
    name:string
    email:string
    role:Role
}
export type CreateViewOutputDto = {
    listId:number
    viewId:number
}
export type CheckInviteOutputDto = {
    viewId?:string
}
export type AcceptInviteOutputDto = {
    viewId?:string
}
export type GetViewGroupsOutputDto = {
    groupId:number
    name:string
    role:Role
}
export type AddTableViewToGroupOutputDto = {
    groupTableViewId:number
}
export type AddKeyToViewOutputDto = {
    keyId:number
    key:string
}
export type GetKeysForViewOutputDto = {
    keyId:number
    key:string
    role:Role
    name?:string
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
export type CreateUserGroupOutputDto = {
    groupId:number
}
export type GetUserGroupsOutputDto = {
    groupId:number
    name:string
    description?:string
}
export type GetGroupViewsOutputDto = {
    tableViewId:number
    tableViewName:string
    role:string
}
export type GetGroupUsersOutputDto = {
    userId:number
    userName:string
    firstName:string
    lastName:string
}
export type AddUserToGroupOutputDto = {
    groupUserId:number
}
export type AddTranslationKeyToContentManagementOutputDto = {
    id:number
}
export type GetTranslationKeysOfContentManagementOutputDto = {
    id:number
    name:string
    type:TranslationKeyType
}
export type GetContentManagementTranslationTextsOutputDto = {
}
export type SaveManyTranslationTextsOutputDto = {
}
export type GetTranslationTextsOutputDto = {
    id:number
    translationKey:string
    i18N:string
    translation?:string
}
