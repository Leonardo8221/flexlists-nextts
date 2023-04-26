import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
const userDatas : any[] = [
{
    id:1,
    userName:"admin@flexlist.com",
    firstName:"Tycho",
    lastName:"Luyben",
    phoneNumber:"",
    password:"$2b$10$i0NQa57TZlncqPWLjQI9DeH1FCdbzO.l7sFUNB25.3rU4vfllPjXK",
    passwordSalt:"$2b$10$i0NQa57TZlncqPWLjQI9De",
    ownerId:1,
    createdAt:new Date(),
    updatedAt:new Date(),
} 
]
const roleDatas : any[] = [
{
    id:1,
    name:"Admin",
    ownerId:1,
    createdAt:new Date(),
    updatedAt:new Date(),
} 
]
const userRoleDatas : any[] = [
{
    id:1,
    roleId:1,
    userId:1,
    createdAt:new Date(),
    updatedAt:new Date(),
} 
]
export const main = async ()=> {
    console.log(`Start seeding ...`)
    for (let index = 0; index < userDatas.length; index++) {
        var userData = userDatas[index];
        const user = await prisma.user.findUnique({
            where: {
              id: userData.id,
            },
          })
        if(user == null)
        {
            await prisma.user.create({
                data: userData,
              })
        }
        else
        {
            delete userData["createdAt"];
            await prisma.user.update({
                where: {
                  id: userData.id,
                },
                data: userData
            })
        }
    }
    for (let index = 0; index < roleDatas.length; index++) {
        var roleData = roleDatas[index];
        const role = await prisma.role.findUnique({
            where: {
              id: roleData.id,
            },
          })
        if(role == null)
        {
            await prisma.role.create({
                data: roleData,
              })
        }
        else
        {
            delete roleData["createdAt"];
            await prisma.role.update({
                where: {
                  id: roleData.id,
                },
                data: roleData
            })
        }
    }
    for (let index = 0; index < userRoleDatas.length; index++) {
        var userRoleData = userRoleDatas[index];
        const userRole = await prisma.userRole.findUnique({
            where: {
              id: userRoleData.id,
            },
          })
        if(userRole == null)
        {
            await prisma.userRole.create({
                data: userRoleData,
              })
        }
        else
        {
            delete userRoleData["createdAt"];
            await prisma.userRole.update({
                where: {
                  id: userRoleData.id,
                },
                data: userRoleData
            })
        }
    }
    console.log(`Finish seeding ...`)
  }
  
main();
//export {}