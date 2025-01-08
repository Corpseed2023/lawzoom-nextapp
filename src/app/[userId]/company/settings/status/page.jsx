import Loading from "@/app/loading";
import { getAllStatus } from "@/app/redux-toolkit/slices/commonSlice";
import store from "@/app/redux-toolkit/store";
import dynamic from "next/dynamic";
import React from "react";
const Status = dynamic(() => import("./Status"), {
  loading: () => <Loading />,
});

const fetchAllStatus = async () => {
  let data = [];
  try {
    const response = await store.dispatch(getAllStatus());
    data = response.payload;
  } catch (err) {
    console.log("STATUS ERROR", err);
  }
  return data;
};

const StatusPage = async () => {
  const data = await fetchAllStatus();
  return (
    <>
      <Status data={data} />
    </>
  );
};

export default StatusPage;
