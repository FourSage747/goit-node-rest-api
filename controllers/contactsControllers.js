// const {
//     listContacts,
//     getContactById,
//     addContact,
//     removeContact,
//     updateContactById
//   } = require("../services/contactsServices")

const Contact = require("../models/contacts")

const HttpError = require("../helpers/HttpError")
const {
    createContactSchema,
    updateContactSchema,
    updateFavoriteSchema
} = require("../schemas/contactsSchemas")

const getAllContacts = async (req, res, next) => {
    try {
        const {_id: owner} = req.user
        const {page = 1, limit = 20} = req.query
        const skip = (page - 1) * limit
        const result = await Contact.find({owner}, "", {skip, limit}).populate("owner", "name email")
        res.json(result)
    }
    catch(error) {
        next(error)
    }
};

const getOneContact = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await Contact.findById(id)
        if(!result){
            throw HttpError(404, "Not found")
        }
        res.json(result)
    }
    catch(error) {
        next(error)
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await Contact.findByIdAndDelete(id)
        if(!result){
            throw HttpError(404, "Not found")
        }
        res.json(result)
    }
    catch(error) {
        next(error)
    }
};

const createContact = async (req, res, next) => {
    try {
        const {error} = createContactSchema.validate(req.body)
        if(error){
            throw HttpError(400, error.message)
        }
        const {_id: owner} = req.user
        const result = await Contact.create({...req.body, owner})
        res.status(201).json(result)
    }
    catch(error) {
        next(error)
    }
};

const updateContact = async (req, res, next) => {
    try {
        const {error} = updateContactSchema.validate(req.body)
        if(error){
            throw HttpError(400, error.message)
        }
        const {id} = req.params
        if (Object.keys(req.body).length === 0) {
            throw HttpError(400, "Body must have at least one field")
        }
        // const currentContact = await getContactById(id)
        // const updatedContact = {
        //     ...currentContact,
        //     ...req.body
        // }
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
        if(!result){
            throw HttpError(404, "Not found")
        }
        res.json(result)
    }
    catch(error) {
        next(error)
    }
};

const updateFavorite = async (req, res, next) => {
    try {
        const {error} = updateFavoriteSchema.validate(req.body)
        if(error){
            throw HttpError(400, error.message)
        }
        const {id} = req.params
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
        if(!result){
            throw HttpError(404, "Not found")
        }
        res.json(result)
    }
    catch(error) {
        next(error)
    }
};

module.exports = {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
    updateFavorite
}