"use client";
import CommonTable from "@/app/common/CommonTable";
import {
  createCompanyType,
  deleteCompanyType,
  editCompanyType,
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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const { Text } = Typography;

const CompanyType = ({ data, userId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteCompanyType(id))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Company type deleted successfully !.",
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
      companyTypeName: data?.companyTypeName,
    });
    setEditData(data);
    setOpenModal(true);
  };

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
    },
    {
      dataIndex: "companyTypeName",
      title: "Company type",
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
          title="Delete company type"
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

  const handleFinish = (values) => {
    if (editData) {
      dispatch(
        editCompanyType({
          data: { ...values, userId },
          id: editData?.id,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Company type updated successfully!",
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
      dispatch(createCompanyType({ ...values, userId }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Company type added successfully!",
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

  return (
    <>
      <Flex justify="space-between" align="center" className="p-1 pt-0">
        <Text className="main-heading-text">Company type list</Text>
        <Button
          type="primary"
          onClick={() => {
            setOpenModal(true);
            setEditData(null);
            form.resetFields();
          }}
        >
          Add company type
        </Button>
      </Flex>
      <CommonTable
        data={data}
        columns={columns}
        rowKey={(row) => row?.id}
        scroll={{ y: 600 }}
      />
      <Modal
        title={editData ? "Edit company type" : "Create company type"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Company type"
            name="companyTypeName"
            rules={[{ required: true, message: "Please enter company type" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CompanyType;
