import { z } from 'zod';

const PreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDelete: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.string(),
    credits: z.number(),
    preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema),
    isDeleted: z.boolean().optional(),
  }),
});


const updatePreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDelete: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.string().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z.array(updatePreRequisiteCourseValidationSchema),
    isDeleted: z.boolean().optional(),
  }),
});


export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
