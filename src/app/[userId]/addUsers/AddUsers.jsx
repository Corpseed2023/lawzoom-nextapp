"use client";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  List,
  Modal,
  Row,
  Select,
  Skeleton,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import logo from "../../../assets/lowZoom.png";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { getProductData } from "@/app/actions";
const { Text } = Typography;

const fakeDataUrl = `https://randomuser.me/api/?results=${5}&inc=name,gender,email,nat,picture&noinfo`;
const AddUsers = () => {
  const [form] = Form.useForm();
  const [initLoading, setInitLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, [fakeDataUrl]);

//   const dataProducts= await getProductData()
//   console.log(dataProducts)



  return (
    <>
      <Flex gap={24} justify="space-between" className="py-6 px-24">
        <Image
          src={logo}
          priority={true}
          alt="lowzoom-logo"
          height={"10%"}
          width={"20%"}
        />{" "}
        <Button type="link" href="/" size="large" className="text-xl">
          Logout
        </Button>
      </Flex>

      <Flex vertical className="py-12 px-32">
        <Flex justify="space-between" align="center">
          <Text className="text-xl text-gray-900">Team</Text>
          <Button
            type="link"
            size="large"
            className="text-lg"
            onClick={() => setOpenModal(true)}
          >
            Add people
          </Button>
        </Flex>
        <Divider style={{ margin: "6px 0px" }} />
        <List
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="link">
                  <Icon icon="fluent:add-24-regular" />
                  Add team
                </Button>,
                <Button type="link">
                  <Icon icon="fluent:edit-24-regular" />
                  Edit
                </Button>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name?.last}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
                <div>content</div>
              </Skeleton>
            </List.Item>
          )}
        />
      </Flex>
      <Modal
        title="Add users"
        width={800}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form}>
          <Row>
            <Col span={11}>
              <Form.Item
                label="First name"
                name="firstName"
                rules={[{ required: true, message: "please enter first name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Last name"
                name="lastName"
                rules={[{ required: true, message: "please enter last name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Access type"
                name="accessType"
                rules={[
                  { required: true, message: "please select accessb type" },
                ]}
              >
                <Select />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "please enter email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Mobile number"
                name="mobile"
                rules={[
                  { required: true, message: "please enter mobile number" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Type of resource"
                name="resourceType"
                rules={[
                  {
                    required: true,
                    message: "please select resource",
                  },
                ]}
              >
                <Select />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Reporting manager"
                name="reporting"
                rules={[
                  {
                    required: true,
                    message: "please enter your repaorting manager name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Select roles"
                name="roles"
                rules={[
                  {
                    required: true,
                    message: "please select roles",
                  },
                ]}
              >
                <Select />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddUsers;
