"use client";
import CommonTable from "@/app/common/CommonTable";
import { Icon } from "@iconify/react";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Popover,
  Row,
  Select,
  Typography,
} from "antd";
import React from "react";
const { Title, Text } = Typography;

const TaskManagementPage = ({ data }) => {
  const searchFilters = () => {
    return (
      <Form layout="vertical">
        <Row>
          <Col span={11}>
            <Form.Item label="Choose company">
              <Select showSearch />
            </Form.Item>
          </Col>
          <Col span={2} />
          <Col span={11}>
            <Form.Item label="Choose by state">
              <Select showSearch />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            {" "}
            <Form.Item label="Choose by operational unit">
              <Select showSearch />
            </Form.Item>
          </Col>
          <Col span={2} />
          <Col span={11}>
            <Form.Item label="Search by licence name">
              <Select showSearch />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Sort by department">
              <Select showSearch />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Apply
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const sortFilters = () => {
    const onChange = () => {};

    return (
      <Checkbox.Group
        options={[
          { label: "Not started", value: "not_started" },
          { label: "In progress", value: "in_progress" },
          { label: "Completed", value: "completed" },
          { label: "Onhold", value: "onhold" },
        ]}
        onChange={onChange}
      />
    );
  };

  const onRowSelection = () => {};

  const columns = [
    { dataIndex: "companyId", title: "Id", width: 80, fixed: "left" },
    {
      dataIndex: "companyName",
      title: "Company",
      fixed: "left",
    },
    {
      dataIndex: "businessAddress",
      title: "Business unit",
    },
    {
      dataIndex: "businessActivity",
      title: "Activity",
    },
    {
      dataIndex: "taskType",
      title: "Task type",
    },
    {
      dataIndex: "priority",
      title: "Priority",
    },
    {
      dataIndex: "startDate",
      title: "Start date",
    },
    {
      dataIndex: "dueDate",
      title: "Due date",
    },
    { dataIndex: "status", title: "Status" },
    { dataIndex: "progress", title: "Progress" },
    { dataIndex: "reporter", title: "Reporter" },
  ];
  return (
    <>
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Task management</Title>
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
          <Popover
            title="Filters"
            trigger={"click"}
            overlayStyle={{ width: 600 }}
            placement="bottomRight"
            content={searchFilters}
          >
            <Icon
              icon="fluent:filter-24-regular"
              className="cursor-pointer"
              width="24"
              height="24"
            />
          </Popover>
          <Popover
            title="Sort"
            trigger={"click"}
            overlayStyle={{ width: 150 }}
            placement="bottomRight"
            content={sortFilters}
          >
            <Icon
              className="cursor-pointer"
              icon="fluent:arrow-sort-24-regular"
              width="24"
              height="24"
            />
          </Popover>
        </Flex>
      </Flex>
      <CommonTable
        data={data}
        columns={columns}
        rowKey={(row) => row?.id}
        scroll={{ y: "70vh", x: 1500 }}
        handleRowSelection={onRowSelection}
      />
    </>
  );
};

export default TaskManagementPage;
