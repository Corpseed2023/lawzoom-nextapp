"use client";
import React, { useState } from "react";
import '../login/login.css'
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  notification,
  Typography,
} from "antd";
import logo from "../../assets/lowZoom.png";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { ICON_HEIGHT, ICON_WIDTH } from "../contants";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { genrateOpt } from "../redux-toolkit/slices/authSlice";
const { Title, Text } = Typography;

const SignupOtp = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState("");

  const handleSubmitUserDetail = (values) => {
    setLoading("pending");
    dispatch(genrateOpt(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "OTP send successfully to your email id !.",
          });
          router.push(`/signup`);
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
      <Flex vertical gap={24} className="login-sub-container" align="center">
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
        <Form
          size="large"
          style={{ width: "70%" }}
          layout="vertical"
          onFinish={handleSubmitUserDetail}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your email id" }]}
          >
            <Input
              placeholder="example@email.com"
              prefix={
                <Icon
                  icon="fluent:person-24-regular"
                  height={ICON_HEIGHT}
                  width={ICON_WIDTH}
                />
              }
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
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

          <Form.Item valuePropName="checked">
            <Flex gap={4}>
              <Checkbox>Remember me.</Checkbox>{" "}
              <Text>Already have an account ?</Text>
              <Link href={"/login"} className="text-blue-700">
                Login
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
              Genrate otp
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
};

export default SignupOtp;
