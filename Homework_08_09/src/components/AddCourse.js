import React from 'react';
import { Link } from 'react-router-dom';

class AddCourse extends React.Component {
  render() {
    return <Link to="/add"><button className='bigButton'>Add course</button></Link>
  }
}

export default AddCourse;