import React from "react";
import Cities from "./Cities";
import store from "@/app/redux-toolkit/store";
import { getCitiesByStateId } from "@/app/redux-toolkit/slices/commonSlice";

const CitiesPage = async ({ params }) => {
  const { userId, countryId, stateId } = params;
  let data = [];
  try {
    const response = await store.dispatch(getCitiesByStateId(stateId));
    data = response?.payload;
    console.log("dkcjnskldjvhsklj", response.payload);
  } catch (err) {
    console.log("Errrrorrrrr", err);
  }
  return (
    <>
      <Cities
        userId={userId}
        countryId={countryId}
        stateId={stateId}
        data={data}
      />
    </>
  );
};

export default CitiesPage;
