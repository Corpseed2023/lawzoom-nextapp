"use client";
import CommonTable from "@/app/common/CommonTable";
import { createRole } from "@/app/redux-toolkit/slices/commonSlice";
import { Icon } from "@iconify/react";
import { Button, Flex, Form, Input, Modal, notification, Typography } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const { Title } = Typography;

const Roles = ({ data }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data && data?.length > 0) {
      setFilteredData(data);
    }
  }, [data]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()?.trim();
    setSearchTerm(query);
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
    },
    {
      dataIndex: "role",
      title: "Roles",
    },
  ];

  const handleFinish = (values) => {
    dispatch(createRole(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Resource type created successfully !.",
          });
          setOpenModal(false);
          form.resetFields();
          router.refresh();
        } else {
          notification.error({ message: "Something went wrong !." });
        }
      })
      .catch((err) =>
        notification.error({ message: "Something went wrong !." })
      );
  };
  return (
    <>
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Roles list</Title>
      </Flex>
      <Flex justify="space-between" className="mb-2">
        <Input
          className="w-1/4"
          placeholder="search"
          value={searchTerm}
          onChange={handleSearch}
          prefix={
            <Icon icon="fluent:search-24-regular" width="16" height="16" />
          }
        />
        <Button
          type="primary"
          onClick={() => {
            setOpenModal(true);
            form.resetFields();
          }}
        >
          Create role
        </Button>
      </Flex>
      <CommonTable
        data={filteredData}
        columns={columns}
        rowKey={(row) => row?.id}
        scroll={{ y: "75vh" }}
      />
      <Modal
        title={"Create role"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Role name"
            name="role"
            rules={[{ required: true, message: "Please enter role" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Roles;
