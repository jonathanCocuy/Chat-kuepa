import express from "express";
import Controller from "../Controllers/message.js";

const router = express.Router();

router.post("/save", Controller.save);
router.get("/messages", Controller.getMessages);

export default router;
