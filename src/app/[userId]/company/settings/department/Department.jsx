"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
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
import Link from "next/link";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const { Text, Title } = Typography;
const CommonTable = dynamic(() => import("@/app/common/CommonTable"), {
  loading: () => <Loading />,
});

const Department = ({ data, userId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (resp) => {
    api[resp.status]({
      message: resp.message,
    });
  };

  const handleFinish = (values) => {
    if (editData) {
      dispatch(
        updateDepartment({
          ...values,
          id: editData?.id,
          userId: userId,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            openNotification({
              status: "success",
              message: "Department updated successfully!",
            });
            setOpenModal(false);
            form.resetFields();
            router.refresh();
            editData(null);
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
    } else {
      dispatch(createDepartment({ ...values, userId }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            openNotification({
              status: "success",
              message: "Department added successfully!",
            });
            setOpenModal(false);
            form.resetFields();
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
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteDepartment(id))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          openNotification({
            status: "success",
            message: "Department deleted successfully !.",
          });
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

  const handleEdit = (data) => {
    form.setFieldsValue({
      departmentName: data?.departmentName,
    });
    setEditData(data);
    setOpenModal(true);
  };

  const columns = [
    { dataIndex: "id", title: "Id", width: 80 },
    {
      dataIndex: "departmentName",
      title: "Department name",
      render: (_, data) => (
        <Link href={`department/${data?.id}/designation`}>
          {data?.departmentName}
        </Link>
      ),
    },
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
          title="Delete department"
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
      {contextHolder}
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Department List</Title>
        <Button
          type="primary"
          onClick={() => {
            setOpenModal(true);
            setEditData(null);
            form.resetFields();
          }}
        >
          Add Department
        </Button>
      </Flex>
      <CommonTable
        data={data}
        columns={columns}
        rowKey={(row) => row?.id}
        scroll={{ y: 600 }}
      />
      <Modal
        title={editData ? "Edit department" : "Create department"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Department"
            name="departmentName"
            rules={[{ required: true, message: "Please enter department" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Department;
