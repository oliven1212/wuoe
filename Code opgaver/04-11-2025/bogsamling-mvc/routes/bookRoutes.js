const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'bookImages/' });

const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);
router.get("/new", bookController.showCreateForm);
router.post("/", upload.single('image'), bookController.createBook);
router.get("/:id", bookController.getBookDetails);
router.get("/:id/edit", bookController.showEditForm);
router.post("/:id/update", upload.single('image'), bookController.updateBook);
router.post("/:id/delete", bookController.deleteBook);

module.exports = router;
