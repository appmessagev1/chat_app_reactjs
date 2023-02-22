import React from 'react'
import NotFoundImg from 'assert/images/not_found.jpg'

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img src={NotFoundImg} className="w-full h-full object-cover"/>
    </div>
  );
}

export default NotFound