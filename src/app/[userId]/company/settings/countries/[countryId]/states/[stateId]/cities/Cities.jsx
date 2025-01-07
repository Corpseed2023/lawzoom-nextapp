"use client";
import Loading from "@/app/loading";
import {
  createCities,
  deleteCitiesById,
  updateCities,
} from "@/app/redux-toolkit/slices/commonSlice";
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
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const { Text, Title } = Typography;
const CommonTable = dynamic(() => import("@/app/common/CommonTable"), {
  loading: () => <Loading />,
});

const Cities = ({ data, userId, stateId, countryId }) => {
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
      cityName: data?.cityName,
      cityCode: data?.cityCode,
    });
    setEditData(data);
    setOpenModal(true);
  };

  const handleDeleteCity = (data) => {
    dispatch(deleteCitiesById(data?.id))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          openNotification({
            status: "success",
            message: "City deleted successfully !.",
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
      dataIndex: "cityName",
      title: "City name",
    },
    {
      dataIndex: "cityCode",
      title: "City code / Zip code",
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
          title="Delete city"
          description="Are you sure to delete the city"
          onConfirm={() => handleDeleteCity(data)}
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
      dispatch(updateCities({ ...values, stateId, id: editData?.id }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            openNotification({
              status: "success",
              message: "Cities updated successfully !",
            });
            setOpenModal(false);
            form.resetFields();
            router.refresh();
          } else {
            openNotification({
              status: "error",
              message: "Something went wrong !",
            });
          }
        })
        .catch(() =>
          openNotification({
            status: "error",
            message: "Something went wrong !",
          })
        );
    } else {
      dispatch(createCities({ ...values, stateId: stateId }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            openNotification({
              status: "success",
              message: "City created successfully !",
            });
            setOpenModal(false);
            form.resetFields();
            router.refresh();
          } else {
            openNotification({
              status: "error",
              message: "Something went wrong !",
            });
          }
        })
        .catch(() =>
          openNotification({
            status: "error",
            message: "Something went wrong !",
          })
        );
    }
  };

  return (
    <>
      {contextHolder}
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Cities list</Title>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add city
        </Button>
      </Flex>
      <CommonTable
        data={data}
        rowKey={(row) => row?.id}
        columns={columns}
        scroll={{ y: 600 }}
      />
      <Modal
        title={editData ? "Update city" : "Create city"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="City name"
            name="cityName"
            rules={[{ required: true, message: "Please enter state name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="City code / Zip code"
            name="cityCode"
            rules={[{ required: true, message: "Please enter state name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Cities;
