import { UserStatus, MembershipLevel } from "src/enums/SharedEnums"

export type UserProfile = {
    id:number
    name:string
    firstName:string
    lastName:string
    email:string
    phoneNumber?:string
    avatarUrl?:string
    systemRole: string
    status: UserStatus
    membershipLevel: MembershipLevel
}