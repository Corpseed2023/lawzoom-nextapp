import React from "react";
import store from "@/app/redux-toolkit/store";
import { getAllRoles } from "@/app/redux-toolkit/slices/commonSlice";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const Roles = dynamic(() => import("./Roles"), { loading: () => <Loading /> });

const fetchAllRoles = async () => {
  let data = [];
  try {
    const response = await store.dispatch(getAllRoles());
    data = response.payload;
  } catch (err) {
    console.log("Roles error", err);
  }
  return data;
};

const RolesPage = async () => {
  const data = await fetchAllRoles();
  console.log("All roles", data);
  return (
    <>
      <Roles data={data} />
    </>
  );
};

export default RolesPage;
