const router = require("express").Router();

const BlogsController = require("../controllers/blogsController");

// Begin routes

router.get("/", BlogsController.index);
router.get("/addfriend", BlogsController.addnewfriend);
router.post("/addnewfriend", BlogsController.createfriend);
// We have to export our changes
module.exports = router;
