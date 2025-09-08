import { Router } from "express";
import { getAllCompanies, getCompanyById, createCompany, updateCompany, deleteCompany } from "../controllers/companyController.js";

export const companyRouter = Router();

companyRouter.get("/companies", getAllCompanies);
companyRouter.get("/companies/:id", getCompanyById);
companyRouter.post("/companies", createCompany);
companyRouter.put("/companies/:id", updateCompany);
companyRouter.delete("/companies/:id", deleteCompany);