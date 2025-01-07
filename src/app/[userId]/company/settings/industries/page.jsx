import React from "react";
import store from "@/app/redux-toolkit/store";
import { getAllIndustries } from "@/app/redux-toolkit/slices/settingSlice";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const Industries = dynamic(() => import("./Industries"), {
  loading: () => <Loading />,
});

const IndustriesPage = async ({ params }) => {
  const { userId } = await params;
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
