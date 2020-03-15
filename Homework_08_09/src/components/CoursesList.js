import React from 'react';
import Course from './Course';

class CoursesList extends React.Component {
  render() {
    return (
      <div className='coursesList'>
        { this.props.courses.map(el => <Course key={el.id}
            course={el} deleteCourse={this.props.deleteCourse}
            setEditCourseId={this.props.setEditCourseId} />) }
      </div>
    )
  }
}

export default CoursesList;