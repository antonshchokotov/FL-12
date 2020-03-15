import { connect } from 'react-redux';
import CoursesList from './CoursesList';
import { deleteCourse } from '../redux/actions';
import { setEditCourseId } from '../redux/actions'

const mapStateToProps = state => ({
  courses: state.courses.filter(el => el.name.toLowerCase().includes(state.searchText.toLowerCase()))
});

const mapDispatchToProps = dispatch => ({
  deleteCourse: id => dispatch(deleteCourse(id)),
  setEditCourseId: id => dispatch(setEditCourseId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesList);