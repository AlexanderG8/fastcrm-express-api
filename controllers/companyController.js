import prisma from "../lib/db.js";
import { z } from 'zod';

export async function getAllCompanies(req, res) {
    try {
        const companies = await prisma.company.findMany({
            orderBy: [{ createAt: 'desc' }],
            include: { contacts: true } // Incluir los contactos asociados a cada empresa
        });
        
        res.status(200).json({ companies: companies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getCompanyById(req, res) {
    try {
        const { id } = req.params;
        
        // Verificar que el ID sea un número válido
        const companyId = parseInt(id);
        if (isNaN(companyId)) {
            return res.status(400).json({ error: "ID de empresa inválido" });
        }
        
        // Buscar la empresa por ID incluyendo sus contactos
        const company = await prisma.company.findUnique({
            where: { id: companyId },
            include: { contacts: true } // Incluir los contactos asociados
        });
        
        // Verificar si la empresa existe
        if (!company) {
            return res.status(404).json({ error: "Empresa no encontrada" });
        }
        
        // Devolver la empresa encontrada con sus contactos
        res.status(200).json({
            company: company
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al buscar la empresa",
            details: error.message
        });
    }
}

export async function createCompany(req, res) {
    try {
        // Definimos el esquema de validaciones con ZOD
        const companySchema = z.object({
            name: z.string().min(1, 'El nombre es requerido'),
            ruc: z.string().min(1, 'El RUC es requerido'),
        });
        
        // Validamos los datos de entrada
        const validateData = companySchema.parse(req.body);

        // Creamos la empresa en la base de datos
        const newCompany = await prisma.company.create({
            data: {
                name: validateData.name,
                ruc: validateData.ruc,
            }
        });

        res.status(201).json({
            message: 'Empresa creada correctamente',
            company: newCompany
        });
    } catch (error) {
        // Manejo de errores de validaciones de ZOD
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Datos inválidos",
                details: error.errors
            });
        }

        // Manejo de otros errores
        res.status(500).json({
            error: "Error al crear la empresa",
            details: error.message
        });
    }
}

export async function updateCompany(req, res) {
    try {
        const { id } = req.params;
        
        // Verificar que el ID sea un número válido
        const companyId = parseInt(id);
        if (isNaN(companyId)) {
            return res.status(400).json({ error: "ID de empresa inválido" });
        }
        
        // Definimos el esquema de validaciones con ZOD para campos opcionales
        const companySchema = z.object({
            name: z.string().min(1, 'El nombre es requerido').optional(),
            ruc: z.string().min(1, 'El RUC es requerido').optional(),
        });
        
        // Validamos los datos de entrada
        const validateData = companySchema.parse(req.body);
        
        // Verificar si la empresa existe
        const existingCompany = await prisma.company.findUnique({
            where: { id: companyId }
        });
        
        if (!existingCompany) {
            return res.status(404).json({ error: "Empresa no encontrada" });
        }
        
        // Actualizamos la empresa en la base de datos
        const updatedCompany = await prisma.company.update({
            where: { id: companyId },
            data: validateData
        });
        
        res.status(200).json({
            message: 'Empresa actualizada correctamente',
            company: updatedCompany
        });
    } catch (error) {
        // Manejo de errores de validaciones de ZOD
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Datos inválidos",
                details: error.errors
            });
        }
        
        // Manejo de otros errores
        res.status(500).json({
            error: "Error al actualizar la empresa",
            details: error.message
        });
    }
}

export async function deleteCompany(req, res) {
    try {
        const { id } = req.params;
        
        // Verificar que el ID sea un número válido
        const companyId = parseInt(id);
        if (isNaN(companyId)) {
            return res.status(400).json({ error: "ID de empresa inválido" });
        }
        
        // Verificar si la empresa existe
        const existingCompany = await prisma.company.findUnique({
            where: { id: companyId }
        });
        
        if (!existingCompany) {
            return res.status(404).json({ error: "Empresa no encontrada" });
        }
        
        // Verificar si la empresa tiene contactos asociados
        const companyWithContacts = await prisma.company.findUnique({
            where: { id: companyId },
            include: { contacts: true }
        });
        
        if (companyWithContacts.contacts.length > 0) {
            return res.status(400).json({ 
                error: "No se puede eliminar la empresa porque tiene contactos asociados",
                contactCount: companyWithContacts.contacts.length
            });
        }
        
        // Eliminamos la empresa de la base de datos
        await prisma.company.delete({
            where: { id: companyId }
        });
        
        res.status(200).json({
            message: 'Empresa eliminada correctamente'
        });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({
            error: "Error al eliminar la empresa",
            details: error.message
        });
    }
}