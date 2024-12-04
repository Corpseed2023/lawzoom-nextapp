import React from "react";
import Countries from "./Countries";
import store from "@/app/redux-toolkit/store";
import { getAllCountries } from "@/app/redux-toolkit/slices/commonSlice";

const CountriesPage = async ({ params }) => {
  const { userId } = params;
  let data = [];
  try {
    const response = await store.dispatch(getAllCountries());
    data = response.payload;
    console.log("jhsbajkcbkjbsjbd", data);
  } catch (err) {
    console.log("Error in countries", err);
  }

  return (
    <>
      <Countries data={data} userId={userId} />
    </>
  );
};

export default CountriesPage;
