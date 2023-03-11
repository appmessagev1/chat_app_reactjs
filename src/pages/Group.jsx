import React, { useEffect, useState } from "react";
import ChatBox from "components/ChatBox";
import GroupCard from "components/GroupCard";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { BsPlusCircle } from "react-icons/bs";
import { toast } from "react-toastify";

import { setCurrentGroup, getGroups } from "redux/slices/groupSlice";
import { getMessagesGroup } from "redux/slices/messageGroupSlice";
import Loading from "./Loading";
import Empty from "assert/images/Empty.png";
import Modal from "components/common/Modal";
import TextInput from "components/common/TextInput";
import groupApi from "api/groupApi";
import GroupInfo from "components/GroupInfo";
import { getUserIdFromLocalStorage } from "utils/auth";

const Group = ({ socket }) => {
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const isLoading = useSelector(state => state.groups.isLoading);
  const groups = useSelector(state => state.groups.data);
  const currentGroup = useSelector(state => state.groups.currentGroup);
  const [groupName, setGroupName] = useState("");
  const user = useSelector(state => state.user.data);

  useEffect(() => {
    socket.on("invited", () => {
      toast.info("You have been added to the group");
      if (user._id || getUserIdFromLocalStorage()) {
        const action = getGroups({ id: user._id || getUserIdFromLocalStorage()  });
        dispatch(action);
      }
    });

    socket.on("removed", (data) => {
      toast.info("You have been removed from the group");
      if (user._id || getUserIdFromLocalStorage()) {
        const action = getGroups({ id: user._id || getUserIdFromLocalStorage() });
        dispatch(action);
        if (data.groupId == currentGroup._id && data.userId == user._id) {
          const currentGroup = setCurrentGroup({});
          dispatch(currentGroup);
        }
      }
    })
  }, []);

  const onSelectGroup = group => {
    const action = setCurrentGroup(group);
    dispatch(action);

    const getMessageGroup = getMessagesGroup({ groupId: group._id, limit: 10, offset: 0 });
    dispatch(getMessageGroup);
  };

  const handleOpenModal = () => {
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const onSubmit = async e => {
    try {
      e.preventDefault();
      const data = {
        name: groupName,
        ownerId: user._id,
      };
      const response = await groupApi.postGroup(data);
      if (response.error_code === 0) {
        const action = getGroups({ id: user._id });
        dispatch(action);
      }
    } catch (error) {
      toast.error("Cannot create group");
    }
    handleCloseModal();
  };

  const handleInputChange = input => {
    setGroupName(input);
  };

  return (
    <div className="-mt-16 ml-auto xl:-ml-16 mr-auto xl:pl-16 pt-16 xl:h-screen w-auto sm:w-3/5 xl:w-auto grid grid-cols-12 gap-6">
      <div className="col-span-12 xl:col-span-3 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 flex-col overflow-hidden">
        <div className="text-xl font-medium flex items-center">
          <span>Groups</span>
          <BsPlusCircle size={16} className="ml-2 cursor-pointer" onClick={handleOpenModal} />
        </div>

        <div className="overflow-y-auto scrollbar-hidden -mx-5 px-5 h-full py-5">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {groups.length && groups.map(group => {
                return <GroupCard group={group.groupId} key={group._id} zoomIn click={onSelectGroup} showLastMsg />;
              })}
            </>
          )}
        </div>
      </div>
      {!isEmpty(currentGroup) ? (
        <>
          <div className="chat-box col-span-12 xl:col-span-6 flex flex-col overflow-hidden xl:border-l xl:border-r p-6">
            <ChatBox socket={socket} />
          </div>
          <div className="info-content col-span-12 xl:col-span-3 flex flex-col overflow-hidden pl-6 xl:pl-0 pr-6">
            <GroupInfo socket={socket} />
          </div>
        </>
      ) : (
        <>
          <div className="col-span-12 xl:col-span-9 flex justify-center items-center xl:border-l xl:border-r">
            <img src={Empty} />
          </div>
        </>
      )}
      <Modal isOpen={isShowModal} titleModal="Create groups" handleOnClose={handleCloseModal}>
        <div>
          <form onSubmit={onSubmit}>
            <TextInput size="small" placeholder="Group Name" inputClassName="border-user-search" value={groupName} inputChange={handleInputChange} />
            <div className="mt-4 flex justify-end items-center w-80 ml-auto">
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary ml-2">
                Add
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Group;
