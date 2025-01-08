"use client";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Radio,
  Row,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import Link from "next/link";
import {
  createCompliance,
  getComplianceByUnitId,
} from "@/app/redux-toolkit/slices/complianceSlice";
import { SUBSCRIPTION_ID } from "@/app/constants";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const { Text, Title } = Typography;
const CommonTable = dynamic(() => import("@/app/common/CommonTable"), {
  loading: () => <Loading />,
});

const Compliances = ({ data, businessUnitId, userId,subscriberId }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (resp) => {
    api[resp.status]({
      message: resp.message,
    });
  };

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
        <Link href={`compliances/${data?.id}/milestone`}>{data?.name}</Link>
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

  const handleFinish = (values) => {
    dispatch(
      createCompliance({
        userId,
        businessUnitId,
        data: { subscriberId: subscriberId, ...values },
      })
    )
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          openNotification({
            status: "success",
            message: "Compliance created successfully !.",
          });
          setOpenModal(false);
          form.resetFields();
          router.refresh();
        } else {
          openNotification({
            status: "error",
            message: "Something went wrong !.",
          });
        }
      })
      .catch(() =>
        openNotification({
          status: "error",
          message: "Something went wrong !.",
        })
      );
  };

  return (
    <>
      {contextHolder}
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
        title={editData ? "Edit compliance" : "Add compliance"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        width={"60%"}
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Issuer authority"
                name="issueAuthority"
                rules={[
                  {
                    required: true,
                    message: "please enter issuer authority name ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Certificate type"
                name="certificateType"
                rules={[
                  { required: true, message: "Please enter certificate type" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Duration (in months)"
                name="duration"
                rules={[
                  {
                    required: true,
                    message: "please enter duration in numbers",
                  },
                ]}
              >
                <InputNumber className="w-full" controls={false} />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Compliance name"
                name="name"
                rules={[
                  { required: true, message: "please enter compliance name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Applicable zone"
                name="applicableZone"
                rules={[
                  { required: true, message: "please enter applicable zone" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Approval state"
                name="approvalState"
                rules={[
                  { required: true, message: "please enter approval state" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Start date"
                name="startDate"
                rules={[{ required: true, message: "please enter start date" }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Due date"
                name="dueDate"
                rules={[{ required: true, message: "please enter due date" }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={11}>
              <Form.Item
                label="Completed date"
                name="completedDate"
                rules={[
                  { required: true, message: "please enter completed date" },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "please enter description" },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default Compliances;
