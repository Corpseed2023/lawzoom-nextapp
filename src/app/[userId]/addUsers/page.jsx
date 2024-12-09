import React from "react";
import AddUsers from "./AddUsers";
import { getProductData } from "@/app/actions";

const AddUsersPage = async() => {
    const data= await getProductData()
    console.log(data)
  return (
    <div>
      <AddUsers />
    </div>
  );
};

export default AddUsersPage;
