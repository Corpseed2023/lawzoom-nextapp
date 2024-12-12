import React from "react";
import Department from "./Department";
import store from "@/app/redux-toolkit/store";
import { getAllDepartmentList } from "@/app/redux-toolkit/slices/settingSlice";

export async function getAllDepartment() {
  const response = await store.dispatch(getAllDepartmentList());
  const result = response.payload;
  return result;
}

const DepartmentPage = async ({ params }) => {
  const { userId, departmentId } = params;
  const data = await getAllDepartment();
  return (
    <>
      <Department data={data} userId={userId} departmentId={departmentId} />
    </>
  );
};

export default DepartmentPage;
