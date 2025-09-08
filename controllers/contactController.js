import prisma from "../lib/db.js";
import {z} from 'zod';

export async function getAllContacts(req, res){
    try {
        const contacts = await prisma.contact.findMany({
            orderBy: [{createAt: 'desc'}],
            include: { company: true } // Incluir información de la empresa
        });
        res.status(200).json({contacs: contacts});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


export async function getContactById(req, res) {
    try {
        const { id } = req.params;
        
        // Verificar que el ID sea un número válido
        const contactId = parseInt(id);
        if (isNaN(contactId)) {
            return res.status(400).json({ error: "ID de contacto inválido" });
        }
        
        // Buscar el contacto por ID
        const contact = await prisma.contact.findUnique({
            where: { id: contactId },
            include: { company: true } // Incluir información de la empresa
        });
        
        // Verificar si el contacto existe
        if (!contact) {
            return res.status(404).json({ error: "Contacto no encontrado" });
        }
        
        // Devolver el contacto encontrado
        res.status(200).json({
            contact: contact
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al buscar el contacto",
            details: error.message
        });
    }
}

export async function createContact(req, res){
    try {
        // Definimos el esquema de validaciones con ZOD
        const contactSchema = z.object({
            name: z.string().min(1, 'El nombre es requerido'),
            whatsapp: z.string().min(1, 'El número de WhatsApp es requerido'),
            companyId: z.number().int().positive().optional()
        });
        // Validamos los datos de entrada
        const validateData = contactSchema.parse(req.body);

        // Si se proporciona companyId, verificamos que la empresa exista
        if (validateData.companyId) {
            const company = await prisma.company.findUnique({
                where: { id: validateData.companyId }
            });
            
            if (!company) {
                return res.status(404).json({
                    error: "Empresa no encontrada",
                    details: `No existe una empresa con el ID ${validateData.companyId}`
                });
            }
        }

        // Creamos el contacto en la base de datos
        const newContact = await prisma.contact.create({
            data: {
                name: validateData.name,
                whatsapp: validateData.whatsapp,
                companyId: validateData.companyId || null
            },
            include: { company: true } // Incluir información de la empresa en la respuesta
        });

        res.status(201).json({
            message: 'Contacto creado correctamente',
            contact: newContact
        })
    } catch (error) {
        // Manejo de errores de validaciones de ZOD
        if(error instanceof z.ZodError){
            return res.status(400).json({
                error: "Datos inválidos",
                details: error.errors
            });
        }

        // Manejo de otros errores
        res.status(500).json({
            error: "Error al crear el contacto",
            details: error.message
        });
    }
}


export async function updateContact(req, res) {
    try {
        const { id } = req.params;
        
        // Verificar que el ID sea un número válido
        const contactId = parseInt(id);
        if (isNaN(contactId)) {
            return res.status(400).json({ error: "ID de contacto inválido" });
        }
        
        // Definir esquema de validación con Zod
        const contactSchema = z.object({
            name: z.string().min(1, "El nombre es requerido").optional(),
            whatsapp: z.string().min(1, "El número de WhatsApp es requerido").optional(),
            companyId: z.number().int().positive().nullable().optional()
        });
        
        // Validar datos de entrada
        const validatedData = contactSchema.parse(req.body);
        
        // Si se proporciona companyId, verificar que la empresa exista
        if (validatedData.companyId !== undefined) {
            if (validatedData.companyId !== null) {
                const company = await prisma.company.findUnique({
                    where: { id: validatedData.companyId }
                });
                
                if (!company) {
                    return res.status(404).json({
                        error: "Empresa no encontrada",
                        details: `No existe una empresa con el ID ${validatedData.companyId}`
                    });
                }
            }
        }
        
        // Actualizar el contacto
        const updatedContact = await prisma.contact.update({
            where: { id: contactId },
            data: validatedData,
            include: { company: true } // Incluir información de la empresa en la respuesta
        });
        
        res.status(200).json({
            message: "Contacto actualizado correctamente",
            contact: updatedContact
        });
    } catch (error) {
        // Manejar errores de validación de Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Datos inválidos",
                details: error.errors
            });
        }
        
        // Manejar error de contacto no encontrado
        if (error.code === "P2025") {
            return res.status(404).json({
                error: "Contacto no encontrado"
            });
        }
        
        // Manejar otros errores
        res.status(500).json({
            error: "Error al actualizar el contacto",
            details: error.message
        });
    }
}


export async function deleteContact(req, res) {
    try {
        const { id } = req.params;
        
        // Verificar que el ID sea un número válido
        const contactId = parseInt(id);
        if (isNaN(contactId)) {
            return res.status(400).json({ error: "ID de contacto inválido" });
        }
        
        // Verificar si el contacto existe
        const existingContact = await prisma.contact.findUnique({
            where: { id: contactId }
        });
        
        if (!existingContact) {
            return res.status(404).json({ error: "Contacto no encontrado" });
        }

        // Eliminar el contacto de la base de datos
        await prisma.contact.delete({
            where: { id: contactId }
        });

        res.status(200).json({
            message: "Contacto eliminado exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el contacto",
            details: error.message
        });
    }
}