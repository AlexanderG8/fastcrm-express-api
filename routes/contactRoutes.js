import { Router } from "express";
import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from "../controllers/contactController.js";

export const contactRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - whatsapp
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del contacto
 *         name:
 *           type: string
 *           description: Nombre del contacto
 *         whatsapp:
 *           type: string
 *           description: Número de WhatsApp del contacto
 *         createAt:
 *           type: string
 *           format: date
 *           description: Fecha de creación
 *         companyId:
 *           type: integer
 *           description: ID de la empresa asociada
 *       example:
 *         id: 1
 *         name: Juan Pérez
 *         whatsapp: "+51987654321"
 *         createAt: "2023-06-01T12:00:00.000Z"
 *         companyId: 1
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Obtiene todos los contactos
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Lista de todos los contactos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
contactRouter.get("/contacts", getAllContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Obtiene un contacto por ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del contacto
 *     responses:
 *       200:
 *         description: Detalles del contacto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contacto no encontrado
 */
contactRouter.get("/contacts/:id", getContactById);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Crea un nuevo contacto
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - whatsapp
 *             properties:
 *               name:
 *                 type: string
 *               whatsapp:
 *                 type: string
 *               companyId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Contacto creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
contactRouter.post("/contacts", createContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Actualiza un contacto existente
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               whatsapp:
 *                 type: string
 *               companyId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Contacto actualizado exitosamente
 *       404:
 *         description: Contacto no encontrado
 */
contactRouter.put("/contacts/:id", updateContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Elimina un contacto
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del contacto
 *     responses:
 *       200:
 *         description: Contacto eliminado exitosamente
 *       404:
 *         description: Contacto no encontrado
 */
contactRouter.delete("/contacts/:id", deleteContact);
