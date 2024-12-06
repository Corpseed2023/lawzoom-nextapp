"use client";
import React, { useState } from "react";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  message,
  Row,
  Select,
  Steps,
  theme,
  Typography,
} from "antd";
import logo from "../../../assets/lowZoom.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
const { Title, Text } = Typography;

const CompanyOnboarding = ({ userId }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const router = useRouter();

  const next = () => {
    // .then(() => {
    //   setCurrent(current + 1);
    // });
    // setCurrent(current + 1);
    form
      .validateFields()
      .then(() => {
        form.submit()
        setCurrent(current + 1);
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "First",
      content: (
        <Flex vertical className="w-full">
          <Row className="w-full">
            <Col span={11}>
              <Form.Item
                label="First name"
                name="firstName"
                rules={[
                  { required: true, message: "please enter your first name" },
                ]}
                hidden={current !== 0}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Last name"
                name="lastName"
                rules={[
                  { required: true, message: "please enter your first name" },
                ]}
                hidden={current !== 0}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row className="w-full">
            <Col span={11}>
              <Form.Item
                label="Designation"
                name="designationId"
                hidden={current !== 0}
                // rules={[
                //   { required: true, message: "please select your designation" },
                // ]}
              >
                <Select />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Business email id"
                name="businessEmailId"
                hidden={current !== 0}
                // rules={[
                //   {
                //     required: true,
                //     type: "email",
                //     message: "please enter youe business email id ",
                //   },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Flex>
      ),
    },
    {
      title: "Second",
      content: (
        <Flex vertical className="w-full">
          <Row className="w-full">
            <Col span={11}>
              <Form.Item
                label="Select type of company"
                name="companyTypeId"
                hidden={current !== 1}
                // rules={[
                //   {
                //     required: true,
                //     message: "please select your company type",
                //   },
                // ]}
              >
                <Select />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Company name"
                name="companyName"
                hidden={current !== 1}
                // rules={[{ required: true, message: "please enter company name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row className="w-full">
            <Col span={11}>
              <Form.Item
                label="Company pan number / CIN number"
                name="companyPinCode"
                hidden={current !== 1}
                // rules={[
                //   { required: true, message: "please select your designation" },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Company pan number"
                name="companyPanNumber"
                hidden={current !== 1}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row className="w-full">
            <Col span={11}>
              <Form.Item
                label="Country"
                name="country"
                hidden={current !== 1}
                // rules={[
                //   {
                //     required: true,
                //     message: "please select country ",
                //   },
                // ]}
              >
                <Select />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="State"
                name="companyStateId"
                hidden={current !== 1}
                // rules={[{ required: true, message: "please select your state" }]}
              >
                <Select />
              </Form.Item>
            </Col>
          </Row>
          <Row className="w-full">
            <Col span={11}>
              <Form.Item
                label="City"
                name="companyCityId"
                hidden={current !== 1}
                // rules={[
                //   {
                //     required: true,
                //     message: "please select city",
                //   },
                // ]}
              >
                <Select />
              </Form.Item>
            </Col>

            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Pin code"
                name="pinCode"
                hidden={current !== 1}
                // rules={[
                //   {
                //     required: true,
                //     message: "please enter pin code",
                //   },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Flex>
      ),
    },
    {
      title: "Last",
      content: (
        <Flex vertical className="w-full">
          <Row>
            <Col span={11}>
              <Form.Item
                label="Company turnover"
                name="companyTurnover"
                hidden={current !== 2}
                // rules={[
                //   {
                //     required: true,
                //     message: "please enter your company turnover",
                //   },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Located at"
                name="locatedAtId"
                hidden={current !== 2}
                // rules={[
                //   {
                //     required: true,
                //     message: "please select location",
                //   },
                // ]}
              >
                <Select />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Business activity"
                name="businessActivityId"
                hidden={current !== 2}
                // rules={[
                //   {
                //     required: true,
                //     message: "please select business activity",
                //   },
                // ]}
              >
                <Select />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Permanent employee in the company"
                name="permanentEmployee"
                hidden={current !== 2}
                // rules={[
                //   {
                //     required: true,
                //     message: "please enter the number of permanent employee",
                //   },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Contract employee in the company"
                name="contractEmployee"
                hidden={current !== 2}
                // rules={[
                //   {
                //     required: true,
                //     message: "please enter the number of contract employee",
                //   },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Operating unit address"
                name="operationUnitAddress"
                hidden={current !== 2}
                // rules={[
                //   { required: true, message: "please enter your unit address" },
                // ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="GST number"
                name="companyRegistrationNumber"
                hidden={current !== 2}
                // rules={[{ required: true, message: "please enter GST number" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Flex>
      ),
    },
  ];

  const [data, setData] = useState({});

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    margin: "16px 4px 0px 4px",
  };

  const handleFinish = (values) => {
    setData((prev) => ({ ...prev, ...values }));
    console.log("valuessssss", values);
    message.success("Processing complete!");
    // router.push(`${userId}/`);
  };

  console.log("sjxchgASDGVAISDGHLI", data);

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
        <Button type="link" size="large" className="text-xl">
          Logout
        </Button>
      </Flex>
      <Flex className="w-full px-24">
        <Steps current={current} items={items} />
      </Flex>
      <div className="m-2 w-99% px-24 py-4" style={contentStyle}>
        <Form
          form={form}
          layout="vertical"
          size="large"
          onFinish={handleFinish}
        >
          {steps[current].content}
        </Form>
      </div>
      <Flex justify={"space-between"} className="w-full px-12 py-6 mt-6">
        <div style={{ display: current === 0 ? "" : "none" }}></div>
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
        <Flex vertical align="center">
          <Title level={3} style={{ margin: 0 }} className="text-xl">
            Need help?
          </Title>
          <Flex align="center" gap={4}>
            <Title level={4} style={{ margin: 0 }}>
              Call
            </Title>
            <Title level={4} style={{ margin: 0, color: "#1677ff" }}>
              7558 640 644
            </Title>
          </Flex>
          <Text className="text-lg">(9.00 am to 6.00 PM IST, Mon-Fri)</Text>
        </Flex>
        <Flex>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => form.submit()}>
              Done
            </Button>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default CompanyOnboarding;
