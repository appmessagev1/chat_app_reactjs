import React from "react";
import { BsPlusCircle } from "react-icons/bs";

import ScheduleBoard from "components/ScheduleBoard";


const Schedule = () => {
  
  return (
    <div className="-mt-16 ml-auto xl:-ml-16 mr-auto xl:pl-16 pt-16 xl:h-screen w-auto sm:w-3/5 xl:w-auto">
      <div className="pt-6 px-6">
        <div className="text-xl font-medium flex items-center">
          Schedule <BsPlusCircle size={16} className="ml-2 cursor-pointer"/>
        </div>
      </div>
      <div className="mt-2 px-6 h-[calc(100vh-150px)]">
        <ScheduleBoard/>
      </div>
    </div>
  );
};

export default Schedule;
