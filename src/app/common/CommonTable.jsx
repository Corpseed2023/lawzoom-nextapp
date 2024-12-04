import { Table } from "antd";
import React from "react";

const CommonTable = ({ data, columns, scroll,rowKey }) => {
  return <Table dataSource={data} columns={columns} scroll={scroll} pagination={false} rowKey={rowKey} />;
};

export default CommonTable;
