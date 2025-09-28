import { Router } from "express"; 
import {getAllTemplates, createTemplate, updateTemplate, deleteTemplate, getTemplateById} from "../controllers/templateController.js";

export const templateRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Template:
 *       type: object
 *       required:
 *         - name
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado de la plantilla
 *         name:
 *           type: string
 *           description: Nombre de la plantilla
 *         content:
 *           type: string
 *           description: Contenido de la plantilla
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Fecha de creación
 *       example:
 *         _id: 60d21b4967d0d8992e610c85
 *         name: Plantilla de Bienvenida
 *         content: Hola {nombre}, bienvenido a nuestra plataforma.
 *         createdAt: 2023-06-01T12:00:00.000Z
 */

/**
 * @swagger
 * /api/templates:
 *   get:
 *     summary: Obtiene todas las plantillas
 *     tags: [Templates]
 *     responses:
 *       200:
 *         description: Lista de todas las plantillas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 */
templateRouter.get("/templates", getAllTemplates);

/**
 * @swagger
 * /api/templates/{id}:
 *   get:
 *     summary: Obtiene una plantilla por ID
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la plantilla
 *     responses:
 *       200:
 *         description: Detalles de la plantilla
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       404:
 *         description: Plantilla no encontrada
 */
templateRouter.get("/templates/:id", getTemplateById);

/**
 * @swagger
 * /api/templates:
 *   post:
 *     summary: Crea una nueva plantilla
 *     tags: [Templates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - content
 *             properties:
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Plantilla creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       400:
 *         description: Datos inválidos
 */
templateRouter.post("/templates", createTemplate);

/**
 * @swagger
 * /api/templates/{id}:
 *   put:
 *     summary: Actualiza una plantilla existente
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la plantilla
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Plantilla actualizada exitosamente
 *       404:
 *         description: Plantilla no encontrada
 */
templateRouter.put("/templates/:id", updateTemplate);

/**
 * @swagger
 * /api/templates/{id}:
 *   delete:
 *     summary: Elimina una plantilla
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la plantilla
 *     responses:
 *       200:
 *         description: Plantilla eliminada exitosamente
 *       404:
 *         description: Plantilla no encontrada
 */
templateRouter.delete("/templates/:id", deleteTemplate);