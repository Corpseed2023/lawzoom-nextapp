"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createDesiginations,
  deleteDesigination,
  editDesigination,
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
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const { Text, Title } = Typography;
const CommonTable = dynamic(() => import("@/app/common/CommonTable"), {
  loading: () => <Loading />,
});

const Designation = ({ data, userId, departmentId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleFinish = (values) => {
    if (editData) {
      dispatch(
        editDesigination({
          designationName: values?.designationName,
          designationId: editData?.designationId,
          userID: userId,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Designation updated successfully!",
            });
            setOpenModal(false);
            form.resetFields();
            router.refresh();
          } else {
            notification.error({ message: "Something went wrong!" });
          }
        })
        .catch(() => notification.error({ message: "Something went wrong!" }));
    } else {
      dispatch(createDesiginations({ ...values, userId, departmentId }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Designation added successfully!",
            });
            setOpenModal(false);
            form.resetFields();
            router.refresh();
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
          router.refresh();
        } else {
          notification.error({ message: "Something went wrong !." });
        }
      })
      .catch(() => notification.error({ message: "Something went wrong !." }));
  };

  const handleEdit = (data) => {
    form.setFieldsValue({
      designationName: data?.designationName,
    });
    setEditData(data);
    setOpenModal(true);
  };

  const columns = [
    { dataIndex: "designationId", title: "Id", width: 80 },
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
          onConfirm={() => handleDelete(data?.designationId)}
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
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Designation List</Title>
        <Button
          type="primary"
          onClick={() => {
            setOpenModal(true);
            setEditData(null);
            form.resetFields();
          }}
        >
          Add Designation
        </Button>
      </Flex>
      <CommonTable
        data={data}
        columns={columns}
        rowKey={(row) => row?.designationId}
        scroll={{ y: 600 }}
      />
      <Modal
        title={editData ? "Edit designation" : "Create designation"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Designation"
            name="designationName"
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
