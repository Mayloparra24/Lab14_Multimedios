import { z } from "zod";

export const searchSchema = z.object({
  text: z.string()
    .trim()
    .min(1, "Búsqueda no puede estar vacía")
    .min(3, "Debe tener al menos 3 caracteres")
    .max(50, "No puede tener más de 50 caracteres")
    .transform(value => value.toLowerCase())
});

export const albumSchema = z.object({
  titulo: z.string().min(1, "Título es obligatorio").max(100),
  artista: z.string().min(1, "Artista es obligatorio").max(100),
  genero: z.string().min(1, "Género es obligatorio").max(50),
  anio: z.number().int().min(1900).max(2100),
  sello: z.string().min(1, "Sello discográfico es obligatorio").max(100),
  pistas: z.number().int().positive(),
  imagen: z.string().min(1, "Imagen es obligatoria").max(100),
  slug: z.string().min(1, "Slug es obligatorio").max(100).regex(/^[a-z0-9-]+$/, "Slug solo puede contener letras minúsculas, números y guiones"),
  resumen: z.string().min(1, "Resumen es obligatorio").max(200),
  descripcion: z.string().min(1, "Descripción es obligatoria").max(2000)
});

export const albumUpdateSchema = z.object({
  titulo: z.string().min(1, "Título es obligatorio").max(100).optional(),
  artista: z.string().min(1, "Artista es obligatorio").max(100).optional(),
  genero: z.string().min(1, "Género es obligatorio").max(50).optional(),
  anio: z.number().int().min(1900).max(2100).optional(),
  sello: z.string().min(1, "Sello discográfico es obligatorio").max(100).optional(),
  pistas: z.number().int().positive().optional(),
  imagen: z.string().min(1, "Imagen es obligatoria").max(100).optional(),
  resumen: z.string().min(1, "Resumen es obligatorio").max(200).optional(),
  descripcion: z.string().min(1, "Descripción es obligatoria").max(2000).optional()
});
