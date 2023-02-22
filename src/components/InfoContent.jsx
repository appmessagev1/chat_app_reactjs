import React from 'react'
import { useSelector } from "react-redux";
import { RiGlobalLine } from 'react-icons/ri'
import { AiOutlinePhone } from 'react-icons/ai'
import { CiMail } from 'react-icons/ci'

import Avatar from 'components/common/Avatar';

const InfoContent = () => {

  const currentReceiver = useSelector(state => state.currentReceiver.data);

  return (
    <div className="overflow-y-auto scrollbar-hidden py-6">
      <div className="box px-4 py-6">
        <div className="flex items-center justify-center">
          <Avatar user={currentReceiver} size="big" statusPosition="top" />
        </div>
        <div className="flex flex-col text-center">
          <div className="text-base mt-3 font-medium">{currentReceiver?.name}</div>
          <div className="text-gray-600 text-xs uppercase mt-0.5">{currentReceiver?.title}</div>
        </div>

        <div className="text-base font-medium mt-8">Personal Information</div>
        <div className="mt-4">
          <div className="border-gray-200 flex justify-between items-center border-b pb-3">
            <div>
              <div className="text-gray-500">Country</div>
              <div className="mt-0.5">{currentReceiver?.address || "Hai duong, Viet Nam"}</div>
            </div>
            <div>
              <RiGlobalLine size={20} color="#96A0B1" />
            </div>
          </div>
          <div className="border-gray-200 flex justify-between items-center border-b py-3">
            <div>
              <div className="text-gray-500">Phone</div>
              <div className="mt-0.5">{currentReceiver?.phoneNumber || "0123456789"}</div>
            </div>
            <div>
              <AiOutlinePhone size={20} color="#96A0B1" />
            </div>
          </div>
          <div className="border-gray-200 flex justify-between items-center py-3">
            <div>
              <div className="text-gray-500">Email</div>
              <div className="mt-0.5">{currentReceiver?.email || "example@gmail.com"}</div>
            </div>
            <div>
              <CiMail size={20} color="#96A0B1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoContent