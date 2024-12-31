import React from "react";
import ComplianceDetails from "./ComplianceDetails";

const ComplianceDetailsPage = ({params}) => {
    const {complianceId}=params
  return (
    <>
      <ComplianceDetails />
    </>
  );
};

export default ComplianceDetailsPage;
