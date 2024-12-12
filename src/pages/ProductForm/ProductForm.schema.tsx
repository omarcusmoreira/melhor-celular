import { z } from 'zod';
 
export const productFormSchema = z
    .object({
      model: z
        .string()
        .min(2, 'O modelo deve ter pelo menos 2 caracteres.')
        .max(255, 'O modelo deve ter no máximo 255 caracteres.')
        .regex(/^[a-zA-Z0-9\s]*$/, 'O modelo deve ser alfanumérico.'),
      price: z
        .number({ invalid_type_error: 'O preço deve ser um número.' })
        .positive('O preço deve ser um número positivo.'),
      brand: z
        .string()
        .min(2, 'A marca deve ter pelo menos 2 caracteres.')
        .max(255, 'A marca deve ter no máximo 255 caracteres.')
        .regex(/^[a-zA-Z0-9\s]*$/, 'A marca deve ser alfanumérica.'),
      startDate: z
        .string()
        .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'A data de início deve estar no formato dd/mm/aaaa.')
        .refine(
          (date) => {
            const [day, month, year] = date.split('/').map(Number);
            const startDate = new Date(year, month - 1, day);
            return startDate > new Date(2018, 11, 25); // 25/12/2018
          },
          { message: 'A data de início deve ser após 25/12/2018.' }
        ),
      endDate: z
        .string()
        .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'A data de término deve estar no formato dd/mm/aaaa.'),
    color: z.enum(['PRETO', 'BRANCO', 'DOURADO', 'ROSA'], {
        errorMap: () => ({ message: 'A cor deve ser uma das seguintes: Preto, Branco, Dourado ou Rosa.' }),
    }),
    code: z
    .string()
    .length(8, 'O código deve ter exatamente 8 caracteres.')
    .regex(/^[a-zA-Z0-9]*$/, 'O código deve ser alfanumérico.'),
})
.superRefine((data, ctx) => {
    if (!data.startDate || !data.endDate) {
      ctx.addIssue({
        code: 'custom',
        path: !data.startDate ? ['startDate'] : ['endDate'],
        message: 'Both dates are required.',
      });
      return;
    }
  
    const [startDay, startMonth, startYear] = data.startDate.split('/').map(Number);
    const [endDay, endMonth, endYear] = data.endDate.split('/').map(Number);
  
    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    
    if (endDate <= startDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'A data de término deve ser após a data de início.',
      });
    }
  });
  
  