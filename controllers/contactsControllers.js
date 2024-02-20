const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContactById
  } = require("../services/contactsServices")

const HttpError = require("../helpers/HttpError")
const {
    createContactSchema,
    updateContactSchema
} = require("../schemas/contactsSchemas")

const getAllContacts = async (req, res, next) => {
    try {
        const result = await listContacts()
        res.json(result)
    }
    catch(error) {
        next(error)
    }
};

const getOneContact = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await getContactById(id)
        if(!result){
            throw HttpError(404, "Not found")
            // const error = new Error("Not found")
            // error.status = 404
            // throw error
        }
        res.json(result)
    }
    catch(error) {
        // const {status = 500, message = "Server error"} = error
        // res.status(status).json({
        //     message,
        // })
        next(error)
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await removeContact(id)
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
        const result = await addContact(req.body)
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
        // if (Object.keys(req.body).length === 0) {
        //     throw HttpError(400, "Body must have at least one field")
        // }
        const currentContact = await getContactById(id)
        const updatedContact = {
            ...currentContact,
            ...req.body
        }
        const result = await updateContactById(id, updatedContact)
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
    updateContact
}