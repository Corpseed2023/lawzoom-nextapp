'use client'
import CommonTable from "@/app/common/CommonTable";
import { Icon } from "@iconify/react";
import { Button, Flex, Input, Typography } from "antd";
import React, { useState } from "react";
const { Title, Text } = Typography;

const ComplianceTask = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  const columns = [
    { dataIndex: "id", title: "Id" },
    { dataIndex: "task", title: "Task" },
    { dataIndex: "description", title: "Description" },
    { dataIndex: "complianceFrequency", title: "Compliance frequency" },
    { dataIndex: "renewalDate", title: "Renewal date" },
    { dataIndex: "criticality", title: "Criticality" },
    { dataIndex: "document", title: "Document copy" },
    { dataIndex: "remark", title: "Remark" },
  ];

  return (
    <>
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Milestones</Title>
      </Flex>
      <Flex justify="space-between" align="center" className="mb-2">
        <Input
          className="w-1/4"
          placeholder="Search"
          prefix={
            <Icon icon="fluent:search-16-regular" width="16" height="16" />
          }
        />
        <Flex align="center" gap={8}>
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Add milestone
          </Button>
        </Flex>
      </Flex>
      <CommonTable
        data={data}
        columns={columns}
        rowKey={(row) => row?.id}
        scroll={{ y: "65vh", x: 1500 }}
      />
    </>
  );
};

export default ComplianceTask;
