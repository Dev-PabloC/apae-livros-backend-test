import { Router } from "express"
import { userController } from "./controller/user.controller"

export const userRouter = Router()

userRouter.post("/", userController.createUser)
userRouter.delete("/:id", userController.deleteUser)