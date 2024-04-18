import { Router } from "express";
import { userRouter } from "./user/route";
import { categoryRouter } from "./category/route";
import { bookRoutes } from "./book/route";
import { authRoutes } from "./auth/route";

export const routes = Router();

routes.use("/users", userRouter);
routes.use("/category", categoryRouter);
routes.use("/books", bookRoutes);
routes.use("/auth", authRoutes);