import { Templates } from "../models/Template.js";

/**
 * Función para evaluar el rendimiento de las consultas
 * Esta función se puede ejecutar desde un script separado o desde una ruta de API específica
 */
export async function evaluateQueryPerformance() {
    try {
        console.log('Evaluando rendimiento de consultas...');
        
        // Consulta sin filtros (todas las plantillas)
        console.log('\n1. Consulta sin filtros:');
        const explainAllTemplates = await Templates.find({}).explain('executionStats');
        console.log('Documentos examinados:', explainAllTemplates.executionStats.totalDocsExamined);
        console.log('Tiempo de ejecución (ms):', explainAllTemplates.executionStats.executionTimeMillis);
        console.log('Plan de ejecución:', explainAllTemplates.queryPlanner.winningPlan);
        
        // Consulta con filtro de texto (usando el índice de texto)
        console.log('\n2. Consulta con filtro de texto:');
        const explainTextSearch = await Templates.find({ 
            content: { $regex: 'bienvenido', $options: 'i' } 
        }).explain('executionStats');
        console.log('Documentos examinados:', explainTextSearch.executionStats.totalDocsExamined);
        console.log('Tiempo de ejecución (ms):', explainTextSearch.executionStats.executionTimeMillis);
        console.log('Plan de ejecución:', explainTextSearch.queryPlanner.winningPlan);
        
        // Consulta con filtro de tipo (usando el índice de tipo)
        console.log('\n3. Consulta con filtro de tipo:');
        const explainTypeFilter = await Templates.find({ 
            type: 'welcome' 
        }).explain('executionStats');
        console.log('Documentos examinados:', explainTypeFilter.executionStats.totalDocsExamined);
        console.log('Tiempo de ejecución (ms):', explainTypeFilter.executionStats.executionTimeMillis);
        console.log('Plan de ejecución:', explainTypeFilter.queryPlanner.winningPlan);
        
        // Consulta combinada (texto + tipo)
        console.log('\n4. Consulta combinada (texto + tipo):');
        const explainCombinedFilter = await Templates.find({ 
            content: { $regex: 'bienvenido', $options: 'i' },
            type: 'welcome'
        }).explain('executionStats');
        console.log('Documentos examinados:', explainCombinedFilter.executionStats.totalDocsExamined);
        console.log('Tiempo de ejecución (ms):', explainCombinedFilter.executionStats.executionTimeMillis);
        console.log('Plan de ejecución:', explainCombinedFilter.queryPlanner.winningPlan);
        
        return {
            allTemplates: explainAllTemplates,
            textSearch: explainTextSearch,
            typeFilter: explainTypeFilter,
            combinedFilter: explainCombinedFilter
        };
    } catch (error) {
        console.error('Error al evaluar rendimiento:', error);
        throw error;
    }
}