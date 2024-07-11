

const { createUser } = require("../controller/createUser");
const { findUser, updateContent } = require("../controller/updateContent");
const { Router } = require("express");
const { deleteUser, createContent } = require("../controller/createContent");
const { checkJwt } = require("../middleware/authMiddleware");
const { getContentForUser } = require("../controller/getContent");
const { deleteContent } = require("../controller/deleteContent");

const userRouter = Router();
userRouter.post("/createUser",createUser);
userRouter.post("/createContent",createContent);
userRouter.get("/getContentForUser/:userId",getContentForUser);
userRouter.put("/updateContent",updateContent);
userRouter.delete("/deleteContent/:id",deleteContent);
module.exports = {userRouter}
