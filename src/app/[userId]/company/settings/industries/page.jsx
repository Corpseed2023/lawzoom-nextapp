import React from "react";
import Industries from "./Industries";
import store from "@/app/redux-toolkit/store";
import { getAllIndustries } from "@/app/redux-toolkit/slices/settingSlice";

const IndustriesPage = async ({params}) => {
  const { userId } = params;
  let data = [];
  try {
    const response = await store.dispatch(getAllIndustries());
    data = response?.payload;
    console.log("Industry data", response.payload);
  } catch (err) {
    console.log("Industry error", err);
  }
  return (
    <>
      <Industries data={data} userId={userId} />
    </>
  );
};

export default IndustriesPage;
