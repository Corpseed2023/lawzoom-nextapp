import React from "react";
import store from "@/app/redux-toolkit/store";
import {
  fetchAllGstDetails,
  fetchSingleCompanyDetail,
} from "@/app/redux-toolkit/slices/companySlice";
import { SUBSCRIPTION_ID } from "@/app/constants";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import { userSubscriberId } from "@/app/commonConstants";

const CompanyInfo = dynamic(() => import("./CompanyInfo"), {
  loading: () => <Loading />,
});

const getAllGst = async (companyId, userId, subscriberId ) => {
  let result = [];
  try {
    const response = await store.dispatch(
      fetchAllGstDetails({ companyId, userId, subscriberId  })
    );
    result = response.payload;
    console.log('askjbsljkcblaskdj',response.payload)
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
  const { companyId, userId } = await params;
  const subscriberId= await userSubscriberId()
  const data = await getAllGst(companyId, userId,subscriberId);
  const companyDetail = await getSingleCompanyDetail(
    companyId,
    userId,
    subscriberId
  );

  console.log(data)


  return (
    <>
      <CompanyInfo
        companyId={companyId}
        data={data}
        userId={userId}
        companyDetail={companyDetail}
        subscriberId={subscriberId}
      />
    </>
  );
};

export default CompanyInfoPage;
