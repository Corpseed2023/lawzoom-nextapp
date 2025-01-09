"use client";
import { selectFilter } from "@/app/commons";
import Loading from "@/app/loading";
import { getAllStatus } from "@/app/redux-toolkit/slices/commonSlice";
import { createTask } from "@/app/redux-toolkit/slices/complianceSlice";
import { Icon } from "@iconify/react";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Typography,
} from "antd";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const { Title, Text } = Typography;
const CommonTable = dynamic(() => import("@/app/common/CommonTable"), {
  loading: () => <Loading />,
});

const Task = ({ data, milestoneId, userId, subscriberId, userList }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const statusList = useSelector((state) => state.common.statusList);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const openNotification = (resp) => {
    api[resp.status]({
      message: resp.message,
    });
  };

  useEffect(() => {
    dispatch(getAllStatus());
  }, [dispatch]);

  useEffect(() => {
    if (data && data?.length > 0) {
      setFilteredData(data);
    }
  }, [data]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()?.trim();
    setSearchTerm(query);
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
    setFilteredData(filtered);
  };

  const columns = [
    { dataIndex: "id", title: "Id", fixed: "left", width: 80 },
    { dataIndex: "name", title: "Task", fixed: "left" },
    { dataIndex: "status", title: "Status" },
    { dataIndex: "dueDate", title: "Due date" },
    { dataIndex: "criticality", title: "Criticality" },
    { dataIndex: "startDate", title: "Start date" },
    { dataIndex: "completedDate", title: "Completed date" },
    { dataIndex: "description", title: "Description" },
  ];

  const handleFinish = (values) => {
    dispatch(createTask({ ...values, milestoneId, assigneeUserId: userId }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          openNotification({
            status: "success",
            message: "Task created successfully !.",
          });
          form.resetFields();
          setOpenModal(false);
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
        <Title level={4}>Task list</Title>
      </Flex>
      <Flex justify="space-between" align="center" className="mb-2">
        <Input
          className="w-1/4"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
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
        data={filteredData}
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
              <Form.Item label="Status" name="statusId">
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
