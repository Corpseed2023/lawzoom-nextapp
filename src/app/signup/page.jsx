"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  notification,
  Row,
  Select,
  Typography,
} from "antd";
import logo from "../../assets/lowZoom.png";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { ICON_HEIGHT, ICON_WIDTH } from "../contants";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../login/login.css";
import { signupUser } from "../redux-toolkit/slices/authSlice";
import { getAllRoles } from "../redux-toolkit/slices/commonSlice";
const { Title, Text } = Typography;

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const allRoles = useSelector((state) => state.common.allRoles);
  const otpDetail = useSelector((state) => state.auth.otpResponse);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(otpDetail)?.length > 0) {
      form.setFieldsValue({
        name: otpDetail?.name,
        username: otpDetail?.email,
      });
    }
  }, [otpDetail, form]);

  const handleSubmitUserDetail = (values) => {
    setLoading("pending");
    dispatch(signupUser(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "User signup successfully !." });
          router.push(`/login`);
          setLoading("success");
        } else {
          notification.error({ message: "Something went wrong !." });
          setLoading("rejected");
        }
      })
      .catch(() => {
        notification.error({ message: "Something went wrong !." });
        setLoading("rejected");
      });
  };
  return (
    <Flex justify="center" align="center" className="login-container">
      <Flex
        vertical
        gap={12}
        className="w-3/5 shadow-form-shadow p-12"
        align="center"
      >
        <Image
          src={logo}
          priority={true}
          alt="lowzoom-logo"
          height={"10%"}
          width={"20%"}
        />
        <Title className="main-heading-text" level={1}>
          Sign up
        </Title>
        <Flex className="w-full max-h-80-vh" justify="center">
          <Form
            style={{ width: "80%" }}
            size="large"
            layout="vertical"
            form={form}
            onFinish={handleSubmitUserDetail}
          >
            <Row gutter={16}>
              <Col span={12}>
                {" "}
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your email id" },
                  ]}
                >
                  <Input
                    placeholder="your name"
                    prefix={
                      <Icon
                        icon="fluent:person-24-regular"
                        height={ICON_HEIGHT}
                        width={ICON_WIDTH}
                      />
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                {" "}
                <Form.Item
                  label="Email"
                  name="username"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter your email id",
                    },
                  ]}
                >
                  <Input
                    placeholder="example@email.com"
                    prefix={
                      <Icon
                        icon="fluent:mail-24-regular"
                        height={ICON_HEIGHT}
                        width={ICON_WIDTH}
                      />
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                {" "}
                <Form.Item
                  label="Select roles"
                  name="roleList"
                  rules={[{ required: true, message: "please select roles" }]}
                >
                  <Select
                    mode="multiple"
                    placeholder='Select role'
                    options={
                      allRoles?.map((item) => ({
                        label: item?.role,
                        value: item?.role,
                      })) || []
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Set password (min 8 character)"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password
                    placeholder="password"
                    prefix={
                      <Icon
                        icon="fluent:lock-closed-24-regular"
                        height={ICON_HEIGHT}
                        width={ICON_WIDTH}
                      />
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                {" "}
                <Form.Item
                  label="OTP"
                  name="otp"
                  rules={[{ required: true, message: "please enter otp" }]}
                >
                  <Input.OTP />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item valuePropName="checked">
              <Flex gap={4}>
                <Checkbox>Remember me.</Checkbox>{" "}
                <Link href={"/"} className="text-blue-700">
                  Forget Password ?
                </Link>
                <Link href={"/login"} className="text-blue-700">
                  login
                </Link>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading === "pending" ? true : false}
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Signup;
