import React from 'react'
import { AiOutlineLoading } from "react-icons/ai";

const LoadingIcon = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <AiOutlineLoading color='text-primary' className='spinning'/>
    </div>
  )
}

export default LoadingIcon