import CommonTable from "@/app/common/CommonTable";
import Link from "next/link";
import React from "react";

const States = ({ data, countryId, userId }) => {
  const columns = [
    { dataIndex: "id", title: "Id" },
    {
      dataIndex: "stateName",
      title: "State name",
      render: (_, data) => (
        <Link
          href={`/${userId}/company/settings/countries/${countryId}/states${data.id}/cities`}
          
        >
          {data?.stateName}
        </Link>
      ),
    },
  ];
  return (
    <>
      <CommonTable data={data} columns={columns} />
    </>
  );
};

export default States;
