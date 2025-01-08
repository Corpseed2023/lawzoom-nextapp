import React from "react";
import store from "@/app/redux-toolkit/store";
import {
  getAllMileStones,
  getComplianceById,
} from "@/app/redux-toolkit/slices/complianceSlice";
import { SUBSCRIPTION_ID } from "@/app/constants";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import { userSubscriberId } from "@/app/commonConstants";
const Milestone = dynamic(() => import("./Milestone"), {
  loading: () => <Loading />,
});

const getMileStoneByComplianceId = async (
  businessUnitId,
  subscriberId,
  complianceId,
  userId
) => {
  let data = [];
  try {
    const response = await store.dispatch(
      getAllMileStones({ businessUnitId, subscriberId, complianceId, userId })
    );
    data = response.payload;
  } catch (err) {
    console.log("MILESTONE ERROR", err);
    data = [];
  }
  return data;
};

const getComplianceDataById = async (id) => {
  let data = [];
  try {
    const response = await store.dispatch(getComplianceById(id));
    data = response.payload;
  } catch (err) {
    console.log("JHGKJHVKJHJKH", err);
    data = [];
  }
  return data;
};

const MilestonePage = async ({ params }) => {
  const { businessUnitId, complianceId, userId } = await params;
  const subscriberId= await userSubscriberId()
  const data = await getMileStoneByComplianceId(
    businessUnitId,
    subscriberId,
    complianceId,
    userId
  );

  const complianceData = await getComplianceDataById(complianceId);

  console.log("Milestone data", complianceData);

  return (
    <>
      <Milestone
        data={data}
        businessUnitId={businessUnitId}
        complianceId={complianceId}
        userId={userId}
        complianceData={complianceData}
        subscriberId={subscriberId}
      />
    </>
  );
};

export default MilestonePage;
