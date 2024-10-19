'use client'
import { Button } from "antd"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleAddition } from "../redux-toolkit/slices/additionSlice"

const Addition = () => {
  const dispatch = useDispatch()
  const value = useSelector((state) => state.addition.sum)
  return (
    <>
      <div className="text-3xl font-bold underline">Addition:{value}</div>
      <Button onClick={() => dispatch(handleAddition(50))}>Add</Button>
    </>
  )
}

export default Addition
