import React from "react";
import CompanyType from "./CompanyType";
import store from "@/app/redux-toolkit/store";
import { getAllCompanyType } from "@/app/redux-toolkit/slices/settingSlice";

export async function fetchComapnyTypeData() {
  let data = [];
  try {
    const response = await store.dispatch(getAllCompanyType());
    data = response.payload;
    return data;
  } catch (err) {
    console.log("Company type err",err);
    return data;
  }
}

const CompanyTypePage = async ({ params }) => {
  const { userId } = params;
  const data = await fetchComapnyTypeData();
  return (
    <>
      <CompanyType data={data} userId={userId} />
    </>
  );
};

export default CompanyTypePage;
