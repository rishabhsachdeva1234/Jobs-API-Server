// import { appDataSource } from "../../data-source";
// import { UserEntity } from "./entity/user.entity";

// export class UserService {
//   public static async login(email: string, password: string) {
//     try {
//       const userRepo = appDataSource.getRepository(UserEntity);
//       const user = userRepo.findOne({
//         where: { email },
//       });

//       if (!user)
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: "user not found" });

//     const isPasswordValid = await user.comparePassword(password);
//     if (!isPasswordValid)
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ message: "password is incorrect" });

//     const payload = { id: user.id, email: user.email };
//     const secretKey = process.env.JWT_SECRET_KEY!;
//     const token = sign(payload, secretKey, {
//       expiresIn: "2hr",
//     });
//     } catch (error) {}
//   }
// }
