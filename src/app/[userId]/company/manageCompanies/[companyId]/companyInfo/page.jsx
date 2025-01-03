import React from "react";
import store from "@/app/redux-toolkit/store";
import {
  fetchAllGstDetails,
  fetchSingleCompanyDetail,
} from "@/app/redux-toolkit/slices/companySlice";
import { SUBSCRIPTION_ID } from "@/app/constants";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";

const CompanyInfo = dynamic(() => import("./CompanyInfo"), {
  loading: () => <Loading />,
});

const getAllGst = async (companyId, userId, subscriptionId) => {
  let result = [];
  try {
    const response = await store.dispatch(
      fetchAllGstDetails({ companyId, userId, subscriptionId })
    );
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
  const data = await getAllGst(companyId, userId, SUBSCRIPTION_ID);
  const companyDetail = await getSingleCompanyDetail(
    companyId,
    userId,
    SUBSCRIPTION_ID
  );

  console.log("Somethngfgcuh", data);
  console.log("unit counts", companyDetail);

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
