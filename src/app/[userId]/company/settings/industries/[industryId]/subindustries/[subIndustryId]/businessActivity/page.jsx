import React from "react";
import BusinessActivity from "./BusinessActivity";
import { getBusinessActivityBySubIndustryId } from "@/app/redux-toolkit/slices/settingSlice";
import store from "@/app/redux-toolkit/store";

const BusinessActivityPage = async ({ params }) => {
  const { userId, industryId, subIndustryId } = params;
  let data = [];
  try {
    const response = await store.dispatch(getBusinessActivityBySubIndustryId(subIndustryId));
    data = response?.payload;
    console.log("Business activity data", response.payload);
  } catch (err) {
    console.log("Business activity error", err);
  }
  return (
    <>
      <BusinessActivity
        data={data}
        userId={userId}
        industryId={industryId}
        subIndustryId={subIndustryId}
      />
    </>
  );
};

export default BusinessActivityPage;
