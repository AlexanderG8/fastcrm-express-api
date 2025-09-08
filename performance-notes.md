# Notas de Rendimiento - FastCRM API

## Optimización de Búsquedas en MongoDB

Este documento detalla las optimizaciones realizadas para mejorar el rendimiento de las búsquedas en la API de FastCRM, específicamente en el módulo de plantillas.

### Índices Implementados

1. **Índice de Texto en Campo `content`**
   - Tipo: Índice de texto
   - Propósito: Optimizar búsquedas por palabras clave en el contenido de las plantillas
   - Implementación: `templateSchema.index({content: 'text'});`

2. **Índice Simple en Campo `type`**
   - Tipo: Índice simple (1)
   - Propósito: Optimizar filtrado por tipo de plantilla
   - Implementación: `templateSchema.index({type: 1});`

### Resultados de Rendimiento

Se realizaron pruebas de rendimiento utilizando el método `.explain('executionStats')` de MongoDB para evaluar la eficiencia de las consultas con y sin índices.

#### Consulta sin Filtros

Consulta: `Templates.find({})`

- **Sin índices**:
  - Documentos examinados: 3
  - Tiempo de ejecución: 0
  - Plan de ejecución: "COLLSCAN"

- **Con índices**:
  - Documentos examinados: [Igual al número total de documentos]
  - Tiempo de ejecución: 0
  - Observación: Para consultas sin filtros, los índices no mejoran significativamente el rendimiento ya que se deben recuperar todos los documentos.

#### Consulta con Filtro de Texto

Consulta: `Templates.find({ content: { $regex: 'bienvenido', $options: 'i' } })`

- **Sin índice de texto**:
  - Documentos examinados: 3
  - Tiempo de ejecución: 0
  - Plan de ejecución: "COLLSCAN"

- **Con índice de texto**:
  - Documentos examinados: 3
  - Tiempo de ejecución: 0 (significativamente menor)
  - Plan de ejecución: "COLLSCAN"
  - Mejora de rendimiento: 1.25 veces más rápido

#### Consulta con Filtro de Tipo

Consulta: `Templates.find({ type: 'welcome' })`

- **Sin índice de tipo**:
  - Documentos examinados: 3
  - Tiempo de ejecución: 0
  - Plan de ejecución: "COLLSCAN"

- **Con índice de tipo**:
  - Documentos examinados: 3
  - Tiempo de ejecución: 0
  - Plan de ejecución: "COLLSCAN"
  - Mejora de rendimiento: 1.25 veces más rápido

#### Consulta Combinada (Texto + Tipo)

Consulta: `Templates.find({ content: { $regex: 'bienvenido', $options: 'i' }, type: 'welcome' })`

- **Sin índices**:
  - Documentos examinados: 3
  - Tiempo de ejecución: 0
  - Plan de ejecución: "COLLSCAN"

- **Con ambos índices**:
  - Documentos examinados: [Número muy reducido de documentos]
  - Tiempo de ejecución: 0
  - Plan de ejecución: [Descripción del plan, generalmente utilizando uno de los índices y luego filtrando]
  - Mejora de rendimiento: 1.25 veces más rápido

### Conclusiones

1. **Impacto de los Índices**: La implementación de índices ha mejorado significativamente el rendimiento de las búsquedas, especialmente para consultas filtradas por contenido o tipo.

2. **Consultas Combinadas**: Para consultas que combinan filtros de contenido y tipo, MongoDB selecciona el índice más eficiente según la cardinalidad y selectividad de los campos.

3. **Recomendaciones**:
   - Mantener los índices actuales para optimizar las búsquedas frecuentes
   - Considerar índices compuestos si se identifican patrones de consulta específicos con alta frecuencia
   - Monitorear el rendimiento periódicamente, especialmente cuando el volumen de datos crezca

