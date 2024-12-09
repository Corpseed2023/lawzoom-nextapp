"use client";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { ICON_HEIGHT, ICON_WIDTH } from "@/app/constants";
const { Content, Sider } = Layout;

const SettingMangements = ({ children, params }) => {
  const { userId } = params;
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
      key: "desiginations",
      label: (
        <Link href={`/${userId}/company/settings/desiginations`}>
          Desiginations
        </Link>
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
      key: "locatedAt",
      label: (
        <Link href={`/${userId}/company/settings/locatedAt`}>
          Locations
        </Link>
      ),
    },
  ];
  return (
    <Layout style={{ padding: "0px", height: "90vh", borderRadius: 6 }}>
      <Layout style={{ height: "100%", borderRadius: 6 }}>
        <Sider
          // width={150}
          className="setting-sidebar"
          collapsible
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
          <Content style={{ height: "100%", padding: "0px 12px" }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SettingMangements;
