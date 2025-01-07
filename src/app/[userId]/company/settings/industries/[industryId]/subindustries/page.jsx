import React from "react";
import store from "@/app/redux-toolkit/store";
import { getSubIndustryById } from "@/app/redux-toolkit/slices/settingSlice";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const SubIndustries = dynamic(() => import("./SubIndustries"), {
  loading: () => <Loading />,
});

const SubIndustriesPage = async ({ params }) => {
  const { userId, industryId } = await params;
  let data = [];
  try {
    const response = await store.dispatch(getSubIndustryById(industryId));
    data = response?.payload;
    console.log("Sub Industry data", response);
  } catch (err) {
    console.log(" Sub Industry error", err);
  }

  console.log("SubIndusty Data", data);
  return (
    <>
      <SubIndustries data={data} userId={userId} industryId={industryId} />
    </>
  );
};

export default SubIndustriesPage;
