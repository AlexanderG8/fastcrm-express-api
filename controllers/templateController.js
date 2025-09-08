import { Templates } from "../models/Template.js";

export async function getAllTemplates(req, res){
    try {
        const templates = await Templates.find({});
    res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export async function createTemplate(req, res){
    const {content, author, type, labels} = req.body;
    try {
        const newTemplate = await Templates.create({
        content: content,
        author: author,
        type: type,
        labels: labels,
        createdAt: new Date()
    });
    return res.status(201).json({template: newTemplate});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export async function updateTemplate(req, res){
    // Obtengo el ID
    const {id} = req.params;
    // Obtengo los nuevos datos a actualizar
    const {content, author, type, labels} = req.body;

    // Validación
    if(!content && !author){
        return res.status(400).json({error: 'Debes proporcionar al menos un campo para actualizar'});
    }

    try {
        // Buscamos primero si existe la plantilla
        const template = await Templates.findById(id);
        if(!template){
            return res.status(404).json({error: 'Plantilla no encontrada'});
        }

        // Actualizamos plantilla
        const updateTemplate = await Templates.findByIdAndUpdate(id, {
            content: content || template.content,
            author: author || template.author,
            type: type || template.type,
            labels: labels || template.labels
        },
        {new: true, runValidators: true}
    );
        return res.status(200).json({template: updateTemplate});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export async function deleteTemplate(req, res){
    const { id } = req.params;

    try {
        // Buscamos primero si existe la plantilla
        const template = await Templates.findById(id);
        // Validación
        if (!template) {
            return res.status(404).json({error: 'Plantilla no encontrada'});
        }
        // Eliminamos la plantilla
        await Templates.findByIdAndDelete(id);
        return res.status(200).json({message: 'Plantilla eliminada correctamente'});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({error: 'ID de plantilla inválido'});
        }
        return res.status(500).json({error: error.message});
    }
}

export async function getTemplateById(req, res){
    const { id } = req.params;
    // Validación
    if (!id) {
        return res.status(400).json({error: 'ID de plantilla inválido'});
    }
    try {
        const template = await Templates.findById(id);
        if (!template) {
            return res.status(404).json({error: 'Plantilla no encontrada'});
        }
        return res.status(200).json(template);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({error: 'ID de plantilla inválido'});
        }
        return res.status(500).json({error: error.message});
    }
}