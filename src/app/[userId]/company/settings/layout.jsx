"use client";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { ICON_HEIGHT, ICON_WIDTH } from "@/app/constants";
import { useParams } from "next/navigation";
const { Content, Sider } = Layout;

const SettingMangements = ({ children, params }) => {
  const { userId } = useParams();
  console.log('kxhbvcjsvhdcg',)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      key: "countries",
      label: (
        <Link href={`/${userId}/company/settings/countries`}>Countries</Link>
      ),
    },
    {
      key: "department",
      label: (
        <Link href={`/${userId}/company/settings/department`}>Department</Link>
      ),
    },
    {
      key: "industries",
      label: (
        <Link href={`/${userId}/company/settings/industries`}>Industries</Link>
      ),
    },
    {
      key: "companyType",
      label: (
        <Link href={`/${userId}/company/settings/companyType`}>
          Company type
        </Link>
      ),
    },
    {
      key: "privileges",
      label: (
        <Link href={`/${userId}/company/settings/privileges`}>Privileges</Link>
      ),
    },
    {
      key: "locatedAt",
      label: (
        <Link href={`/${userId}/company/settings/locatedAt`}>Located at</Link>
      ),
    },
    {
      key: "resourceType",
      label: (
        <Link href={`/${userId}/company/settings/resourceType`}>
          Resource type
        </Link>
      ),
    },
    {
      key: "roles",
      label: <Link href={`/${userId}/company/settings/roles`}>Roles</Link>,
    },
    {
      key: "status",
      label: <Link href={`/${userId}/company/settings/status`}>Status</Link>,
    },
    {
      key: "subscription",
      label: <Link href={`/${userId}/company/settings/subscription`}>Subscription</Link>,
    },
  ];
  return (
    <Layout style={{ padding: "0px", height: "90vh", borderRadius: 6 }}>
      <Layout style={{ height: "100%", borderRadius: 6 }}>
        <Sider
          className="setting-sidebar"
          style={{
            background: colorBgContainer,
            height: "100%",
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items}
            inlineIndent={10}
          />
        </Sider>
        <Layout>
          <Content style={{ height: "100%", padding: 12 }}>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SettingMangements;
