import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";

import groupApi from "api/groupApi";
import UserCard from "./UserCard";
import Loading from "pages/Loading";
import Modal from "./common/Modal";
import UserCombobox from "./UserCombobox";
import { getUserIdFromLocalStorage } from "utils/auth";
import { getGroups, setCurrentGroup } from "redux/slices/groupSlice";

const GroupInfo = ({ socket }) => {
  const dispatch = useDispatch()
  const [usersInGroup, setUsersInGroup] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const currentGroup = useSelector(state => state.groups.currentGroup);
  const currentUser = useSelector(state => state.user.data);

  useEffect(() => {
    getUsersInGroup();
  }, [currentGroup._id]);

  socket.on("user-removed", data => {
    getUsersInGroup({ id: currentGroup._id });
  });

  const getUsersInGroup = async () => {
    try {
      setIsLoading(true);
      const response = await groupApi.getUsersInGroup({ id: currentGroup._id });
      if (response.error_code === 0) {
        setUsersInGroup(response.data);
      }
    } catch (error) {
      toast.error("Cannot get users in group");
    } finally {
      setIsLoading(false);
    }
  };

  const onClickDelete = async (e, user) => {
    setIsLoading(true);
    try {
      e.stopPropagation();
      const response = await groupApi.removeUserInGroup({ id: user._id });
      if (response.error_code === 0) {
        toast.success("Remove user successfully");
        getUsersInGroup();
        if (user.userData[0]._id === currentUser._id) {
          const action = getGroups({ id: currentUser._id || getUserIdFromLocalStorage() })
          dispatch(action)
          const currentGroup = setCurrentGroup({})
          dispatch(currentGroup)
        }
        socket.emit("remove", { userId: user.userData[0]._id, groupId: currentGroup._id });
      }
    } catch (err) {
      toast.error("Cannot delete user");
    } finally {
      setIsLoading(false);
    }
  };

  const onClickAddUser = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const onSelectUser = user => {
    setSelectedUser(user);
  };

  const onSubmit = async e => {
    try {
      e.preventDefault();
      const data = {
        groupId: currentGroup._id,
        userIds: [selectedUser._id],
      };
      const response = await groupApi.addUserToGroup(data);
      if (response.error_code === 0) {
        toast.success("Add member successfully");
        getUsersInGroup();
        const socketData = {
          groupId: currentGroup._id,
          userId: selectedUser._id,
        };
        socket.emit("invite", socketData);
      }
    } catch (err) {
      toast.error("Cannot add member");
    }
    handleCloseModal();
  };

  return (
    <>
      <div className="overflow-y-auto scrollbar-hidden py-6 h-full pt-10">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="text-base font-medium flex items-center justify-between">
              <span>Members</span>
              <AiOutlineUserAdd size={24} onClick={onClickAddUser} className="ml-2"/>
            </div>
            {usersInGroup.map(user => {
              return (
                <UserCard key={user._id} user={user?.userData?.[0]}>
                  <div className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-200" onClick={e => onClickDelete(e, user)}>
                    <AiOutlineDelete size={24} color="red" className="cursor-pointer" />
                  </div>
                </UserCard>
              );
            })}
          </div>
        )}
      </div>
      <Modal isOpen={isOpenModal} handleOnClose={handleCloseModal} titleModal="Add member">
        <div>
          <form onSubmit={onSubmit}>
            <UserCombobox onSelectUser={onSelectUser} inputClassName="border-user-search" notMe />
            <div className="mt-2 flex justify-end items-center w-80 ml-auto">
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
    </>
  );
};

export default GroupInfo;
