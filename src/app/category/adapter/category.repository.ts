import { CategoryDto } from './../dto/category.dto';
import prisma from "../../../infra/database";

export const categoryRepository = {
  createCategory: async (category: CategoryDto) => {
    const categoryCreated = await prisma.category.create({
      data: { name: category.name },
      select: { id: true, name: true }
    })

    return categoryCreated;
  },

  deleteCategory: async (id: string) => {
    const categoryDeleted = await prisma.category.delete({
      where: {
        id: id
      }
    })

    return categoryDeleted;
  },

  getCategory: async (id: string) => {
    const category = await prisma.category.findFirst({
      where: {
        id: id
      },
      select: { id: true, name: true, books: true }
    })

    return category;
  },

  getCategories: async () => {
    const categories = await prisma.category.findMany({
      select: { id: true, name: true, books: true }
    })

    return categories;
  }
}