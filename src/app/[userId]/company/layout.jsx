"use client";
import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Image from "next/image";
import logo from "../../../assets/lowzoom.png";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { ICON_HEIGHT, ICON_WIDTH } from "@/app/contants";
const { Content, Sider } = Layout;

const CompanyLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: "dashboard",
      icon: (
        <Icon
          icon="fluent:top-speed-24-regular"
          height={ICON_HEIGHT}
          width={ICON_WIDTH}
        />
      ),
      label: <Link href={"/1/company/dashboard"}>Dashboard</Link>,
    },
    {
      key: "manageCompanies",
      icon: (
        <Icon
          icon="fluent:building-desktop-24-regular"
          height={ICON_HEIGHT}
          width={ICON_WIDTH}
        />
      ),
      label: <Link href={"/1/company/manageCompanies"}>Manage companies</Link>,
    },
    {
      key: "compliances",
      icon: (
        <Icon
          icon="fluent:notepad-person-24-regular"
          height={ICON_HEIGHT}
          width={ICON_WIDTH}
        />
      ),
      label: "Compliances",
      children: [
        {
          key: "taskManagement",
          label: (
            <Link href={"/1/company/compliances/taskManagement"}>
              Task management
            </Link>
          ),
        },
        {
          key: "progress",
          label: <Link href={"/1/company/compliances/progress"}>Progress</Link>,
        },
        {
          key: "overDue",
          label: <Link href={"/1/company/compliances/overDue"}>Over due</Link>,
        },
        {
          key: "notStarted",
          label: (
            <Link href={"/1/company/compliances/notStarted"}>Not started</Link>
          ),
        },
        {
          key: "critical",
          label: <Link href={"/1/company/compliances/critical"}>Critical</Link>,
        },
        {
          key: "completed",
          label: (
            <Link href={"/1/company/compliances/completed"}>Completed</Link>
          ),
        },
      ],
    },
    {
      key: "vendorTask",
      icon: (
        <Icon
          icon="fluent:chart-person-24-regular"
          height={ICON_HEIGHT}
          width={ICON_WIDTH}
        />
      ),
      label: <Link href={"/1/company/vendorTask"}>Vendor task</Link>,
    },
    {
      key: "Accounts",
      icon: (
        <Icon
          icon="fluent:inprivate-account-24-regular"
          height={ICON_HEIGHT}
          width={ICON_WIDTH}
        />
      ),
      label: <Link href={"/1/company/accounts"}>Accounts</Link>,
    },
    {
      key: "setting",
      icon: (
        <Icon
          icon="fluent:settings-24-regular"
          height={ICON_HEIGHT}
          width={ICON_WIDTH}
        />
      ),
      label: "Setting",
      children: [
        {
          key: "stateManagements",
          label: (
            <Link href={"/1/company/settings/stateManagements"}>
              State mangements
            </Link>
          ),
        },
      ],
    },
  ];

  return (
    <Layout>
      <Layout style={{ height: "100vh" }}>
        <Sider
          width={200}
          collapsible
          style={{
            background: colorBgContainer,
            height: "90vh",
          }}
        >
          <Image
            src={logo}
            priority={true}
            alt="lowzoom-logo"
            height={"8%"}
            width={"15%"}
            style={{ margin: "24px 0px" }}
          />
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items}
            inlineIndent={18}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            items={[
              {
                title: "Home",
              },
              {
                title: "List",
              },
              {
                title: "App",
              },
            ]}
            style={{
              margin: "16px 0",
            }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CompanyLayout;
