import Contact from "../models/Contacts.js";


export const listContacts =  () =>  Contact.find( {}, "-createdAt -updatedAt");

export const getContactById =  (id) => Contact.findById(id);

export const deleteContactById =  (id) => Contact.findByIdAndDelete(id);

export const addContact =  (data) => Contact.create(data);
    
export const updateContact =  (id, data) => Contact.findByIdAndUpdate(id, data, {new: true});
   
export const updateStatusContact = () => Contact.find({favorite: true});