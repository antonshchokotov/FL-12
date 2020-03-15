import { connect } from 'react-redux';
import NewCourseForm from './NewCourseForm';
import {addCourse} from '../redux/actions';

const mapDispatchToProps = dispatch => ({
  addCourse: course => dispatch(addCourse(course))
});

export default connect(null, mapDispatchToProps)(NewCourseForm)