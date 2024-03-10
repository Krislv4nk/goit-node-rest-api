import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import isValidId from "../middlewares/isValidId.js";
import validateBody from "../helpers/validateBody.js";

import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema),  createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema),  updateContact);

contactsRouter.patch("/:id/favorite", isValidId, updateContact);

export default contactsRouter;
