const router = require("express").Router();
const prisma = require("../db");

// GET all books
router.get("/", async (req, res, next) => {
  try {
    const allBooks = await prisma.book.findMany({
      include: { author: true },
      omit: { authorId: true },
    });
    res.json(allBooks);
  } catch (error) {
    next(error);
  }
});

// GET one book
router.get("/:bookId", async (req, res, next) => {
  try {
    const oneBooks = await prisma.book.findUnique({
      where: { id: req.params.bookId },
      include: { author: true },
      omit: { authorId: true },
    });
    res.json(oneBooks);
  } catch (error) {
    next(error);
  }
});

// POST one book
router.post("/", async (req, res, next) => {
  const { title, year, summary, quantity, genre, authorId } = req.body;
  const newBookData = {
    title,
    year,
    summary,
    quantity,
    genre,
    authorId,
  };
  try {
    const newBook = await prisma.book.create({ data: newBookData });
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});

// UPDATE one book
router.put("/:bookId", async (req, res, next) => {
  const bookData = req.body;

  try {
    const updateBook = await prisma.book.update({
      where: { id: req.params.bookId },
      data: bookData,
    });
    res.status(202).json(updateBook);
  } catch (error) {
    next(error);
  }
});

// DELETE one book
router.delete("/:bookId", async (req, res, next) => {
  try {
    await prisma.book.delete({ where: { id: req.params.bookId } });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
