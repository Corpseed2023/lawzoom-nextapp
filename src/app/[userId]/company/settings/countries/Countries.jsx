"use client";
import CommonTable from "@/app/common/CommonTable";
import Link from "next/link";
import React from "react";

const Countries = ({ data,userId }) => {
  const columns = [
    { dataIndex: "id", title: "Id" },
    {
      dataIndex: "countryName",
      title: "Country name",
      render: (_, data) => (
        <Link href={`/${userId}/company/settings/countries/${data.id}/states`}>{data?.countryName}</Link>
      ),
    },
    { dataIndex: "countryCode", title: "Country code" },
  ];

  return (
    <>
      <CommonTable data={data} columns={columns} />
    </>
  );
};

export default Countries;
