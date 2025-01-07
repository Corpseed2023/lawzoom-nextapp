"use client";
import Loading from "@/app/loading";
import {
  createStatesForCountry,
  updateStatesForCountry,
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
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const { Text, Title } = Typography;
const CommonTable = dynamic(() => import("@/app/common/CommonTable"), {
  loading: () => <Loading />,
});

const States = ({ data, countryId, userId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (data) => {
    form.setFieldsValue({
      stateName: data?.stateName,
    });
    setEditData(data);
    setOpenModal(true);
  };

  const columns = [
    { dataIndex: "id", title: "Id", width: 80 },
    {
      dataIndex: "stateName",
      title: "State name",
      render: (_, data) => (
        <Link
          href={`/${userId}/company/settings/countries/${countryId}/states/${data.id}/cities`}
        >
          {data?.stateName}
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
  ];

  const handleFinish = (values) => {
    if (editData) {
      dispatch(
        updateStatesForCountry({ ...values, countryId, id: editData?.id })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "State updated successfully !",
            });
            setOpenModal(false);
            form.resetFields();
            router.refresh();
          } else {
            notification.error({ message: "Something went wrong !" });
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !" }));
    } else {
      dispatch(createStatesForCountry({ ...values, countryId: countryId }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "State created successfully !",
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
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>States list</Title>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add state
        </Button>
      </Flex>
      <CommonTable
        data={data}
        rowKey={(row) => row?.id}
        columns={columns}
        scroll={{ y: 600 }}
      />
      <Modal
        title={editData ? "Update state" : "Create state"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="State name"
            name="stateName"
            rules={[{ required: true, message: "Please enter state name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default States;
