"use client";
import CommonTable from "@/app/common/CommonTable";
import { Icon } from "@iconify/react";
import { Button, Flex, Form, Input, Modal, Typography } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AddMilestone from "./AddMilestone";
const { Title, Text } = Typography;

const Milestone = ({ data }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const columns = [
    { dataIndex: "id", title: "Id" },
    { dataIndex: "issuerAuthority", title: "IssuerAuthority" },
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
      <Modal
        title="Add milestone"
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
        width={"80%"}
        footer={null}
      >
        <AddMilestone />
      </Modal>
    </>
  );
};

export default Milestone;
