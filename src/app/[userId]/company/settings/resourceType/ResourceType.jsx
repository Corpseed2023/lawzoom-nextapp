"use client";
import CommonTable from "@/app/common/CommonTable";
import {
  createResourceType,
  deleteResourceType,
  updateResourceType,
} from "@/app/redux-toolkit/slices/settingSlice";
import { Icon } from "@iconify/react";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Popconfirm,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const { Title } = Typography;

const ResourceType = ({ data, userId }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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

  const handleEdit = (value) => {
    form.setFieldsValue({
      typeOfResourceName: value?.typeOfResourceName,
    });
    setOpenModal(true);
    setEditData(value);
  };

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 100,
    },
    {
      dataIndex: "typeOfResourceName",
      title: "Resource type",
    },
    {
      dataIndex: "edit",
      title: "Edit",
      render: (_, data) => (
        <Button type="text" size="small" onClick={() => handleEdit(data)}>
          <Icon icon="fluent:edit-24-regular" />
        </Button>
      ),
    },
    {
      dataIndex: "delete",
      title: "Delete",
      render: (_, data) => (
        <Popconfirm
          title="Delete resource type"
          description="Are yopu sure to delete respource type"
          onConfirm={() => dispatch(deleteResourceType(data?.id))}
        >
          <Button type="text" size="small" danger>
            <Icon icon="fluent:delete-24-regular" />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleFinish = (values) => {
    if (editData) {
      dispatch(updateResourceType({ id: editData?.id, data: values }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Resource type updated successfully !.",
            });
            setOpenModal(false);
            form.resetFields();
            setEditData(null);
            router.refresh();
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch((err) =>
          notification.error({ message: "Something went wrong !." })
        );
    } else {
      dispatch(createResourceType(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Resource type created successfully !.",
            });
            setOpenModal(false);
            form.resetFields();
            router.refresh();
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch((err) =>
          notification.error({ message: "Something went wrong !." })
        );
    }
  };

  return (
    <>
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Resource type list</Title>
      </Flex>
      <Flex justify="space-between" className="mb-2">
        <Input
          className="w-1/4"
          placeholder="search"
          value={searchTerm}
          onChange={handleSearch}
          prefix={
            <Icon icon="fluent:search-24-regular" width="16" height="16" />
          }
        />
        <Button
          type="primary"
          onClick={() => {
            setOpenModal(true);
            setEditData(null);
            form.resetFields();
          }}
        >
          Add resource type
        </Button>
      </Flex>
      <CommonTable
        data={filteredData}
        columns={columns}
        rowKey={(row) => row?.id}
        scroll={{ y: '75vh' }}
      />
      <Modal
        title={editData ? "Edit resource type" : "Create resource type"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Resource type name"
            name="typeOfResourceName"
            rules={[{ required: true, message: "Please enter resource type" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ResourceType;
