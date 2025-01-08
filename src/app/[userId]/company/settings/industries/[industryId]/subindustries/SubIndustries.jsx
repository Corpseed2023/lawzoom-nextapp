"use client";
import CommonTable from "@/app/common/CommonTable";
import {
  createSubIndustry,
  deleteSubIndustry,
  updateSubIndustryById,
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
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const { Text, Title } = Typography;

const SubIndustries = ({ data, userId, industryId }) => {
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

  const handleEdit = (data) => {
    form.setFieldsValue({
      industrySubCategoryName: data?.industrySubCategoryName,
    });
    setEditData(data);
    setOpenModal(true);
  };

  const handleDeleteSubindustry = (data) => {
    dispatch(deleteSubIndustry(data?.id))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          openNotification({
            status: "success",
            message: "Sub industry deleted successfully !.",
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

  const columns = [
    { dataIndex: "id", title: "Id", width: 80 },
    {
      dataIndex: "industrySubCategoryName",
      title: "Sub Industry name",
      render: (_, data) => (
        <Link
          href={`/${userId}/company/settings/industries/${industryId}/subindustries/${data?.id}/businessActivity`}
        >
          {data?.industrySubCategoryName}
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
          title="Delete subindustry"
          description="Are you sure to delete the subindustry"
          onConfirm={() => handleDeleteSubindustry(data)}
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
      dispatch(
        updateSubIndustryById({
          ...values,
          userId,
          industryCategoryId: industryId,
          id: editData?.id,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            openNotification({
              status: "success",
              message: "Industry updated successfully !.",
            });
            setOpenModal(false);
            form.resetFields();
            router.refresh();
            setEditData(null);
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
      dispatch(
        createSubIndustry({ ...values, industryCategoryId: industryId, userId })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            openNotification({
              status: "success",
              message: "Industry created successfully !.",
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
  return (
    <>
      {contextHolder}
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Subindustries list</Title>
        <Button
          type="primary"
          onClick={() => {
            setOpenModal(true);
            form.resetFields();
            setEditData(null);
          }}
        >
          Add Subindustry
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
            label="Sub Industry name"
            name="industrySubCategoryName"
            rules={[
              { required: true, message: "Please enter sub industry name" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SubIndustries;
