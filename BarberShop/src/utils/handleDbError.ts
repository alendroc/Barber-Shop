export function parseDbError(error: any): string {
  const message = typeof error === "string" ? error : error.message || "";

  if (message.includes("UNIQUE constraint failed: usuario.correo")) {
    return "El correo ya está registrado. Usa uno diferente.";
  }

  if (message.includes("SQLITE_CONSTRAINT")) {
    return "Datos inválidos o conflicto con datos existentes.";
  }

  if (message.includes("not null") || message.includes("NULL constraint failed")) {
    return "Faltan campos obligatorios.";
  }

  if (message.includes("foreign key constraint failed")) {
    return "La referencia a otra tabla no es válida.";
  }

   if (message.includes("Credenciales inválidas")) {
    return "Credenciales Inválidas";
  }

    if (message.includes("No autenticado")) {
    return "Usuario no registrado";
  }

 

  // Agrega más condiciones según los errores que esperes
  return "Error interno del servidor. Intenta más tarde.";
}
