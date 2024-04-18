import { Request, Response } from "express"
import { userRepository } from "../adapter/user.repository"
import { userZodSchema } from "../../../utils/zod/userZodSchema"
import { UserDto } from "../dto/user.dto"

export const userController = {
  createUser: async (req: Request, res: Response) => {
    const { username, email, password } = req.body as UserDto

    const verifiedTypeUser = userZodSchema.safeParse({ username, email, password })

    if (!verifiedTypeUser.success) {
      return res.status(400).json({ error: verifiedTypeUser.error.issues })
    }

    const userCreated = await userRepository.createUser({ username, email, password })

    if (!userCreated) {
      return res.status(500).json({ error: "Internal Server Error" })
    }

    return res.status(201).json(userCreated)
  },
  deleteUser: async (req: Request, res: Response) => {

    const { id } = req.params

    const verifyUserExist = await userRepository.getUser(id)

    if (!verifyUserExist) {
      return res.status(404).json({ error: "User not found" })
    }

    const userDeleted = await userRepository.deleteUser(id)

    return res.status(200).json(userDeleted)
  },
}