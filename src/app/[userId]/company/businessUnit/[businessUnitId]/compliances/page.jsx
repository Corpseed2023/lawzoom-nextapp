import React from "react";
import store from "@/app/redux-toolkit/store";
import { getComplianceByUnitId } from "@/app/redux-toolkit/slices/complianceSlice";
import Compliances from "./Compliances";


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

const CompliancesPage = async({ params }) => {
  const { businessUnitId,userId } = params;
  const data=await fetchComplianceByCompanyUnitId(businessUnitId)

  console.log('jsdghckjsdvckjsv =====================>',data,businessUnitId)
  
  return (
    <>
      <Compliances data={data} />
    </>
  );
};

export default CompliancesPage;
