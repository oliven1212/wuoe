const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");


router.get("/", bookController.getAllBooks);
router.get("/new", bookController.showCreateForm);
router.post("/", bookController.createBook);
router.get("/:id", bookController.getBookDetails);
router.get("/:id/edit", bookController.showEditForm);
router.post("/:id/update", bookController.updateBook);
router.post("/:id/delete", bookController.deleteBook);

module.exports = router;
