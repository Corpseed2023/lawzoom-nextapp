import React from "react";
import store from "@/app/redux-toolkit/store";
import { getAllResourceType } from "@/app/redux-toolkit/slices/settingSlice";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const ResourceType = dynamic(() => import("./ResourceType"), {
  loading: () => <Loading />,
});

const fetchResourceType = async () => {
  let data = [];
  try {
    const response = await store.dispatch(getAllResourceType());
    data = response.payload;
  } catch (err) {
    console.log(err);
  }
  return data;
};

const ResourceTypePage = async () => {
  const data = await fetchResourceType();
  console.log("Resource type data", data);
  return (
    <>
      <ResourceType data={data} />
    </>
  );
};

export default ResourceTypePage;
