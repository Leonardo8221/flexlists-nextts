import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { createUser } from "src/repositories/userRepository";
import { getUser } from "src/repositories/userRepository";
import { hashPassword } from "src/utils/bcryptUtils";
const register = async (req: NextApiRequest, res: NextApiResponse,next:any) => {
    let {firstName,lastName, userName, password,phoneNumber } = req.body;
    if (!userName) {
      res.status(400).json(new BaseApiResponse(400,'username invalid'));
    }
    if (!password) {
     res.status(400).json(new BaseApiResponse(400,'password invalid'));
    }
    //get user and validate password
    try {
      var currentUser = await getUser({ where: { userName: { equals: userName.toString().trim().toLowerCase() } }});
      if(!currentUser)
      {
          var hashResult = await hashPassword(password as string);
          var passwordHash = hashResult.hashedPassword;
          var passwordSalt = hashResult.salt;
          var user = await createUser(userName,firstName,lastName,phoneNumber,passwordHash,passwordSalt,1)
          res.status(200).json(new ApiResponse<any>({id:user.id}))
      }
      else
      {
          res.status(404).json(new BaseApiResponse(404,'user existed'))
      }
    } catch (error) {
      return res.status(500).json(new BaseApiResponse(505,'Internal error'));
    }
}
export default register