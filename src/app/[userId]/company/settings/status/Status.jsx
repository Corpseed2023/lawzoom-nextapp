'use client'
import Loading from "@/app/loading";
import { createStatus } from "@/app/redux-toolkit/slices/commonSlice";
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
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const { Title, Text } = Typography;
const CommonTable = dynamic(() => import("@/app/common/CommonTable"), {
  loading: () => <Loading />,
});

const Status = ({data}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (resp) => {
    api[resp.status]({
      message: resp.message,
    });
  };

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
      dataIndex: "name",
      title: "Staus",
    },
  ];

  const handleFinish = (values) => {

    console.log('sdkjvbhalksdbvjk',values)
    dispatch(createStatus(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          openNotification({
            status: "success",
            message: "Status created successfully !.",
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
      .catch((err) =>
        openNotification({
          status: "error",
          message: "Something went wrong !.",
        })
      );
  };

  return (
    <>
      {contextHolder}
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Staus list</Title>
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
          Add status
        </Button>
      </Flex>
      <CommonTable
        data={filteredData}
        columns={columns}
        rowKey={(row) => row?.id}
        scroll={{ y: "75vh" }}
      />
      <Modal
        title={"Create status"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Status name"
            name="status"
            rules={[{ required: true, message: "Please enter status" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Status;
