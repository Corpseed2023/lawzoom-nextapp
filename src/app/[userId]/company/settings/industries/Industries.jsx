"use client";
import Loading from "@/app/loading";
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
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const { Text, Title } = Typography;
const { Search } = Input;
const CommonTable = dynamic(() => import("@/app/common/CommonTable"), {
  loading: () => <Loading />,
});

const Industries = ({ data, userId }) => {
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
      dispatch(createIndustry({ ...values, userId }))
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
        <Title level={4}>Industries list</Title>
      </Flex>
      <Flex className="w-full mb-2" justify="space-between">
        <Search
          className="w-1/3"
          enterButton="Search"
          prefix={
            <Icon icon="fluent:search-24-regular" width="18" height="18" />
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
