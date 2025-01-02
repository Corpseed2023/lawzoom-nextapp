import CommonTable from "@/app/common/CommonTable";
import { Icon } from "@iconify/react";
import { Button, Col, Flex, Form, Input, Modal, Row, Typography } from "antd";
import React, { useState } from "react";
const { Title, Text } = Typography;

const Task = ({data}) => {
  const [form] = Form.useForm();
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

  const handleFinish = () => {};
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
                label="start date"
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
