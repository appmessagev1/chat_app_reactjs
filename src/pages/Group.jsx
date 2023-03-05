import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Group = () => {

  const dispatch = useDispatch()
  const isLoading = useSelector(state => state)

  return (
    <div>Group</div>
  )
}

export default Group