"use client";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Flex,
  Input,
  Row,
  Select,
  Tabs,
  Typography,
  Upload,
} from "antd";
import React from "react";
import BasicDetails from "./BasicDetails";
import { Icon } from "@iconify/react";
const { Text, Title } = Typography;

const AddMilestone = () => {
  const items = [
    {
      key: "1",
      label: "Basic details",
      children: <BasicDetails />,
    },
    {
      key: "2",
      label: "Document required",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Compliances",
      children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: "Guid",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <>
      <Row className="h-full" gutter={32}>
        <Col span={14}>
          <Tabs items={items} />
        </Col>
        <Col span={10}>
          <Flex vertical gap={24}>
            <Flex justify="space-between" className="w-full">
              <Flex vertical gap={8}>
                <Title level={5}>Haldirams Foods Private Limited</Title>
                <Flex gap={8}>
                  <Text type="secondary">Activity</Text>
                  <Text>:</Text>
                  <Text>Food Manufacturing unit</Text>
                </Flex>
                <Flex gap={8}>
                  <Text type="secondary">Task Type</Text>
                  <Text>:</Text>
                  <Text>Contract Labour Compliances</Text>
                </Flex>
              </Flex>
              <Flex vertical gap={8}>
                <Flex align="center" gap={8}>
                  <Text type="secondary">Gurugram</Text>
                  <Divider type="vertical" style={{ margin: 0 }} />
                  <Text type="secondary">Haryana</Text>
                </Flex>
                <Flex align="center" gap={8}>
                  <Text type="secondary">Priority</Text>
                  <Text>:</Text>
                  <Text strong>High</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justify="space-between" align="center" className="w-full">
              <Flex vertical justify="center" gap={8}>
                <Text>Approval state</Text>
                <Select size="small" style={{ width: "200px" }} />
              </Flex>
              <Flex vertical justify="center" gap={8}>
                <Text>Applicable zone</Text>
                <Select size="small" style={{ width: "200px" }} />
              </Flex>
            </Flex>
            <Flex justify="space-between" align="center">
              <Flex gap={8} align="center">
                <Text type="secondary">Start</Text>
                <Text>:</Text>
                <Text>01/05/2024</Text>
              </Flex>
              <Flex gap={8} align="center">
                <Text type="secondary">Due</Text>
                <Text>:</Text>
                <Text>10/07/2024</Text>
              </Flex>
              <Flex gap={8} align="center">
                <Text type="secondary">Completed</Text>
                <Text>:</Text>
                <Text>15/08/2024</Text>
              </Flex>
            </Flex>
            <Flex align="center" justify="space-between" gap={24}>
              <Text>Reporter</Text>
              <Flex align="center" gap={8}>
                <Avatar size={"small"}>AK</Avatar>
                <Text>Abhishek singh</Text>
              </Flex>
              <Text>Assignee</Text>
              <Flex align="center" gap={8}>
                <Avatar size={"small"}>AK</Avatar>
                <Text>Abhishek singh</Text>
              </Flex>
            </Flex>
            <Flex align="center" justify="space-between">
              <Upload>
                <Button size="large" type="text">
                  <Icon
                    icon="fluent:attach-24-regular"
                    width="24"
                    height="24"
                  />
                  Attach Document
                </Button>
              </Upload>
              <Flex align="center" gap={8}>
                <Text>Document issue date</Text>
                <DatePicker size="small"  />
              </Flex>
            </Flex>
            <Flex justify="space-between" align="center" gap={12}>
              <Flex vertical gap={8}>
                <Text>Issuer authority</Text>
                <Input size="small" />
              </Flex>
              <Flex vertical gap={8}>
                <Text>Certificate type</Text>
                <Input size="small"  />
              </Flex>
            </Flex>
            <Flex justify="space-between" align="center" gap={8}>
              <Text>Document reference number</Text>
              <Input />
            </Flex>
            <Flex justify="space-between" align="center">
              <Flex vertical gap={8}>
                <Text>Set compliance reminder</Text>
                <DatePicker size="small"  />
              </Flex>
              <Flex vertical gap={8}>
                <Text>Set renewal reminder</Text>
                <DatePicker size="small"  />
              </Flex>
            </Flex>
            <Flex vertical gap={8}>
              <Text>Remark</Text>
              <Input.TextArea />
            </Flex>
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default AddMilestone;
