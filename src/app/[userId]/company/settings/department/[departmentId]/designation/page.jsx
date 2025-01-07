import React from "react";
import store from "@/app/redux-toolkit/store";
import { getAllDesiginations } from "@/app/redux-toolkit/slices/settingSlice";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const Designation = dynamic(() => import("./Designation"), {
  loading: ()=><Loading />,
});

export const fetchDesiginations = async (id) => {
  let data = [];
  try {
    const response = await store.dispatch(getAllDesiginations(id));
    data = response?.payload;
    return data;
  } catch (err) {
    console.error("Error fetching desiginations:", err);
    return [];
  }
};

const DesignationPage = async ({ params }) => {
  const { departmentId, userId } = await params;
  const data = await fetchDesiginations(departmentId);
  console.log("Desigination =======================>", data);

  return (
    <>
      <Designation data={data} userId={userId} departmentId={departmentId} />
    </>
  );
};

export default DesignationPage;
