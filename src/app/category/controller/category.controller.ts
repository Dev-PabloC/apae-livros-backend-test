import { Request, Response } from "express"
import { categoryRepository } from "../adapter/category.repository"
import { CategoryDto } from "../dto/category.dto"

export const categoryController = {
  createCategory: async (req: Request, res: Response) => {
    const { name } = req.body as CategoryDto

    const categoryCreated = await categoryRepository.createCategory({ name })

    if (!categoryCreated) {
      return res.status(500).json({ error: "Internal Server Error" })
    }

    return res.status(201).json(categoryCreated)
  },
  deleteCategory: async (req: Request, res: Response) => {
    const { id } = req.params

    const categoryDeleted = await categoryRepository.deleteCategory(id)

    if (!categoryDeleted) {
      return res.status(404).json({ error: "Category not found" })
    }

    return res.status(200).json(categoryDeleted)
  },
  getCategory: async (req: Request, res: Response) => {
    const { id } = req.params

    const category = await categoryRepository.getCategory(id)

    if (!category) {
      return res.status(404).json({ error: "Category not found" })
    }

    return res.status(200).json(category)
  },

  getCategories: async (req: Request, res: Response) => {
    const categories = await categoryRepository.getCategories()

    return res.status(200).json(categories)
  }
}