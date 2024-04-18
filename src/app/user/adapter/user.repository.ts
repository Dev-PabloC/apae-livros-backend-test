import { get } from "http";
import prisma from "../../../infra/database";
import { UserDto } from "../dto/user.dto";

export const userRepository = {
  createUser: async (user: UserDto) => {
    const userExist = await prisma.user.findFirst({ where: { email: user.email } })

    if (userExist) {
      throw new Error("User already exists");
    }

    const userCreated = await prisma.user.create({
      data: { username: user.username, email: user.email, password: user.password, },
      select: { id: true, username: true, email: true, password: false, }
    })

    return userCreated;
  },
  deleteUser: async (id: string) => {
    const userDeleted = await prisma.user.delete({
      where: {
        id: id
      }
    })
    
    return userDeleted;
  },
  getUser: async (id: string) => {
    const user = await prisma.user.findFirst({
      where: {
        id: id
      }
    })


    return user;
  }
}