"use client";
import CommonTable from "@/app/common/CommonTable";
import {
  createCities,
  updateCities,
} from "@/app/redux-toolkit/slices/commonSlice";
import { Icon } from "@iconify/react";
import { Button, Flex, Form, Input, Modal, notification, Typography } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const { Text } = Typography;

const Cities = ({ data, userId, stateId, countryId }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (data) => {
    form.setFieldsValue({
      cityName: data?.cityName,
      cityCode:data?.cityCode
    });
    setEditData(data);
    setOpenModal(true);
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
  ];

  const handleFinish = (values) => {
    if (editData) {
      dispatch(updateCities({ ...values, stateId, id: editData?.id }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Cities updated successfully !",
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
      dispatch(createCities({ ...values, stateId: stateId }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Cities created successfully !",
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
        <Text className="main-heading-text">Cities list</Text>
        <Button type="primary" onClick={()=>setOpenModal(true)}>Add city</Button>
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
