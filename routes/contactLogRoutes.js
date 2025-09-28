import express from 'express';
import { 
    getAllContactLogs, 
    getContactLogById, 
    createContactLog, 
    updateContactLog, 
    deleteContactLog,
    getContactLogsByContactId
} from '../controllers/contactLogController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactLog:
 *       type: object
 *       required:
 *         - contactId
 *         - templateUsed
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del registro
 *         date:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora del contacto
 *         templateUsed:
 *           type: string
 *           description: Plantilla utilizada para el contacto
 *         notes:
 *           type: string
 *           description: Notas adicionales sobre el contacto
 *         contactId:
 *           type: integer
 *           description: ID del contacto relacionado
 */

/**
 * @swagger
 * /api/contactlogs:
 *   get:
 *     summary: Obtiene todos los registros de contacto
 *     tags: [ContactLogs]
 *     responses:
 *       200:
 *         description: Lista de todos los registros
 */
router.get('/contactlogs', getAllContactLogs);

/**
 * @swagger
 * /api/contactlogs/{id}:
 *   get:
 *     summary: Obtiene un registro por ID
 *     tags: [ContactLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Detalles del registro
 */
router.get('/contactlogs/:id', getContactLogById);

/**
 * @swagger
 * /api/contactlogs:
 *   post:
 *     summary: Crea un nuevo registro de contacto
 *     tags: [ContactLogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactLog'
 *     responses:
 *       201:
 *         description: Registro creado exitosamente
 */
router.post('/contactlogs', createContactLog);

/**
 * @swagger
 * /api/contactlogs/{id}:
 *   put:
 *     summary: Actualiza un registro existente
 *     tags: [ContactLogs]
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
 *             $ref: '#/components/schemas/ContactLog'
 *     responses:
 *       200:
 *         description: Registro actualizado exitosamente
 */
router.put('/contactlogs/:id', updateContactLog);

/**
 * @swagger
 * /api/contactlogs/{id}:
 *   delete:
 *     summary: Elimina un registro
 *     tags: [ContactLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Registro eliminado exitosamente
 */
router.delete('/contactlogs/:id', deleteContactLog);

/**
 * @swagger
 * /api/contacts/{contactId}/logs:
 *   get:
 *     summary: Obtiene todos los registros de un contacto específico
 *     tags: [ContactLogs]
 *     parameters:
 *       - in: path
 *         name: contactId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de registros del contacto
 */
router.get('/contacts/:contactId/logs', getContactLogsByContactId);

export { router as contactLogRouter };