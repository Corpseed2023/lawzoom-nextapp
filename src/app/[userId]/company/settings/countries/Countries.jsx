"use client";
import CommonTable from "@/app/common/CommonTable";
import {
  createCountry,
  updateCountry,
} from "@/app/redux-toolkit/slices/commonSlice";
import { Icon } from "@iconify/react";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Typography,
} from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const { Text } = Typography;

const Countries = ({ data, userId }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleUpdateCountries = (data) => {
    form.setFieldsValue({
      countryCode: data?.countryCode,
      countryName: data?.countryName,
    });
    setEditData(data);
    setOpenModal(true);
  };

  const columns = [
    { dataIndex: "id", title: "Id", width: 80 },
    {
      dataIndex: "countryName",
      title: "Country name",
      render: (_, data) => (
        <Link href={`/${userId}/company/settings/countries/${data.id}/states`}>
          {data?.countryName}
        </Link>
      ),
    },
    { dataIndex: "countryCode", title: "Country code" },
    {
      dataIndex: "edit",
      title: "Edit",
      render: (_, data) => (
        <Button
          type="text"
          size="small"
          onClick={() => handleUpdateCountries(data)}
        >
          <Icon icon="fluent:edit-24-regular" />
        </Button>
      ),
    },
  ];

  const handleFinish = (values) => {
    if (editData) {
      dispatch(updateCountry({ ...values, id: editData?.id }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Country updated successfully !.",
            });
            setOpenModal(false);
            form.resetFields();
            window.location.reload();
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    } else {
      dispatch(createCountry(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Country created successfully !.",
            });
            setOpenModal(false);
            form.resetFields();
            window.location.reload();
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    }
  };

  return (
    <>
      <Flex justify="space-between" align="center" className="p-1 pt-0">
        <Text className="main-heading-text">Country list</Text>
        <Button type="primary" onClick={()=>setOpenModal(true)}>Add country</Button>
      </Flex>
      <CommonTable
        data={data}
        columns={columns}
        rowKey={(row) => row?.id}
        scroll={{ y: 600 }}
      />
      <Modal
        title={editData ? "Edit country" : "Create country"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Country name"
            name="countryName"
            rules={[{ required: true, message: "please enter country name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Country code"
            name="countryCode"
            rules={[{ required: true, message: "please enter country code" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Countries;
