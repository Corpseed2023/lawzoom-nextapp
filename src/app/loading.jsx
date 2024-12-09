import { Skeleton } from 'antd'
import React from 'react'

const Loading = () => {
  return (
    <Skeleton active paragraph={{rows:10}} />
  )
}

export default Loading
