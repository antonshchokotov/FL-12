let nextCourseId = 3;

export const searchChange = text => ({
  type: 'SEARCH',
  text
});

export const deleteCourse = id => ({
  type: 'DELETE_COURSE',
  id
});

export const addCourse = course => ({
  type: 'ADD_COURSE',
  course,
  id: nextCourseId++
});

export const setEditCourseId = id => ({
  type: 'SET_EDIT_ID',
  id
});

export const editCourse = course => ({
  type: 'EDIT_COURSE',
  course
});