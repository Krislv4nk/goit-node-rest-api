import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const result = await contactsService.listContacts();
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};

export const getOneContact = (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  }
  catch (error) {
    next(error);
  }
};

export const deleteContact = (req, res, next) => {
    try {
const { contactId } = req.params;
const result = contactsService.removeContact(contactId);
if (!result) {
  throw HttpError(404, `Contact with id=${contactId} not found`);
}
res.json({
  message: "Contact deleted",
})
    } catch (error) {
        next(error);
    }
};

export const createContact = (req, res, next) => {
 try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = contactsService.addContact(req.body);
    res.status(201).json(result);
 }
 catch (error) {
    next(error);
 }
};

export const updateContact = (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
