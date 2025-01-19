import { z } from 'zod';

export const schemaCreate = z.object({
  name: z
    .string()
    .min(1, 'Мінімум 1 символи')
    .max(50, 'Максимум 50 символів')
    .refine((val) => val !== '', { message: "Це поле обов'язкове" }),

  field: z
    .string()
    .refine((val) => val !== '', { message: "Це поле обов'язкове" }),

  experience: z
    .string()
    .min(1, 'Мінімум 1 символи')
    .max(50, 'Максимум 50 символів')
    .refine((val) => val !== '', { message: "Це поле обов'язкове" })
    .refine((val) => /\d/.test(val), { message: 'Поле повинно містити хоча б одну цифру' }),

  deadline: z
    .string()
    .nonempty('Оберіть дату')
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Неправильний формат дати',
    })
    .refine(
      (date) => {
        const selectedDate = new Date(date); 
        const today = new Date(); 
        today.setHours(0, 0, 0, 0); 
        const minimumDate = new Date(today);
        minimumDate.setDate(today.getDate() + 1); 
        return selectedDate >= minimumDate;
      },
      {
        message:
          'Дата повинна бути мінімум на 1 день пізніше від сьогоднішньої',
      }
    ),
    
  description: z
    .string()
    .min(1, 'Мінімум 1 символи')
    .max(100, 'Максимум 100 символів')
    .refine((val) => val !== '', { message: "Це поле обов'язкове" }),
});
