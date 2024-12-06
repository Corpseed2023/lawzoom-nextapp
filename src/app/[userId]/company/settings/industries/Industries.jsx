"use client";
import CommonTable from "@/app/common/CommonTable";
import {
  createIndustry,
  updateIndustry,
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
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const { Text } = Typography;

const Industries = ({ data, userId }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (data) => {
    form.setFieldsValue({
      industryName: data?.industryName,
    });
    setEditData(data);
    setOpenModal(true);
  };

  const handleDeleteIndustry = (data) => {
    // dispatch(deleteCitiesById(data?.id))
    //   .then((resp) => {
    //     if (resp.meta.requestStatus === "fulfilled") {
    //       notification.success({ message: "City deleted successfully !." });
    //       window.location.reload();
    //     } else {
    //       notification.error({ message: "Something went wrong !." });
    //     }
    //   })
    //   .catch(() => notification.error({ message: "Something went wrong !." }));
  };

  const columns = [
    { dataIndex: "id", title: "Id", width: 80 },
    {
      dataIndex: "industryName",
      title: "Industry name",
      render: (_, data) => (
        <Link
          href={`/${userId}/company/settings/industries/${data?.id}/subindustries`}
        >
          {data?.industryName}
        </Link>
      ),
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
          title="Delete industry"
          description="Are you sure to delete the industry"
          onConfirm={() => handleDeleteIndustry(data)}
        >
          <Button type="text" danger size="small">
            <Icon icon="fluent:delete-24-regular" />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleFinish = (values) => {
    if (editData) {
      dispatch(updateIndustry({ ...values, userId, id: editData?.id }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Industry updated successfully !",
            });
            setOpenModal(false);
            form.resetFields();
            window.location.reload();
          } else {
            notification.error({ message: "Something went wrong !" });
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !" }));
    } else {
      dispatch(createIndustry({ ...values, userId }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Industry created successfully !",
            });
            setOpenModal(false);
            form.resetFields();
            window.location.reload();
          } else {
            notification.error({ message: "Something went wrong !" });
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !" }));
    }
  };
  return (
    <>
      <Flex justify="space-between" align="center" className="p-1 pt-0">
        <Text className="main-heading-text">Industries list</Text>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add industry
        </Button>
      </Flex>
      <CommonTable
        data={data}
        rowKey={(row) => row?.id}
        columns={columns}
        scroll={{ y: 600 }}
      />
      <Modal
        title={editData ? "Update industry" : "Create industry"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Industry name"
            name="industryName"
            rules={[{ required: true, message: "Please enter industry name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Industries;
