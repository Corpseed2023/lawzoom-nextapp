"use client";
import CommonTable from "@/app/common/CommonTable";
import { Button, Flex, Form, Input, Modal, Radio, Typography } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AddCompliances from "../../AddCompliances";
import { Icon } from "@iconify/react";
import Link from "next/link";
const { Text, Title } = Typography;

const ComplianceDetails = ({ data }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 80,
      fixed: "left",
    },
    {
      dataIndex: "name",
      title: "Compliance name",
      width: 300,
      fixed: "left",
      render: (_, data) => (
        <Link href={`complianceDetails/${data?.id}/complianceTask`}>
          {data?.name}
        </Link>
      ),
    },
    {
      dataIndex: "issueAuthority",
      title: "Issuer authority",
      width: 200,
    },
    {
      dataIndex: "certificateType",
      title: "Certificate type",
      width: 250,
    },
    {
      dataIndex: "duration",
      title: "Duration",
      width: 150,
    },
    {
      dataIndex: "status",
      title: "Status",
      render: (_, data) => (
        <Flex>
          <Radio.Group>
            <Radio value={"apply_now"}>Apply now</Radio>
            <Radio value={"alredy_done"}>Already done</Radio>
            <Radio value={"not_applicable"}>Not applicable</Radio>
          </Radio.Group>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Compliances list</Title>
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
            Add compliances
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
        title="Add compliance"
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
        width={"80%"}
        // height={"70vh"}
        footer={null}
      >
        <AddCompliances />
      </Modal>
    </>
  );
};

export default ComplianceDetails;
