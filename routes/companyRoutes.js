import { Router } from "express";
import { getAllCompanies, getCompanyById, createCompany, updateCompany, deleteCompany } from "../controllers/companyController.js";

export const companyRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - name
 *         - ruc
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado de la empresa
 *         name:
 *           type: string
 *           description: Nombre de la empresa
 *         ruc:
 *           type: string
 *           description: RUC de la empresa
 *         createAt:
 *           type: string
 *           format: date
 *           description: Fecha de creación
 */

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Obtiene todas las empresas
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Lista de todas las empresas
 */
companyRouter.get("/companies", getAllCompanies);

/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     summary: Obtiene una empresa por ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Detalles de la empresa
 */
companyRouter.get("/companies/:id", getCompanyById);

/**
 * @swagger
 * /api/companies:
 *   post:
 *     summary: Crea una nueva empresa
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: Empresa creada exitosamente
 */
companyRouter.post("/companies", createCompany);

/**
 * @swagger
 * /api/companies/{id}:
 *   put:
 *     summary: Actualiza una empresa existente
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Empresa actualizada exitosamente
 */
companyRouter.put("/companies/:id", updateCompany);

/**
 * @swagger
 * /api/companies/{id}:
 *   delete:
 *     summary: Elimina una empresa
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Empresa eliminada exitosamente
 */
companyRouter.delete("/companies/:id", deleteCompany);