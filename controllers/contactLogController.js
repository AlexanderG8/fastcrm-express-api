import prisma from '../lib/db.js';

/**
 * Controlador para gestionar los registros de contacto (ContactLog)
 */

// Obtener todos los registros de contacto
export const getAllContactLogs = async (req, res, next) => {
  try {
    const contactLogs = await prisma.contactLog.findMany({
      include: {
        contact: true
      }
    });
    res.json(contactLogs);
  } catch (error) {
    next(error);
  }
};

// Obtener un registro de contacto por ID
export const getContactLogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactLog = await prisma.contactLog.findUnique({
      where: { id: Number(id) },
      include: {
        contact: true
      }
    });

    if (!contactLog) {
      res.status(404);
      throw new Error('Registro de contacto no encontrado');
    }

    res.json(contactLog);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo registro de contacto
export const createContactLog = async (req, res, next) => {
  try {
    const { contactId, templateUsed, notes } = req.body;

    // Verificar si el contacto existe
    const contactExists = await prisma.contact.findUnique({
      where: { id: Number(contactId) }
    });

    if (!contactExists) {
      res.status(404);
      throw new Error('El contacto especificado no existe');
    }

    const newContactLog = await prisma.contactLog.create({
      data: {
        contactId: Number(contactId),
        templateUsed,
        notes
      }
    });

    res.status(201).json(newContactLog);
  } catch (error) {
    next(error);
  }
};

// Actualizar un registro de contacto
export const updateContactLog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { templateUsed, notes } = req.body;

    const updatedContactLog = await prisma.contactLog.update({
      where: { id: Number(id) },
      data: {
        templateUsed,
        notes
      }
    });

    res.json(updatedContactLog);
  } catch (error) {
    next(error);
  }
};

// Eliminar un registro de contacto
export const deleteContactLog = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.contactLog.delete({
      where: { id: Number(id) }
    });

    res.json({ message: 'Registro de contacto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

// Obtener registros de contacto por contactId
export const getContactLogsByContactId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    
    const contactLogs = await prisma.contactLog.findMany({
      where: { contactId: Number(contactId) },
      include: {
        contact: true
      }
    });

    res.json(contactLogs);
  } catch (error) {
    next(error);
  }
};