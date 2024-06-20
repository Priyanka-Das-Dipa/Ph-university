import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payLoad: TCourse) => {
  const result = await Course.create(payLoad);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const updateCourseIntoDB = async (id: string, payLoad: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payLoad;

  // step-1 basic data update
  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // filter out the deleted fields
    const deletePreRequisites = preRequisiteCourses
      .filter((el) => el.course && el.isDelete)
      .map((el) => el.course);
    console.log(deletePreRequisites);

    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletePreRequisites } } },
    });

    // filter out the new course fields

    const newPreRequisties = preRequisiteCourses?.filter(
      (el) => el.course && !el.isDelete,
    );
    console.log(newPreRequisties);

    const newPreRequistiesCourse = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: newPreRequisties } },
    });
    return {
      updateBasicCourseInfo,
      deletedPreRequisiteCourses,
      newPreRequistiesCourse,
    };
  }
  return updateCourseIntoDB;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
