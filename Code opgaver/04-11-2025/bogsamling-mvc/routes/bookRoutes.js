const express = require("express");
const router = express.Router();
const upload = require('../multer'); //import multer configuration

const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);
router.get("/new", bookController.showCreateForm);
router.post("/", upload.single('image'), bookController.createBook);
router.get("/:id", bookController.getBookDetails);
router.get("/:id/edit", bookController.showEditForm);
router.post("/:id/update", upload.single('image'), bookController.updateBook);
router.post("/:id/delete", bookController.deleteBook);

module.exports = router;
