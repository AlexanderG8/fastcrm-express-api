import { Router } from "express";
import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from "../controllers/contactController.js";

export const contactRouter = Router();

contactRouter.get("/contacts", getAllContacts);
contactRouter.get("/contacts/:id", getContactById);
contactRouter.post("/contacts", createContact);
contactRouter.put("/contacts/:id", updateContact);
contactRouter.delete("/contacts/:id", deleteContact);
