import { connect } from 'react-redux';
import EditCourseForm from './EditCourseForm';
import { editCourse } from '../redux/actions';

const mapDispatchToProps = dispatch => ({
  editCourse: course => dispatch(editCourse(course))
});

const mapStateToProps = state => ({
  course: state.courses.find(el => el.id === state.editCourseId)
})


export default connect(mapStateToProps, mapDispatchToProps)(EditCourseForm)