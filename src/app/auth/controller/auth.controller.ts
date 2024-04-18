import { Request, Response } from "express"
import prisma from "../../../infra/database"

export const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const isPasswordCorrect = password === user.password

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid password" })
    }

    const token = user.id

    return res.status(200).cookie("token", token, {
      maxAge: 3600000,
      httpOnly: true,
    }).json(user)
  }
}
