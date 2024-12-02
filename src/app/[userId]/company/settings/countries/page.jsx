import React from "react";
import Countries from "./Countries";
import store from "@/app/redux-toolkit/store";
import { getAllCountries } from "@/app/redux-toolkit/slices/commonSlice";

const CountriesPage = async({params}) => {
  const { userId } = params;

   const data = await store.dispatch(getAllCountries())
   console.log('dkcjnskldjvhsklj',data.payload)

  return (
    <>
      <Countries data={data?.payload} userId={userId}  />
    </>
  );
};

export default CountriesPage;
