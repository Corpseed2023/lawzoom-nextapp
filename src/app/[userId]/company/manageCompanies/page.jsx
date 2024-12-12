import React from "react";
import ManageCompanies from "./ManageCompanies";

const ManageCompaniesPage = ({ params }) => {
  const { userId } = params;
  return (
    <>
      <ManageCompanies userId={userId} />
    </>
  );
};

export default ManageCompaniesPage;
