import { Table } from "antd";
import React from "react";

const CommonTable = ({ data, columns }) => {
  return <Table dataSource={data} columns={columns} />;
};

export default CommonTable;
