"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Layout,
  notification,
  Row,
  Typography,
} from "antd";
import logo from "../assets/lowZoom.png";
import Link from "next/link";
import CommonPopOver from "./common/CommonPopOver";
import ServiceContent from "./common/ServiceContent";
import PartnersContent from "./common/PartnersContent";
import CompanyContent from "./common/CompanyContent";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createEnquiry } from "./redux-toolkit/slices/commonSlice";
import Card from "antd/es/card/Card";
const { Text } = Typography;

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [serviceOpenChange, setServiceOpenChange] = useState(false);
  const [partnerOpenChange, setPartnerOpenChange] = useState(false);
  const [companyOpenChange, setCompanyOpenChange] = useState(false);

  const handleFinish = (values) => {
    dispatch(createEnquiry(values))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          form.resetFields();
          notification.success({ message: "Enquiry added successfully" });
        } else {
          notification.error({ message: "Something went wrong !." });
        }
      })
      .catch(() => notification.error({ message: "Something went wrong !." }));
  };

  return (
    <>
      <div className="!sticky top-0 z-[1] w-full flex items-center bg-white px-28 py-6">
        <Flex justify="space-between" className="w-full">
          <Image
            src={logo}
            priority={true}
            alt="lowzoom-logo"
            height={"10%"}
            width={"20%"}
          />
          <Flex justify="flex-end" align="center" gap={24}>
            <ul className="flex justify-center gap-6 text-lg leading-relaxed">
              <li className="flex items-center leading-relaxed cursor-pointer">
                <CommonPopOver
                  content={<ServiceContent />}
                  onOpenChange={(e) => setServiceOpenChange(e)}
                >
                  <Flex align="center" gap={8}>
                    <h4>Services</h4>{" "}
                    <Icon
                      icon="fluent:chevron-down-24-filled"
                      className={`transform transition-transform duration-300 ${
                        serviceOpenChange ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </Flex>
                </CommonPopOver>
              </li>
              <li className="flex items-center leading-relaxed cursor-pointer">
                <CommonPopOver
                  content={<PartnersContent />}
                  onOpenChange={(e) => setPartnerOpenChange(e)}
                >
                  <Flex align="center" gap={8}>
                    <h4>Partner</h4>{" "}
                    <Icon
                      icon="fluent:chevron-down-24-filled"
                      className={`transform transition-transform duration-300 ${
                        partnerOpenChange ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </Flex>
                </CommonPopOver>
              </li>
              <li className="flex items-center leading-relaxed cursor-pointer">
                <CommonPopOver
                  content={<CompanyContent />}
                  onOpenChange={(e) => setCompanyOpenChange(e)}
                >
                  <Flex align="center" gap={8}>
                    <h4>Company</h4>{" "}
                    <Icon
                      icon="fluent:chevron-down-24-filled"
                      className={`transform transition-transform duration-300 ${
                        companyOpenChange ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </Flex>
                </CommonPopOver>
              </li>
            </ul>
            <Button
              shape="round"
              size="large"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </Flex>
        </Flex>
      </div>
      <div>
        <Flex
          vertical
          gap={48}
          className="my-1 bg-white h-full overflow-auto"
        >
          <Row className="p-4">
            <Col span={1} />
            <Col span={10}>
              <Flex vertical gap={24}>
                <Flex vertical gap={8}>
                  <h1 className="!text-6xl !font-bold">Trade Finance & </h1>
                  <h1 className="!text-6xl !font-bold">Working Capital</h1>
                  <h1 className="!text-6xl !font-bold">Solutions</h1>
                </Flex>
                <Flex>
                  <p className="!text-lg">
                    Empower trade and enhance working capital needs offering
                    instant cash without the need for collateral. We go beyond
                    financial services – we embody your company's enduring
                    vision.
                  </p>
                </Flex>
              </Flex>
            </Col>
            <Col span={2} />
            <Col
              span={10}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Flex className="enquiry-form-container" vertical align="center">
                <Form
                  layout="vertical"
                  form={form}
                  size="large"
                  style={{ width: "90%" }}
                  onFinish={handleFinish}
                >
                  <Form.Item
                    label="Full name"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "please enter your full name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Desigination"
                    name="designation"
                    rules={[
                      {
                        required: true,
                        message: "please enter your desigination",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: "please enter your phone number",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Company name"
                    name="companyName"
                    rules={[
                      {
                        required: true,
                        message: "please enter your company name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      type="primary"
                      style={{ width: "100%" }}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
                <Text type="secondary">
                  By registering you have read and agree to the
                </Text>
              </Flex>
            </Col>
            <Col span={1} />
          </Row>
          <Row className="w-full bg-custom-blue p-8 flex flex-col items-center h-auto gap-24">
            <h1 className="text-7xl text-white">Key Offerings</h1>
            <Flex className="w-full justify-center" gap={32}>
              <Flex
                vertical
                className="flex items-center border-solid bg-white rounded-md p-24"
                gap={24}
              >
                <h2 className="text-2xl text-custom-blue">Import Financing</h2>
                <h6>Learn More</h6>
              </Flex>
              <Flex
                vertical
                className=" flex items-center border-solid bg-white rounded-md p-24"
                gap={24}
              >
                <h2 className="text-2xl text-custom-blue">Import Financing</h2>
                <h6>Learn More</h6>
              </Flex>
              <Flex
                vertical
                className="flex items-center border-solid bg-white rounded-md p-24"
                gap={24}
              >
                <h2 className="text-2xl text-custom-blue">Import Financing</h2>
                <h6>Learn More</h6>
              </Flex>
            </Flex>
          </Row>
        </Flex>
      </div>
    </>
  );
};

export default Home;
