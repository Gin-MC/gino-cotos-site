// src/content/config.ts
import { z, defineCollection } from 'astro:content';

// Definimos la estructura de nuestra colección de tutoriales
const tutorialesCollection = defineCollection({
  type: 'content', // Especificamos que son archivos Markdown (.md o .mdx)
  schema: z.object({
    title: z.string(),
    // Validamos que la descripción no pase de 160 caracteres (Regla de oro SEO)
    description: z.string().max(160, "La descripción SEO debe ser menor a 160 caracteres."),
    pubDate: z.date(),
    author: z.string().default('Gino Cotos'),
    tags: z.array(z.string()),
    draft: z.boolean().optional().default(false), // Útil para guardar artículos sin publicarlos
  }),
});

// Exportamos las colecciones registradas
export const collections = {
  'tutoriales': tutorialesCollection,
};