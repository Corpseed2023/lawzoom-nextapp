import React from "react";
import ComplianceDetails from "./ComplianceDetails";
import store from "@/app/redux-toolkit/store";
import { getComplianceByUnitId } from "@/app/redux-toolkit/slices/complianceSlice";

const fetchComplianceByCompanyUnitId = async (unitId) => {
  let data = [];
  try {
    const response = await store.dispatch(getComplianceByUnitId(unitId));
    data = response.payload;
  } catch (err) {
    console.log("compliande unit erroir", err);
    data = [];
  }
  return data;
};

const ComplianceDetailsPage = async({ params }) => {
  const { complianceId } = params;
  const data=await fetchComplianceByCompanyUnitId(complianceId)

  console.log('jsdghckjsdvckjsv =====================>',data,complianceId)
  
  return (
    <>
      <ComplianceDetails data={data} />
    </>
  );
};

export default ComplianceDetailsPage;
