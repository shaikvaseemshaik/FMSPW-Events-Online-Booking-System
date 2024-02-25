import React from 'react';
import EventList from "./EventList";
import CreateEvent from "./CreateEvent";
import eventimage1 from "../images/eventimage1.jpg";
import eventimage2 from "../images/eventimage2.jpg";
import user from "../images/user.jpg"


import Event from "./Event";

//const EventList = () => 

const TeacherDashboard = (event) => {
  
  return (
    <>
      {/* <CreateEvent /> */}


      <h2 className="text-center">Events</h2>
      
      <img className="d-block mx-auto img-fluid w-20" src={user} height={150}
        width={200} alt="BigCo Inc. logo" />
        <h5 className="text-center">USER</h5>
      <EventList />


    </>
  );
};

export default TeacherDashboard;
