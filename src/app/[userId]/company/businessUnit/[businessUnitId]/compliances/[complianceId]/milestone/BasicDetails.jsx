"use client";
import { SUBSCRIPTION_ID } from "@/app/constants";
import { createMileStone } from "@/app/redux-toolkit/slices/complianceSlice";
import { Icon } from "@iconify/react";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  notification,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const { Title, Text } = Typography;

const BasicDetails = ({
  setFormData,
  formData,
  businessUnitId,
  complianceId,
  setOpenModal,
  userId,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (resp) => {
    api[resp.status]({
      message: resp.message,
    });
  };

  const handleFinish = (value) => {
    dispatch(
      createMileStone({
        ...value,
        businessUnitId,
        complianceId,
        assignedBy: userId,
        subscriberId: subscriberId,
        userId,
      })
    )
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          openNotification({
            status: "success",
            message: "Milestone created successfully !.",
          });
          form.resetFields();
          setOpenModal(false);
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
    <Flex className="[max-height:80vh] overflow-auto w-full pr-2">
      {contextHolder}
      <Form
        layout="vertical"
        size="large"
        className="w-full"
        form={form}
        onFinish={handleFinish}
      >
        <Flex vertical gap={18}>
          <Flex align="center" gap={16}>
            <Icon
              icon="fluent:apps-list-24-regular"
              width="16"
              height="16"
              color="blue"
            />
            <Flex align="center" gap={8} className="w-full">
              <Form.Item name="mileStoneName" className="w-full mb-0">
                <Input size="large" placeholder="Enter milestone" />
              </Form.Item>
            </Flex>
          </Flex>
          <Flex vertical gap={12}>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
          </Flex>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Reporter" name="reporterId">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Assigned to" name="assignedTo">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Assignee email" name="assigneeMail">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Criticality" name="criticality">
                <Select
                  options={[
                    { label: "Low", value: "Low" },
                    { label: "Medium", value: "Medium" },
                    { label: "High", value: "High" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Issue date" name="issuedDate">
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Status" name="status">
                <Select
                  showSearch
                  options={[
                    { label: "Initiated", value: "Initiated" },
                    { label: "Hold", value: "Hold" },
                    { label: "Progress", value: "Progress" },
                    { label: "Rejected", value: "Rejected" },
                    { label: "Completed", value: "Completed" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Compliance reminder" name="reminderDate">
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Renewal reminder" name="renewalReminder">
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Remark" name="remark">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Flex gap={8} justify="flex-end">
            <Button>Next</Button>
            <Button>Cancel</Button>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
};

export default BasicDetails;
