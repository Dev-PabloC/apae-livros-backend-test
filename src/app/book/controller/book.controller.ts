import { bookRepository } from "../adapter/book.repository";
import { BookDto } from "../dto/book.dto";
import { bookZodSchema, updateBookZodSchema } from "../../../utils/zod/bookZodSchema"
import { Request, Response } from "express"

export const bookController = {
  createBook: async (req: Request, res: Response) => {
    const { title, description, author, categoryId } = req.body as BookDto

    const verifiedTypeBook = bookZodSchema.safeParse({ title, description, author, categoryId })

    if (!verifiedTypeBook.success) {
      return res.status(400).json({ error: verifiedTypeBook.error.issues })
    }

    const bookCreated = await bookRepository.createBook({ title, description, author, categoryId })

    if (!bookCreated) {
      return res.status(500).json({ error: "Internal Server Error" })
    }

    return res.status(201).json(bookCreated)
  },
  updateBook: async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, description, author, categoryId } = req.body as Partial<BookDto>

    const verifiedTypeBook = updateBookZodSchema.safeParse({ title, description, author, categoryId })

    if (!verifiedTypeBook.success) {
      return res.status(400).json({ error: verifiedTypeBook.error.issues })
    }

    const bookUpdated = await bookRepository.updateBook(id, { title, description, author, categoryId })

    if (!bookUpdated) {
      return res.status(404).json({ error: "Book not found" })
    }

    return res.status(200).json(bookUpdated)
  },
  deleteBook: async (req: Request, res: Response) => {
    const { id } = req.params

    const bookDeleted = await bookRepository.deleteBook(id)

    if (!bookDeleted) {
      return res.status(404).json({ error: "Book not found" })
    }

    return res.status(200).json(bookDeleted)
  },
  getBook: async (req: Request, res: Response) => {
    const { id } = req.params

    const book = await bookRepository.getBook(id)

    if (!book) {
      return res.status(404).json({ error: "Book not found" })
    }

    return res.status(200).json(book)
  },
  getBooks: async (req: Request, res: Response) => {
    const books = await bookRepository.getBooks()

    return res.status(200).json(books)
  }
}