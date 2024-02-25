// src/components/HomePage.js
import React from 'react';
import fmspw from "../images/fmspw.jpg"
const HomePage = () => {
  const staticBlogs = [
    {
      id: 1,
      title: 'Christmas Drawing Competition',
      content: `
        Welcome to the Christmas Drawing competition! It’s fairly straightforward, use Desmos to create a Christmas scene. 
        Take a look at our Desmos Christmas constructions YouTube playlist to get yourself started and get building!
        A tutorial will be sent in November but if any teachers would like more guidance on using Desmos, please contact Jen here.

        [Desmos Christmas Constructions Playlist](https://www.youtube.com/watch?v=4fBxYJl8tH8&list=PL0ThtFmyYmsvQWa5E4g40eAqjh0vXeJ4g)

        The competition will be split into three categories – Year 7 & 8; Year 9, 10, and 11; Year 12 & 13. 
        A £15 voucher will be available for the best Desmos drawing in each category. 
        We will contact the teacher to arrange delivery of the prize.

        To enter a student’s Desmos drawing in the art competition, please complete and submit the information below. 
        1 form per student. Deadline for entries 19th December 2023

        To see how to get the URL watch this.

        [How to Get Desmos Drawing URL](https://youtu.be/17umS8I4L5w)

        Drawings will be shared on our Twitter feed @RhGBMC_FMSPW as well as the winners.
      `,
      image: 'http://furthermaths.wales/wp-content/uploads/2021/12/Snowman-Gif.gif'
    },
    {
      id: 2,
      title: 'Problem Solving Courses for STEM Students',
      content: `
          The FMSPW are running two courses on problem solving aimed at students aspiring to study STEM related subjects at top universities. 
          Problem solving, the ability to tackle problems for which the solution method is not immediately clear, is a key part of mathematics. 
          Good problem solvers, in addition to conceptual understanding and procedural fluency, need to develop other skills and attitudes: 
          mathematical thinking to form and adapt plans of attack; keeping confident, when stuck, in their own ability to make progress; 
          a memory of solutions to other problems that may be helpful. These courses will help dedicated students acquire these resources.
        `,
      image: 'https://furthermaths.wales/wp-content/uploads/2021/06/Artboard-1230_03-1.png',
    },
    {
      id: 3,
      title: 'Annual Mathematics Talk on Data Science',
      content: `
          This is an annual mathematics talk for sixth form students organised by the School of Mathematics and Statistics at the Open University 
          which this year will be held on Tuesday, 5th December 2023. This will be an online interactive session aimed at Year 12 and 13 students 
          who are studying mathematics. The theme of this year’s talk will be the exciting new world of data science and the talk will be delivered 
          by Dr Sophie Carr, a Data Scientist, Engineer, and “World’s Most Interesting Mathematician”. Sophie is the Vice President for education 
          and statistical literacy at the Royal Statistical Society and also the founder and director of Bays Consulting.  Her talk will be entitled:
        `,
      image: 'https://furthermaths.wales/wp-content/uploads/2023/10/ou-logo.jpg',
    },
  ];

  const renderPost = (post) => {
    return (
      <div
        key={post.id}
        style={{
          marginBottom: '20px',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '8px',
        }}
      >
        <h2>{post.title}</h2>
        <img src={post.image} alt="Post Image" style={{ maxWidth: '100%' }} />
        <p>{post.content}</p>
      </div>
    );
  };

  return (
    <div>
      {/* Navigation Bar */}




      <div >
        <h1 style={{ textAlign: 'center', color: '#d80303' }}>Further Maths Support Programme Wales</h1>
        <img src={fmspw} width="200" height="150" />

        <a href="/login" class="btn btn-primary"
          style={{ float: 'right', margin: '10px' }}
        >
          Login
        </a>
        <a href="/signup" class="btn btn-primary" style={{ float: 'right', margin: '10px' }}>
          Signup
        </a>
      </div>


      {/* Blog Posts */}
      <div style={{ paddingTop: '0px' }}>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          {staticBlogs.map(blog => (
            <div key={blog.id} style={{ flex: '1', margin: '10px' }}>
              {renderPost(blog)}
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default HomePage;
