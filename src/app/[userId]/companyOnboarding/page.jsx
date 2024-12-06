import React from "react";
import CompanyOnboarding from "./CompanyOnboarding";

const CompanyOnboardingPage = ({ params }) => {
  const { userId } = params;

  return (
    <>
      <CompanyOnboarding userId={userId} />
    </>
  );
};

export default CompanyOnboardingPage;
