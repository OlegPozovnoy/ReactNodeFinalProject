const router = require("express").Router();

const FriendsController = require("../controllers/friendsController");

// Begin routes

router.get("/", FriendsController.index);
router.get("/addfriend", FriendsController.addnewfriend);
router.post("/addnewfriend", FriendsController.createfriend);
// We have to export our changes
module.exports = router;
