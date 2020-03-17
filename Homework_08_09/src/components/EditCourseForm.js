import React from 'react';
import { Link } from 'react-router-dom';

class EditCourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.course.name,
      description: this.props.course.description,
      duration: this.props.course.duration,
      date: this.props.course.date,
    }
  }

  changeState = (propertyName, propertyValue ) => {
    this.setState({[propertyName]: propertyValue});
  }

  editCourse = e => {
    if ( this.state.name && this.state.description && this.state.duration && this.state.date) {
      this.props.editCourse(this.state)
    } else { 
      e.preventDefault()
      e.target.style.background='red';
    }
  }


  render() {
    return (
      <form className='form'>
        <h2>Edit Course</h2>
        <label htmlFor='form__name'>Title </label> <br/>
          <input 
            type='text'
            id='form__name'
            value={this.state.name}
            onChange={e=>this.changeState('name', e.target.value)}>
          </input> <br/>

        <label htmlFor='form__description'>Description </label> <br/>
          <textarea 
            type='text' 
            id='form__description'
            value={this.state.description}
            onChange={e=>this.changeState('description', e.target.value)}>
          </textarea> <br/>

        <label htmlFor='form__duration'>Duration </label> <br/>
          <input 
            type='text' 
            id='form__duration'
            value={this.state.duration}
            onChange={e=>this.changeState('duration', e.target.value)}>
          </input> <br/>

        <label htmlFor='form__date'>Date </label> <br/>
          <input 
            type='date' 
            id='form__date'
            value={this.state.date}
            onChange={e=>this.changeState('date', e.target.value)}>
          </input> <br/>

        <Link to='/'>
          <button className='bigButton' onClick={e => this.editCourse(e)}>Save</button>
        </Link>
        <Link to='/'>
          <button className='cancel'>Cancel</button>
        </Link>
      </form>
    )
  }
}

export default EditCourseForm;
