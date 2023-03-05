import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getGroups } from "redux/slices/groupSlice";
import { getUserIdFromLocalStorage } from "utils/auth";

const Group = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.groups.isLoading);
  const user = useSelector(state => state.user.data);

  useEffect(() => {
    const userId = user._id || getUserIdFromLocalStorage();
    const action = getGroups({ id: userId });
    dispatch(action);
  }, []);

  return (
    <div className="-mt-16 ml-auto xl:-ml-16 mr-auto xl:pl-16 pt-16 xl:h-screen w-auto sm:w-3/5 xl:w-auto grid grid-cols-12 gap-6">
      {isLoading ? (
        <div></div>
      ) : (
        <>
          <div className="col-span-12 xl:col-span-3 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 flex-col overflow-hidden"></div>
          <div className="chat-box col-span-12 xl:col-span-6 flex flex-col overflow-hidden xl:border-l xl:border-r p-6"></div>
          <div className="info-content col-span-12 xl:col-span-3 flex flex-col overflow-hidden pl-6 xl:pl-0 pr-6"></div>
        </>
      )}
    </div>
  );
};

export default Group;
