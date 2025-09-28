/**
 * Middleware para manejo centralizado de errores
 */

// Middleware para capturar errores
export const errorHandler = (err, req, res, next) => {
  // Determinar el código de estado HTTP
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
  // Configurar la respuesta
  res.status(statusCode);
  
  // Enviar respuesta JSON con el error
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    error: true
  });
};

// Middleware para manejar rutas no encontradas
export const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  res.status(404);
  next(error);
};