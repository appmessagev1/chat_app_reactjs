import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import userApi from "api/userApi";
import Avatar from "./common/Avatar";
import TextInput from "./common/TextInput";

export const ComboboxCard = ({ user, onClickCard }) => {
  const onClick = e => {
    e.stopPropagation();
    onClickCard(user);
  };

  return (
    <div
      onMouseDown={onClick}
      className=" rounded py-3 px-2 flex justify-between items-center bg-white hover:bg-primary hover:text-white cursor-pointer">
      <Avatar size="mini" user={user} />
      <div className="flex-1 ml-2">
        <p>{user.name}</p>
      </div>
    </div>
  );
};

const UserCombobox = ({ onSelectUser, inputClassName, notMe }) => {
  const [selectedUser, setSelectedUser] = useState({});
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const currentUser = useSelector(state => state.user.data);

  useEffect(() => {
    getUsers(input);
  }, [input]);

  const getUsers = async input => {
    try {
      const response = await userApi.getUsersByNameOrEmail({ searchInput: input });
      if (response.error_code === 0) {
        const _users = notMe ? response.data.filter(user => user._id !== currentUser._id) : response.data;
        setUsers(_users);
      } else {
        toast.error("Cannot find users");
      }
    } catch (error) {
      toast.error("Cannot find users");
    }
  };

  const onSelect = selectedUser => {
    setSelectedUser(selectedUser);
    setInput(selectedUser.name);
    setIsFocus(false);
    onSelectUser(selectedUser);
  };

  const onInputChange = input => {
    setInput(input);
  };

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    setIsFocus(false);
  };

  return (
    <div className="relative">
      <TextInput
        value={input}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Search users..."
        appendIcon="search"
        inputChange={onInputChange}
        inputClassName={inputClassName}
      />
      <div
        className={`box absolute p-2 left-0 w-full top-14 h-50 overflow-y-auto scrollbar-hidden overflow-x-hidden z-10 bg-white ${
          !isFocus && "hidden"
        }`}>
        {users.length && input ? (
          users.map(user => {
            return <ComboboxCard key={user._id} user={user} onClickCard={onSelect} />;
          })
        ) : (
          <div className="text-center">Nodata</div>
        )}
      </div>
    </div>
  );
};

export default UserCombobox;
