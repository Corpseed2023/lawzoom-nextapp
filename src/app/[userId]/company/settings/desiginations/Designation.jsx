"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDesiginations,
  deleteDesigination,
  editDesigination,
  getAllDesiginations,
} from "@/app/redux-toolkit/slices/settingSlice";
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
import CommonTable from "@/app/common/CommonTable";
import store from "@/app/redux-toolkit/store";
import { Icon } from "@iconify/react";

const { Text } = Typography;

const Designation = ({ data, userId, fetchDesiginations }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleFinish = (values) => {
    if (editData) {
      dispatch(
        editDesigination({
          designationName: values?.designation,
          designationId: editData?.id,
          userID:userId,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Designation updated successfully!",
            });
            setOpenModal(false);
            form.resetFields();
            window.location.reload();
          } else {
            notification.error({ message: "Something went wrong!" });
          }
        })
        .catch(() => notification.error({ message: "Something went wrong!" }));
    } else {
      dispatch(createDesiginations({ ...values, userId }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Designation added successfully!",
            });
            setOpenModal(false);
            form.resetFields();
            window.location.reload();
          } else {
            notification.error({ message: "Something went wrong!" });
          }
        })
        .catch(() => notification.error({ message: "Something went wrong!" }));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteDesigination({ id, userId }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Desigination deleted successfully !.",
          });
          window.location.reload();
        } else {
          notification.error({ message: "Something went wrong !." });
        }
      })
      .catch(() => notification.error({ message: "Something went wrong !." }));
  };

  const handleEdit = (data) => {
    form.setFieldsValue({
      designation: data?.designationName,
    });
    setEditData(data);
    setOpenModal(true);
  };

  const columns = [
    { dataIndex: "id", title: "Id", width: 80 },
    { dataIndex: "designationName", title: "Designations" },
    {
      dataIndex: "edit",
      title: "Edit",
      render: (_, data) => (
        <Button size="small" type="text" onClick={() => handleEdit(data)}>
          <Icon icon="fluent:edit-24-regular" />
        </Button>
      ),
    },
    {
      dataIndex: "delete",
      title: "Delete",
      render: (_, data) => (
        <Popconfirm
          title="Delete designation"
          description="Are you sure to delete the task"
          onConfirm={() => handleDelete(data?.id)}
        >
          <Button size="small" type="text" danger>
            <Icon icon="fluent:delete-24-regular" />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Flex justify="space-between" align="center" className="p-1 pt-0">
        <Text className="main-heading-text">Designation List</Text>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add Designation
        </Button>
      </Flex>
      <CommonTable
        data={data}
        columns={columns}
        rowKey={(row) => row?.id}
        scroll={{ y: 600 }}
      />
      <Modal
        title={editData?"Edit designation":"Create designation"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Designation"
            name="designation"
            rules={[{ required: true, message: "Please enter designation" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Designation;
