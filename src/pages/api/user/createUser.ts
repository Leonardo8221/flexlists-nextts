import { NextApiRequest, NextApiResponse } from "next"
import { ApiResponse, BaseApiResponse } from "src/models/ApiResponse";
import { createUser } from "src/repositories/userRepository";
import { hashPassword } from "src/utils/bcryptUtils";
const createUserEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userName,firstName,lastName,phoneNumber,password,ownerId } = req.body;
    var hashResult = await hashPassword(password as string);
    var passwordHash = hashResult.hashedPassword;
    var passwordSalt = hashResult.salt;
    var createUserResponse = await createUser(userName,firstName,lastName,phoneNumber,passwordHash,passwordSalt,ownerId);

    res.json(new ApiResponse<any>(createUserResponse.id))
  res.statusCode = 200;
  return res;
}
export default createUserEndpoint
