import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";


export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await contactsService.listContacts({owner});
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try{
    const {id} = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.getOne({_id: id, owner});
   
    console.log(result);
    if (!result) {
      throw HttpError(404, "Contact with id=${id} not found");
    }
    res.json(result);
  }
  catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try{
    const { id } = req.params;
    const {_id: owner} = req.user;
    const result = await contactsService.deleteOneContact({_id: id, owner});
    if (!result) {
      throw HttpError(404, "Contact with id=${id} not found");
    }
    res.status(200).json(result);
  }catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
 try {
  const { _id: owner } = req.user;
 const result = await contactsService.addContact({...req.body, owner});
  res.status(201).json(result);
 } catch (error) {
  next(error);
 }
};

export const updateContact = async (req, res, next) => {
  try {
    const {id} = req.params;
  const { _id: owner } = req.user;
  const result = await contactsService.updateOneContact({_id: id, owner}, req.body);
  if (!result) {
    throw HttpError(404, "Contact with id=${id} not found");
  }
  res.json(result);
  } catch (error) {
    next(error);
    
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const {id} = req.params;
  const { _id: owner } = req.user;
  const result = await contactsService.updateStatusContact({_id: id, owner}, req.body);
  if (!result) {
    throw HttpError(404, "Contact with id=${id} not found");
  }
  res.json(result);
  } catch (error) {
    next(error);
  }
}

