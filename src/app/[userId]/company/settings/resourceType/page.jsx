import React from "react";
import ResourceType from "./ResourceType";
import store from "@/app/redux-toolkit/store";
import { getAllResourceType } from "@/app/redux-toolkit/slices/settingSlice";

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
