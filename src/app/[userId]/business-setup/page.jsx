"use client";
import { Button, Flex, Typography } from "antd";
import React from "react";
import logo from "../../../assets/lowZoom.png";
import home from "../../../assets/maskgroup.png";
import bubble from "../../../assets/bubbles.png";
import clock from "../../../assets/clock.png";
import cloud from "../../../assets/cloud.png";
import document from "../../../assets/document.png";
import graph from "../../../assets/graph.png";
import reverse from "../../../assets/reverse.png";
import rocket from "../../../assets/rocket.png";
import person from "../../../assets/edit-person.png";
import copy from "../../../assets/copy.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
const { Title, Text } = Typography;

const BusinessSetup = ({ params }) => {
  const router = useRouter();
  const { userId } = params;
  const handleCardClick = (type) => {
    if (type === "one") {
      router.push(`/${userId}/companyOnboarding`);
    }
  };
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
      <Flex gap={32} justify="center" className="my-2">
        <Flex
          vertical
          onClick={() => handleCardClick("one")}
          className="border border-blue-500 rounded-3xl py-8 px-12 cursor-pointer transform transition duration-300 hover:scale-101"
        >
          <Flex vertical gap={18}>
            <Flex>
              <Flex style={{ height: "80px", width: "100px" }}>
                <Image
                  src={home}
                  width={"100%"}
                  priority={true}
                  alt="lowzoom-logo"
                />
              </Flex>
              <Flex vertical>
                <Title level={2} >
                  Manage compliance for your{" "}
                </Title>
                <Title level={2} >
                  existing company
                </Title>
              </Flex>
            </Flex>
            <Flex vertical wrap>
              <Text className="text-xl font-medium">
                This AI platform is built to serve business with 100%
              </Text>
              <Text className="text-xl font-medium">
                efficiency to manage compliance and teams
              </Text>
            </Flex>
            <Flex vertical gap={8}>
              <Flex gap={6} align="center">
                <Flex style={{ height: "20px", width: "40px" }}>
                  <Image src={bubble} priority={true} alt="bubble" />
                </Flex>
                <Flex>
                  <Text className="text-lg">Compliance risk management.</Text>
                </Flex>
              </Flex>
              <Flex gap={6} align="center">
                <Flex style={{ height: "20px", width: "40px" }}>
                  <Image src={clock} priority={true} alt="clock" />
                </Flex>
                <Flex>
                  <Text className="text-lg">
                    Compliance monitoring framework.
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={6} align="center">
                <Flex style={{ height: "20px", width: "40px" }}>
                  <Image src={person} priority={true} alt="person" />
                </Flex>
                <Flex>
                  <Text className="text-lg">Outsourced and manage tasks. </Text>
                </Flex>
              </Flex>
              <Flex gap={6} align="center">
                <Flex style={{ height: "20px", width: "40px" }}>
                  <Image src={document} priority={true} alt="document" />
                </Flex>
                <Flex>
                  <Text className="text-lg">
                    Automated Alerts and Triggers.{" "}
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={6} align="center">
                <Flex style={{ height: "20px", width: "40px" }}>
                  <Image src={cloud} priority={true} alt="cloud" />
                </Flex>
                <Flex>
                  <Text className="text-lg">Secured Cloud Document. </Text>
                </Flex>
              </Flex>
              <Flex gap={6} align="center">
                <Flex style={{ height: "20px", width: "40px" }}>
                  <Image src={graph} priority={true} alt="graph" />
                </Flex>
                <Flex>
                  <Text className="text-lg">
                    Comprehensive Dashboards & Reports.
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={6} align="center">
                <Flex style={{ height: "20px", width: "40px" }}>
                  <Image src={reverse} priority={true} alt="reverse" />
                </Flex>
                <Flex>
                  <Text className="text-lg">Third Party API Integration.</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          vertical
          onClick={() => handleCardClick("two")}
          className="border border-blue-500 rounded-3xl py-8 px-12 cursor-pointer transform transition duration-300 hover:scale-101"
        >
          <Flex vertical gap={18}>
            <Flex>
              <Flex style={{ height: "80px", width: "100px" }}>
                <Image
                  src={rocket}
                  width={"100%"}
                  priority={true}
                  alt="lowzoom-logo"
                />
              </Flex>
              <Flex vertical>
                <Title level={2} >
                  Starting new business? Know
                </Title>
                <Title level={2} >
                  your business approvals
                </Title>
              </Flex>
            </Flex>
            <Flex vertical wrap>
              <Text className="text-lg font-medium">
                AI tool to identify business approvals and reduces the
              </Text>
              <Text className="text-lg font-medium">
                complexity to start businesses in India
              </Text>
            </Flex>
            <Flex vertical gap={8}>
              <Flex gap={6} align="center">
                <Flex style={{ height: "25px", width: "40px" }}>
                  <Image src={copy} priority={true} alt="bubble" />
                </Flex>
                <Flex>
                  <Text className="text-lg">Know your business approvals.</Text>
                </Flex>
              </Flex>
              <Flex gap={6} align="center">
                <Flex style={{ height: "20px", width: "40px" }}>
                  <Image src={bubble} priority={true} alt="clock" />
                </Flex>
                <Flex>
                  <Text className="text-lg">Compliance risk management.</Text>
                </Flex>
              </Flex>
              <Flex gap={6} align="center">
                <Flex style={{ height: "20px", width: "40px" }}>
                  <Image src={clock} priority={true} alt="person" />
                </Flex>
                <Flex>
                  <Text className="text-lg">
                    Compliance monitoring framework.{" "}
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={6} align="center">
                <Flex style={{ height: "20px", width: "40px" }}>
                  <Image src={person} priority={true} alt="document" />
                </Flex>
                <Flex>
                  <Text className="text-lg">Outsourced and manage tasks.</Text>
                </Flex>
              </Flex>
              <Flex gap={6} align="center">
                <Flex style={{ height: "20px", width: "40px" }}>
                  <Image src={document} priority={true} alt="cloud" />
                </Flex>
                <Flex>
                  <Text className="text-lg">
                    Automated Alerts and Triggers.{" "}
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={6} align="center">
                <Flex style={{ height: "20px", width: "40px" }}>
                  <Image src={cloud} priority={true} alt="graph" />
                </Flex>
                <Flex>
                  <Text className="text-lg">Secured Cloud Document.</Text>
                </Flex>
              </Flex>
              <Flex gap={6} align="center">
                <Flex style={{ height: "20px", width: "40px" }}>
                  <Image src={graph} priority={true} alt="graph" />
                </Flex>
                <Flex>
                  <Text className="text-lg">
                    Comprehensive Dashboards & Reports.
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={6} align="center">
                <Flex style={{ height: "20px", width: "40px" }}>
                  <Image src={reverse} priority={true} alt="reverse" />
                </Flex>
                <Flex>
                  <Text className="text-lg">Third Party API Integration.</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex className="w-full" justify="center">
        <Flex vertical align='center'>
          <Title level={3} >
            Need help?
          </Title>
          <Flex align='center' gap={4}>
            <Title level={4} >Call</Title>
            <Title level={4} style={{color:'#1677ff'}} >
              7558 640 644
            </Title>
          </Flex>
          <Text className="text-lg">(9.00 am to 6.00 pm IST, Mon-Fri)</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default BusinessSetup;
