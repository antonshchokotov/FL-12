import React from 'react';
import SearchConnected from '../components/SearchConnected';
import CoursesListConnected from '../components/CoursesListConnected';
import AddCourse from '../components/AddCourse';


function Home() {
  return (
    <div className='home'>
      <div className='topBar'>
        <SearchConnected />
        <AddCourse />
      </div>
      <CoursesListConnected />
    </div>
  )
}

export default Home;