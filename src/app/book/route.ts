import { bookController } from './controller/book.controller';
import { Router } from "express";

export const bookRoutes = Router();

bookRoutes.get("/", bookController.getBooks);
bookRoutes.post("/", bookController.createBook);
bookRoutes.delete("/:id", bookController.deleteBook);
bookRoutes.get("/:id", bookController.getBook);
bookRoutes.patch("/:id", bookController.updateBook);