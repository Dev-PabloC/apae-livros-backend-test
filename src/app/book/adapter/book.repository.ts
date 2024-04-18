import prisma from "../../../infra/database";
import { BookDto } from "../dto/book.dto";

export const bookRepository = {
  createBook: async (book: BookDto) => {
    const bookCreated = await prisma.book.create({
      data: { title: book.title, description: book.description, author: book.author, categoryId: book.categoryId },
    })

    return bookCreated;
  },
  updateBook: async (id: string, book: Partial<BookDto>) => {
    const bookUpdated = await prisma.book.update({
      where: {
        id: id
      },
      data: { title: book.title, description: book.description, author: book.author, categoryId: book.categoryId }
    })

    return bookUpdated;
  },
  deleteBook: async (id: string) => {
    const bookDeleted = await prisma.book.delete({
      where: {
        id: id
      }
    })

    return bookDeleted;
  },
  getBook: async (id: string) => {
    const book = await prisma.book.findFirst({
      where: {
        id: id
      },
    })

    return book;
  },
  getBooks: async () => {
    const books = await prisma.book.findMany();

    return books;
  }
}