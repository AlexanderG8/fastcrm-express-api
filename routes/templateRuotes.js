import { Router } from "express"; 
import {getAllTemplates, createTemplate, updateTemplate, deleteTemplate, getTemplateById} from "../controllers/templateController.js";

export const templateRouter = Router();

templateRouter.get("/templates", getAllTemplates);
templateRouter.get("/templates/:id", getTemplateById);
templateRouter.post("/templates", createTemplate);
templateRouter.put("/templates/:id", updateTemplate);
templateRouter.delete("/templates/:id", deleteTemplate);