const router = require("express").Router();

const AuthorsController = require("../controllers/authorsController");

router.get("/new", AuthorsController.new);
router.post("/", AuthorsController.create);
router.post("/checkusername", AuthorsController.checkusername);

module.exports = router;
