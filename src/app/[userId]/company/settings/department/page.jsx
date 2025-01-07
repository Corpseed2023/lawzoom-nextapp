import React from "react";
import store from "@/app/redux-toolkit/store";
import { getAllDepartmentList } from "@/app/redux-toolkit/slices/settingSlice";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const Department = dynamic(() => import("./Department"), {
  loading: () => <Loading />,
});

export async function getAllDepartment() {
  const response = await store.dispatch(getAllDepartmentList());
  const result = response.payload;
  return result;
}

const DepartmentPage = async ({ params }) => {
  const { userId, departmentId } = await params;
  const data = await getAllDepartment();

  console.log('asd;kjhvlsdkah',data)
  return (
    <>
      <Department data={data} userId={userId} departmentId={departmentId} />
    </>
  );
};

export default DepartmentPage;
