'use client'
import CommonTable from "@/app/common/CommonTable";
import { Button, Flex, Form, Input, Modal, Typography } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AddCompliances from "../../AddCompliances";
import { Icon } from "@iconify/react";
const { Text, Title } = Typography;

const ComplianceDetails = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const data=[
    {
        id:1,
        issuerAuthority:'ROC',
        certificateType:'Company Annual Commplaince',
        duration:'Life Time',
        status:'alreadyDone'
    },
    {
        id:2,
        issuerAuthority:'Labour Law',
        certificateType:'Contract Labour Compliance',
        duration:'Life Time',
        status:'alreadyDone'
    },
    {
        id:3,
        issuerAuthority:'FSSAI',
        certificateType:'FSSAI Certificate',
        duration:'1 - 5 Years',
        status:'applyNow'
    },
    {
        id:4,
        issuerAuthority:'GST',
        certificateType:'GST Filing',
        duration:'Life Time',
        status:'notApplicable'
    },
    {
        id:5,
        issuerAuthority:'Pollution Department',
        certificateType:'EPR Certificate',
        duration:'1 - 5 Years',
        status:'alreadyDone'
    },
  ]

  const columns=[{
    dataIndex:'id'
  }]

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
        scroll={{ y: "65vh" }}
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
