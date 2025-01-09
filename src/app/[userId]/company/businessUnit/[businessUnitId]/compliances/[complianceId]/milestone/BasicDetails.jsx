"use client";
import { selectFilter } from "@/app/commons";
import { SUBSCRIPTION_ID } from "@/app/constants";
import { getAllStatus } from "@/app/redux-toolkit/slices/commonSlice";
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const { Title, Text } = Typography;

const BasicDetails = ({
  businessUnitId,
  complianceId,
  setOpenModal,
  userId,
  subscriberId,
  userList
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const statusList = useSelector((state) => state.common.statusList);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (resp) => {
    api[resp.status]({
      message: resp.message,
    });
  };

  useEffect(() => {
    dispatch(getAllStatus());
  }, [dispatch]);

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
                <Select
                  showSearch
                  options={
                    userList?.length > 0
                      ? userList?.map((item) => ({
                          label: item?.name,
                          value: item?.id,
                        }))
                      : []
                  }
                  filterOption={selectFilter}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Assigned to" name="assignedTo">
                <Select
                  showSearch
                  options={
                    userList?.length > 0
                      ? userList?.map((item) => ({
                          label: item?.name,
                          value: item?.id,
                        }))
                      : []
                  }
                  filterOption={selectFilter}
                />
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
                    { label: "Low", value: 1 },
                    { label: "Medium", value: 2 },
                    { label: "High", value: 3 },
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
                  options={
                    statusList?.length > 0
                      ? statusList?.map((item) => ({
                          label: item?.name,
                          value: item?.id,
                        }))
                      : []
                  }
                  filterOption={selectFilter}
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
