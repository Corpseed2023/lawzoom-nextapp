import React from "react";
import Roles from "./Roles";
import store from "@/app/redux-toolkit/store";
import { getAllRoles } from "@/app/redux-toolkit/slices/commonSlice";

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
