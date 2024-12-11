"use client";
import CommonTable from "@/app/common/CommonTable";
import {
  createBusinessActivity,
  deleteBusinessActivity,
  updateBusinessActivityBySubIndustryAndId,
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
const { Text, Title } = Typography;

const BusinessActivity = ({ data, industryId, subIndustryId, userId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (data) => {
    form.setFieldsValue({
      businessActivityName: data?.businessActivityName,
    });
    setEditData(data);
    setOpenModal(true);
  };

  const handleDeleteBusinessActivity = (data) => {
    dispatch(deleteBusinessActivity(data?.id))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Business activity deleted successfully !.",
          });
          router.refresh();
        } else {
          notification.error({ message: "Something went wrong !." });
        }
      })
      .catch(() => notification.error({ message: "Something went wrong !." }));
  };

  const columns = [
    { dataIndex: "id", title: "Id", width: 80 },
    {
      dataIndex: "businessActivityName",
      title: "Business activity",
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
          title="Delete business activity"
          description="Are you sure to delete the business activity"
          onConfirm={() => handleDeleteBusinessActivity(data)}
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
        updateBusinessActivityBySubIndustryAndId({
          ...values,
          userId,
          industrySubCategoryId: subIndustryId,
          id: editData?.id,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Industry updated successfully !",
            });
            setOpenModal(false);
            form.resetFields();
            router.refresh();
            setEditData(null);
          } else {
            notification.error({ message: "Something went wrong !" });
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !" }));
    } else {
      dispatch(
        createBusinessActivity({
          ...values,
          industrySubCategoryId: subIndustryId,
          userId,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Industry created successfully !",
            });
            setOpenModal(false);
            form.resetFields();
            router.refresh();
          } else {
            notification.error({ message: "Something went wrong !" });
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !" }));
    }
  };
  return (
    <>
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Business activity list</Title>
        <Button
          type="primary"
          onClick={() => {
            setOpenModal(true);
            form.resetFields();
            setEditData(null);
          }}
        >
          Add Business activity
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
            label="Business activity name"
            name="businessActivityName"
            rules={[
              {
                required: true,
                message: "Please enter business activity name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BusinessActivity;
