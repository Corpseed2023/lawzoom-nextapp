"use client"
import React from "react"
import "./login.css"
import { Button, Checkbox, Flex, Form, Input, Typography } from "antd"
import logo from '../../assets/lowZoom.png'
import Image from "next/image"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { ICON_HEIGHT, ICON_WIDTH } from "../contants"
const { Title, Text } = Typography

const Login = () => {
  return (
    <Flex justify="center" align="center" className="login-container">
      <Flex vertical gap={24} className="login-sub-container" align="center">
        <Image src={logo} alt="lowzoom-logo" height={"10%"} width={"20%"} />
        <Title className="main-heading-text" level={1}>
          Sign in
        </Title>
        <Form size="large" style={{ width: "70%" }} layout="vertical">
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
            <Checkbox>Remember me.</Checkbox>{" "}
            <Link href={"/"}>Forget Password ?</Link>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  )
}

export default Login
