/**
 * El esquema, es la definición del conjunto de datos que se guardará en la plantilla
 */

import mongoose from "mongoose";
const {Schema} = mongoose;

const templateSchema = new Schema({
    type: {type: String, default: 'welcome'},
    content: {type: String, required: [true, 'El contenido es obligatorio']},
    labels: [{label: String}],
    author: {type: String, required: [true, 'El autor es obligatorio']},
    createdAt: {type: Date, default: Date.now}
});

// 
export const Templates = mongoose.model('Templates', templateSchema);
