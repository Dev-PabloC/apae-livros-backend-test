import { Router } from "express";
import { categoryController } from "./controller/category.controller";

export const categoryRouter = Router();

categoryRouter.get("/:id",  categoryController.getCategory)
categoryRouter.post("/",  categoryController.createCategory)
categoryRouter.delete("/:id", categoryController.deleteCategory)
categoryRouter.get("/", categoryController.getCategories)