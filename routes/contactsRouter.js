import express from "express";
import {getAllContacts,getContactById,deleteContact,createContact,updateContact,updateStatusContact} from "../controllers/contactsControllers.js";
import isValidId from "../middlewares/isValidId.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";


const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getContactById);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema),  createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema),isValidId, updateContact);

contactsRouter.patch("/:id/favorite", isValidId,updateStatusContact);

export default contactsRouter;
