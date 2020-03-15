const rootReducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_COURSE':
      return {...state,
        courses: state.courses.filter(el => el.id !== action.id)};

    case 'SEARCH':
      return {...state, searchText: action.text};

    case 'ADD_COURSE':
      const updatedCourses = [...state.courses];
      updatedCourses.push({...action.course, id: action.id});
      return {...state, courses: updatedCourses};
    
    case 'SET_EDIT_ID':
      return {...state, editCourseId: action.id};

    case 'EDIT_COURSE':
      const editedCourses = [...state.courses];
      const courseIndex =
          editedCourses.findIndex(el => el.id === state.editCourseId)
      editedCourses.splice(courseIndex, 1, {
        ...action.course,
        id: state.editCourseId
      });
      return {...state, courses: editedCourses, editCourseId: null}

    default:
      return state;
  }
}

export default rootReducer;