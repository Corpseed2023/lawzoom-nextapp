import React from "react";
import store from "@/app/redux-toolkit/store";
import { getComplianceByUnitId } from "@/app/redux-toolkit/slices/complianceSlice";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import { userSubscriberId } from "@/app/commonConstants";
const Compliances = dynamic(() => import("./Compliances"), {
  loading: () => <Loading />,
});

const fetchComplianceByCompanyUnitId = async (
  businessUnitId,
  userId,
  subscriberId
) => {
  let data = [];
  try {
    const response = await store.dispatch(
      getComplianceByUnitId({ businessUnitId, userId, subscriberId })
    );
    data = response.payload;
  } catch (err) {
    console.log("compliande unit erroir", err);
    data = [];
  }
  return data;
};

const CompliancesPage = async ({ params }) => {
  const { businessUnitId, userId } = await params;
  const subscriberId= await userSubscriberId()
  const data = await fetchComplianceByCompanyUnitId(
    businessUnitId,
    userId,
    subscriberId
  );

  return (
    <>
      <Compliances
        data={data}
        businessUnitId={businessUnitId}
        userId={userId}
        subscriberId={subscriberId}
      />
    </>
  );
};

export default CompliancesPage;
