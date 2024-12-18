import React from "react";
import CompanyInfo from "./CompanyInfo";
import store from "@/app/redux-toolkit/store";
import {
  fetchAllGstDetails,
  fetchSingleCompanyDetail,
} from "@/app/redux-toolkit/slices/companySlice";

const getAllGst = async (companyId) => {
  let result = [];
  try {
    const response = await store.dispatch(fetchAllGstDetails(companyId));
    result = response.payload;
  } catch (err) {
    console.log("All GST fetch error", err);
  }
  return result;
};

const getSingleCompanyDetail = async (companyId, userId, subscriptionId) => {
  let details = {};
  try {
    const response = await store.dispatch(
      fetchSingleCompanyDetail({ companyId, userId, subscriptionId })
    );
    details = response.payload;
  } catch (err) {
    console.log("All GST fetch error", err);
  }
  return details;
};

const CompanyInfoPage = async ({ params }) => {
  const { companyId, userId } = params;
  const data = await getAllGst(companyId);
  const companyDetail = await getSingleCompanyDetail(companyId, userId, 1);

  console.log("Somethngfgcuh", data);

  return (
    <>
      <CompanyInfo
        companyId={companyId}
        data={data}
        userId={userId}
        companyDetail={companyDetail}
      />
    </>
  );
};

export default CompanyInfoPage;
