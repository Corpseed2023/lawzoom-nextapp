"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Col, Flex, Layout, Row, theme } from "antd";
import logo from "../assets/lowZoom.png";
import Link from "next/link";
import CommonPopOver from "./common/CommonPopOver";
import ServiceContent from "./common/ServiceContent";
import PartnersContent from "./common/PartnersContent";
import CompanyContent from "./common/CompanyContent";
import { Icon } from "@iconify/react";
import { useState } from "react";
const { Header, Content, Footer } = Layout;

const Home = () => {
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [serviceOpenChange, setServiceOpenChange] = useState(false);
  const [partnerOpenChange, setPartnerOpenChange] = useState(false);
  const [companyOpenChange, setCompanyOpenChange] = useState(false);
  return (
    <Layout className="bg-white">
      <Header className="sticky top-0 z-[1] w-full flex items-center bg-white">
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
      </Header>
      <Content className="my-1 p-14 bg-white">
        <Row>
          <Col span={1}/>
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
                  financial services – we embody your company's enduring vision.
                </p>
              </Flex>
            </Flex>
          </Col>
          <Col span={2} />
          <Col span={10}></Col>
          <Col span={1}/>
        </Row>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Home;
