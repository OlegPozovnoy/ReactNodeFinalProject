const router = require("express").Router();

const ChatsController = require("../controllers/chatsController");

router.get("/new", ChatsController.new);
router.get("/index", ChatsController.index);
router.get("/:id", ChatsController.show);
router.post("/create", ChatsController.create);
router.post("/destroy", ChatsController.destroy);
router.post("/addnewmessage", ChatsController.addnewmessage);
router.post("/addnewparticipant", ChatsController.addnewparticipant);
module.exports = router;
