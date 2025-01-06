"use client";
import CommonTable from "@/app/common/CommonTable";
import { Icon } from "@iconify/react";
import { Button, Col, DatePicker, Flex, Form, Input, InputNumber, Modal, Row, Select, Typography } from "antd";
import React, { useState } from "react";
const { Title, Text } = Typography;

const Task = ({ data }) => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
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

  const handleFinish = (values) => {

  };




  return (
    <>
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Task list</Title>
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
            Add task
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
        title={editData ? "Edit task" : "Add task"}
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
                label="Task name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "please enter task name ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Assigned to"
                name="reporterUserId"
                rules={[
                  { required: true, message: "Please select assigned person" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
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
            <Col span={2} />
            <Col span={11}>
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

export default Task;
