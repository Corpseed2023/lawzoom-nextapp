"use client";
import React, { useState } from "react";
import "./login.css";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  message,
  notification,
  Typography,
} from "antd";
import logo from "../../assets/lowZoom.png";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { ICON_HEIGHT, ICON_WIDTH } from "../constants";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "../redux-toolkit/slices/authSlice";
const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (resp) => {
    api[resp.status]({
      message: resp.message,
    });
  };

  const [loading, setLoading] = useState("");

  const handleSubmitUserDetail = (values) => {
    setLoading("pending");
    dispatch(loginUser(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          openNotification({
            status: "success",
            message: "User logged in successfully !.",
          });
          router.push(`/${resp?.payload?.body?.id}/company/dashboard`);
          setLoading("success");
        } else {
          openNotification({
            status: "error",
            message: "Something went wrong !.",
          });
          form.setFields([
            {
              name: "username",
              errors: ["Invalid email id"],
            },
            {
              name: "password",
              errors: ["Invalid password"],
            },
          ]);
          setLoading("rejected");
        }
      })
      .catch(() => {
        openNotification({
          status: "error",
          message: "Something went wrong !.",
        });
        form.setFields([
          {
            name: "username",
            errors: ["Invalid email id"],
          },
          {
            name: "password",
            errors: ["Invalid password"],
          },
        ]);
        setLoading("rejected");
      });
  };

  return (
    <Flex justify="center" align="center" className="login-container">
      <Flex vertical gap={24} className="login-sub-container" align="center">
        <Image
          src={logo}
          priority={true}
          alt="lowzoom-logo"
          height={"10%"}
          width={"20%"}
        />
        <Title className="main-heading-text" level={1}>
          Sign in
        </Title>
        <Form
          size="large"
          style={{ width: "70%" }}
          layout="vertical"
          onFinish={handleSubmitUserDetail}
          form={form}
        >
          <Form.Item
            label="Email"
            name="username"
            rules={[{ required: true, message: "Please enter your email id" }]}
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
          <Form.Item
            label="Password (min 8 character)"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
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
          <Form.Item valuePropName="checked">
            <Flex gap={4}>
              <Checkbox>Remember me.</Checkbox>{" "}
              <Link href={"/"} className="text-blue-700">
                Forget Password ?
              </Link>
              <Link href={"/signup-otp"} className="text-blue-700">
                Sign up
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
      {contextHolder}
    </Flex>
  );
};

export default Login;
