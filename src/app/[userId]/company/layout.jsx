"use client";
import React from "react";
import { Breadcrumb, Button, Flex, Layout, Menu, theme } from "antd";
import Image from "next/image";
import logo from "../../../assets/lowzoom.png";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { ICON_HEIGHT, ICON_WIDTH } from "@/app/constants";
import { useParams, useRouter } from "next/navigation";
import { logout } from "@/app/redux-toolkit/slices/authSlice";
import { useDispatch } from "react-redux";
const { Content, Sider } = Layout;

const CompanyLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const params = useParams();
  const dispatch=useDispatch()
  const userId = params.userId; 
  
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
      label: <Link href={`/${userId}/company/dashboard`}>Dashboard</Link>,
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
      label: (
        <Link href={`/${userId}/company/manageCompanies`}>
          Manage companies
        </Link>
      ),
    },
    {
      key: "businessUnit",
      icon: (
        <Icon
          icon="fluent:clipboard-text-edit-24-regular"
          height={ICON_HEIGHT}
          width={ICON_WIDTH}
        />
      ),
      label: <Link href={`/${userId}/company/businessUnit`}>Set Compliance map</Link>,
    },
    {
      key: "manageCompliances",
      icon: (
        <Icon
          icon="fluent:notepad-person-24-regular"
          height={ICON_HEIGHT}
          width={ICON_WIDTH}
        />
      ),
      label: "Manage compliances",
      children: [
        {
          key: "taskManagement",
          label: (
            <Link href={`/${userId}/company/manageCompliances/taskManagement`}>
              Task management
            </Link>
          ),
        },
        // {
        //   key: "progress",
        //   label: (
        //     <Link href={`/${userId}/company/compliances/progress`}>
        //       Progress
        //     </Link>
        //   ),
        // },
        // {
        //   key: "overDue",
        //   label: (
        //     <Link href={`/${userId}/company/compliances/overDue`}>
        //       Over due
        //     </Link>
        //   ),
        // },
        // {
        //   key: "notStarted",
        //   label: (
        //     <Link href={`/${userId}/company/compliances/notStarted`}>
        //       Not started
        //     </Link>
        //   ),
        // },
        // {
        //   key: "critical",
        //   label: (
        //     <Link href={`/${userId}/company/compliances/critical`}>
        //       Critical
        //     </Link>
        //   ),
        // },
        // {
        //   key: "completed",
        //   label: (
        //     <Link href={`/${userId}/company/compliances/completed`}>
        //       Completed
        //     </Link>
        //   ),
        // },
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
      label: <Link href={`/${userId}/company/vendorTask`}>Vendor task</Link>,
    },
    {
      key: "employees",
      icon: (
        <Icon
          icon="fluent:people-community-24-regular"
          height={ICON_HEIGHT}
          width={ICON_WIDTH}
        />
      ),
      label: <Link href={`/${userId}/company/employees`}>Employees</Link>,
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
      label: <Link href={`/${userId}/company/accounts`}>Accounts</Link>,
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
      label: (
        <Link href={`/${userId}/company/settings/countries`}>Setting</Link>
      ),
    },
  ];

  return (
    <Layout>
      <Layout style={{ height: "100vh" }}>
        <Sider
          width={220}
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
            padding: "0 8px 8px",
          }}
        >
          <Flex justify="space-between" align="center">
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
            <Button type="text" size="large" onClick={()=>dispatch(logout())}>
              <Icon icon="fluent:sign-out-24-regular" width="22" height="22" />{" "}
              Logout
            </Button>
          </Flex>
          <Content
            style={{
              padding: 12,
              margin: 0,
              height: "100%",
              background: colorBgContainer,
              borderRadius: 6,
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
