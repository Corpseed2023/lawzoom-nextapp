'use client'
import { Button, Flex } from "antd"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleAddition } from "../redux-toolkit/slices/additionSlice"

const Addition = () => {
  const dispatch = useDispatch()
  const value = useSelector((state) => state.addition.sum)
  return (
    <Flex vertical justify='center' align='center' gap={12}  > 
      <div className="text-5xl font-bold underline">Addition:{value}</div>
      <Button size="small" type='primary' onClick={() => dispatch(handleAddition(50))}>Add</Button>
    </Flex>
  )
}

export default Addition
