import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'El título de la película debe ser string',
    required_error: 'El título es requerido'
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: 'El poster debe ser una url válida'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crime']),
    {
      required_error: 'Género de la película es requerido',
      invalid_type_error: 'El género de la película debe ser un arreglo de enum Genre'
    }
  ),
  rate: z.number().min(0).max(10).default(0)

})

export const validateMovie = object => {
//   return movieSchema.parse(object)
  return movieSchema.safeParse(object)
}

export const validatePartialMovie = object => {
//   return movieSchema.parse(object)
  return movieSchema.partial().safeParse(object)
}
