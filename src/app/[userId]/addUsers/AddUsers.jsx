"use client";
import {
  Avatar,
  Button,
  Checkbox,
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
import { useDispatch, useSelector } from "react-redux";
import { getAllRoles } from "@/app/redux-toolkit/slices/commonSlice";
import { selectFilter } from "@/app/commons";
import { useRouter } from "next/navigation";
const { Text, Title } = Typography;

const fakeDataUrl = `https://randomuser.me/api/?results=${5}&inc=name,gender,email,nat,picture&noinfo`;
const AddUsers = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const allRoles = useSelector((state) => state.common.allRoles);

  const [initLoading, setInitLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

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
          renderItem={(item,idx) => (
            <List.Item
            key={`${idx}users`}
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
                  title={<a href="">{item.name?.last}</a>}
                  description="This company compliance is managing by Corpdseed Ites Pvt Ltd"
                />
                <div>content</div>
              </Skeleton>
            </List.Item>
          )}
        />

        <Flex justify={"space-between"} className="w-full px-12 py-6 mt-6">
          <Button
            style={{ padding: "4px 32px", font: 14 }}
            size="large"
            variant="dashed"
            onClick={() => router.push("company/dashboard")}
          >
            Skip
          </Button>
          <Flex vertical align="center">
            <Title level={3} className="text-xl">
              Need help?
            </Title>
            <Flex align="center" gap={4}>
              <Title level={4}>Call</Title>
              <Title level={4} style={{ color: "#1677ff" }}>
                7558 640 644
              </Title>
            </Flex>
            <Text className="text-lg">(9.00 am to 6.00 PM IST, Mon-Fri)</Text>
          </Flex>
          <Flex>
            <Button
              type="primary"
              size="large"
              style={{ padding: "4px 32px", font: 14 }}
              onClick={() => router.push("company/dashboard")}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Modal
        title="Add users"
        centered
        width={800}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            privilages: ["read", "create"],
          }}
        >
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
                <Select
                  options={
                    allRoles?.length > 0
                      ? allRoles?.map((item) => ({
                          label: item?.role,
                          value: item?.id,
                        }))
                      : []
                  }
                  filterOption={selectFilter}
                />
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
                <Select
                  options={
                    allRoles?.length > 0
                      ? allRoles?.map((item) => ({
                          label: item?.role,
                          value: item?.id,
                        }))
                      : []
                  }
                  filterOption={selectFilter}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {" "}
              <Flex className="w-full" justify="center">
                <Text className="main-heading-text">Previlages for users</Text>
              </Flex>{" "}
            </Col>
          </Row>
          <Form.Item name="privilages" label="Privilages">
            <Checkbox.Group>
              <Row gutter={24}>
                <Col>
                  <Checkbox
                    value="read"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                    Read
                  </Checkbox>
                </Col>
                <Col>
                  <Checkbox
                    value="create"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                    Create
                  </Checkbox>
                </Col>
                <Col>
                  <Checkbox
                    value="update"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                    Update
                  </Checkbox>
                </Col>
                <Col>
                  <Checkbox
                    value="delete"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                    Delete
                  </Checkbox>
                </Col>
                <Col>
                  <Checkbox
                    value="export"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                    Export
                  </Checkbox>
                </Col>
                <Col>
                  <Checkbox
                    value="upload"
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                    Upload
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddUsers;
