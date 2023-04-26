import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { updateUser } from "src/repositories/userRepository";
import { hashPassword } from "src/utils/bcryptUtils";
const updateUserEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id,userName,firstName,lastName,phoneNumber,password,ownerId } = req.body;
    var hashResult = await hashPassword(password as string);
    var passwordHash = hashResult.hashedPassword;
    var passwordSalt = hashResult.salt;
    var updateUserResponse = await updateUser(id,userName,firstName,lastName,phoneNumber,passwordHash,passwordSalt,ownerId);
    res.json(new ApiResponse<any>(updateUserResponse))
  res.statusCode = 200;
  return res;
}
export default updateUserEndpoint
