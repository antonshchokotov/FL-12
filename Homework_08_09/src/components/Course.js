import React from 'react';
import editIcon from '../edit.svg';
import deleteIcon from '../delete.svg';
import { Link } from 'react-router-dom';

class Course extends React.Component {
  render() {
    const {id, name, description, date, duration} = this.props.course;
    const deleteCourse = () => this.props.deleteCourse(id);
    const editCourse = () => this.props.setEditCourseId(id);
    return (
      <div className='course'>
        <div>{date}</div>
        <div className='name'>{name}</div>
        <div>{description}</div>
        <div>{duration}</div>
        <div>
          <Link to='/edit'>
            <button onClick={editCourse}>
              <img src={editIcon} width='16px' alt='edit'/>
            </button>
          </Link>
          <button onClick={deleteCourse}>
            <img src={deleteIcon} width='16px' alt='delete'/>
          </button>
        </div>
      </div>
    )
  }
}

export default Course;