import ChatBox from "components/ChatBox";
import GroupCard from "components/GroupCard";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentGroup } from "redux/slices/groupSlice";
import { getMessagesGroup } from "redux/slices/messageGroupSlice";
import Loading from "./Loading";

const Group = ({ socket }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.groups.isLoading);
  const groups = useSelector(state => state.groups.data);

  const onSelectGroup = group => {
    const action = setCurrentGroup(group);
    dispatch(action);

    const getMessageGroup = getMessagesGroup({ groupId: group._id, limit: 10, offset: 0 });
    dispatch(getMessageGroup)
  };

  return (
    <div className="-mt-16 ml-auto xl:-ml-16 mr-auto xl:pl-16 pt-16 xl:h-screen w-auto sm:w-3/5 xl:w-auto grid grid-cols-12 gap-6">
      <div className="col-span-12 xl:col-span-3 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 flex-col overflow-hidden">
        <div className="text-xl font-medium">Groups</div>
        <div className="overflow-y-auto scrollbar-hidden -mx-5 px-5 h-full py-5">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {groups.map(group => {
                return <GroupCard group={group.groupId} key={group._id} zoomIn click={onSelectGroup} showLastMsg/>;
              })}
            </>
          )}
        </div>
      </div>
      <div className="chat-box col-span-12 xl:col-span-6 flex flex-col overflow-hidden xl:border-l xl:border-r p-6">
        <ChatBox socket={socket} />
      </div>
      <div className="info-content col-span-12 xl:col-span-3 flex flex-col overflow-hidden pl-6 xl:pl-0 pr-6"></div>
    </div>
  );
};

export default Group;
