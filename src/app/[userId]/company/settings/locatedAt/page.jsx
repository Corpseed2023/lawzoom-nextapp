import React from "react";
import LocatedAt from "./LocatedAt";
import store from "@/app/redux-toolkit/store";
import { getAllLocatedAt } from "@/app/redux-toolkit/slices/settingSlice";

export async function getAllLocatedAtData(params) {
  let data = [];
  try {
    const response = await store.dispatch(getAllLocatedAt());
    data = response.payload;
    return data;
  } catch (err) {
    console.log("Locations error", err);
    return data;
  }
}

const LocatedAtPage = async({ params }) => {
  const { userId } = params;
  const data = await getAllLocatedAtData();
  console.log('Locations data',data)
  return (
    <>
      <LocatedAt userId={userId} data={data} />
    </>
  );
};

export default LocatedAtPage;
