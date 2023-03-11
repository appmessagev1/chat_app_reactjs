import React, { useState } from 'react'

import Modal from 'components/common/Modal';
import ScheduleBoard from 'components/ScheduleBoard';
import moment from 'moment';

const Schedule = () => {

  const [isShowModal, setIsShowModal] = useState(false)

  const handleShowModal = () => {
    setIsShowModal(true)
  }

  const handleCloseModal = () => {
    setIsShowModal(false)
  }

  const onClickSlot = (slotInfo) => {
    handleShowModal();
  }

  return (
    <div className="-mt-16 ml-auto xl:-ml-16 mr-auto xl:pl-16 pt-16 xl:h-screen w-auto sm:w-3/5 xl:w-auto">
      <div className="pt-6 px-6">
        <div className="text-xl font-medium">Schedule</div>
      </div>
      <div className="mt-2 px-6 h-[calc(100vh-150px)]">
        <ScheduleBoard onClickSlot={onClickSlot} />
      </div>
      <Modal isOpen={isShowModal} handleOnClose={handleCloseModal} titleModal="Add event">
        <div>
          <form>
            
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Schedule


