import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';
import { CourseController } from './course.controller';


const router = express.Router();

router.post(
  '/create-course',
  validateRequest(createStudentValidationSchema),
  CourseController.createCourse,
);

router.get('/', CourseController.getAllCourses);

router.patch('/:id', CourseController.getSingleCourse);

router.patch('/:id',
  validateRequest(updateCourseValidationSchema),
  CourseController.createCourse,)

router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
