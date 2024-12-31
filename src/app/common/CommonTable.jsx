import { Table } from "antd";
import React from "react";

const CommonTable = ({ data, columns, scroll, rowKey, handleRowSelection }) => {
  return (
    <Table
      dataSource={data}
      columns={columns}
      scroll={scroll}
      pagination={false}
      rowKey={rowKey}
      rowSelection={{ type: "checkbox", onChange: handleRowSelection }}
    />
  );
};

export default CommonTable;
