import React from "react";
import States from "./States";

const StatesPage = ({ params }) => {
  const { userId, countryId } = params;

  return (
    <>
      <States userId={userId} data={[]} countryId={countryId} />
    </>
  );
};

export default StatesPage;
