import React from "react";
import Milestone from "./Milestone";
import store from "@/app/redux-toolkit/store";
import { getAllMileStones } from "@/app/redux-toolkit/slices/complianceSlice";
import { SUBSCRIPTION_ID } from "@/app/constants";

const getMileStoneByComplianceId = async (
  businessUnitId,
  subscriberId,
  complianceId
) => {
  let data = [];
  try {
    const response = await store.dispatch(
      getAllMileStones({ businessUnitId, subscriberId, complianceId })
    );
    data = response.payload;
  } catch (err) {
    console.log("MILESTONE ERROR", err);
    data = [];
  }

  return data;
};

const MilestonePage = async ({ params }) => {
  const { businessUnitId, complianceId } = await params;

  const data = await getMileStoneByComplianceId(
    businessUnitId,
    SUBSCRIPTION_ID,
    complianceId
  );


  console.log('Milestone data',data)

  return (
    <>
      <Milestone
        data={data}
        businessUnitId={businessUnitId}
        complianceId={complianceId}
      />
    </>
  );
};

export default MilestonePage;
