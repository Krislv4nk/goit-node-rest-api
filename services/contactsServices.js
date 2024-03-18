import Contact from "../models/Contacts.js";


export const listContacts = (filter={}) => Contact.find(filter, "-createdAt -updatedAt ");

export const getContactById =  (id) => Contact.findById(id);

export const getOne = filter => Contact.findOne(filter);

export const deleteContactById =  (id) => Contact.findByIdAndDelete(id);

export const deleteOneContact =  (filter) => Contact.findOneAndDelete(filter);

export const addContact = data => Contact.create(data);

export const updateContact =  (id, data) => Contact.findByIdAndUpdate(id, data, {new: true});
   
export const updateOneContact =  (filter, data) => Contact.findOneAndUpdate(filter, data, {new: true});

export const updateStatusContact = () => Contact.find({favorite: true});