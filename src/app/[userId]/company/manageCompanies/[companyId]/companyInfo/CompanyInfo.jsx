"use client";
import { Icon } from "@iconify/react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Input,
  Popconfirm,
  Row,
  Typography,
} from "antd";
import React from "react";
const { Text, Title } = Typography;

const CompanyInfo = () => {
  return (
    <div className="h-full w-full p-4">
      <Flex className="w-full" justify="space-between">
        <Flex align="center" gap={8}>
          <Avatar
            size={42}
            src="https://img.freepik.com/premium-vector/minimalist-type-creative-business-logo-template_1283348-23026.jpg?semt=ais_hybrid"
          ></Avatar>
          <Title level={5}>GPAY Pvt Ltd.</Title>
        </Flex>
        <Flex>
          <Button type="text" size="small">
            <Icon icon="fluent:edit-24-regular" height={16} width={16} />
            Edit
          </Button>
        </Flex>
      </Flex>
      <Divider style={{ margin: 8 }} />
      <Flex vertical gap={8}>
        <Row>
          <Col span={8}>
            <Text>Private Limaited company</Text>
          </Col>
          <Col span={8} />
          <Col span={8}>
            <Flex gap={8} align="center">
              <Text type="secondary">Registration ID (CIN)</Text>
              <Text>:</Text>
              <Text>U74999UP2018PTC221873</Text>
            </Flex>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Flex align="center" gap={8}>
              <Text type="secondary">Formation state</Text>
              <Text>:</Text>
              <Text>Haryana</Text>
            </Flex>
          </Col>
          <Col span={8} />
          <Col span={8}>
            <Flex gap={8} align="center">
              <Text type="secondary">Formation date</Text>
              <Text>:</Text>
              <Text>Oct 1, 2021</Text>
            </Flex>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Flex align="center" gap={8}>
              <Text>Operation units</Text>
              <Text>:</Text>
              <Text>5 units</Text>
            </Flex>
          </Col>
          <Col span={8}>
            <Flex align="center" gap={8}>
              <Text>Number of states operating</Text>
              <Text>:</Text>
              <Text>2 states</Text>
            </Flex>
          </Col>
          <Col span={8}>
            <Flex gap={8} align="center">
              <Text>GST Registraion</Text>
              <Text>:</Text>
              <Text>2 states</Text>
            </Flex>
          </Col>
        </Row>
      </Flex>
      <Flex
        vertical
        gap={16}
        className="w-full p-4 mt-8 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] rounded-md"
      >
        <Flex className="w-full" justify="space-between" align="center">
          <Title level={4}>Company units</Title>
          <Button type="primary">
            <Icon icon="fluent:add-24-regular" width="16" height="16" />
            Add company units
          </Button>
        </Flex>
        <Flex className="w-full">
          <Input
            prefix={
              <Icon icon="fluent:search-24-regular" width="24" height="24" />
            }
            placeholder="Search"
          />
        </Flex>
        <Flex vertical gap={24} className="[max-height:48vh] overflow-auto">
          {Array.from({ length: 4 })?.map((item) => {
            return (
              <Card className="w-full">
                <Flex className="w-full" gap={8} justify="flex-end">
                  <Popconfirm
                    title="Delete the company unit"
                    description="Are you sure to delete this company unit"
                  >
                    <Button type="text" size="small" danger>
                      <Icon
                        icon="fluent:delete-24-regular"
                        height={16}
                        width={16}
                      />
                    </Button>
                  </Popconfirm>
                  <Button type="text" size="small">
                    <Icon
                      icon="fluent:edit-24-regular"
                      height={16}
                      width={16}
                    />
                  </Button>
                </Flex>
                <Flex vertical gap={8}>
                  <Row>
                    <Col span={8}>
                      <Flex gap={4}>
                        <Text type="secondary">GST number</Text>
                        <Text>:</Text>
                        <Text>09AAHCC4679J1ZC</Text>
                      </Flex>
                    </Col>
                    <Col span={8} />
                    <Col span={8}>
                      <Flex gap={4} align="center">
                        <Text type="secondary">City</Text>
                        <Text>:</Text>
                        <Text>Mumbai</Text>
                      </Flex>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <Flex align="center" gap={4}>
                        <Text type="secondary">Permanent employees</Text>
                        <Text>:</Text>
                        <Text>50</Text>
                      </Flex>
                    </Col>
                    <Col span={8} />
                    <Col span={8}>
                      <Flex gap={4} align="center">
                        <Text type="secondary">business activity</Text>
                        <Text>:</Text>
                        <Text>Food Manufacturing Unit</Text>
                      </Flex>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <Flex align="center" gap={4}>
                        <Text type="secondary">Located at</Text>
                        <Text>:</Text>
                        <Text>SEZ</Text>
                      </Flex>
                    </Col>
                    <Col span={8} />
                    <Col span={8}>
                      <Flex align="center" gap={4}>
                        <Text type="secondary">State</Text>
                        <Text>:</Text>
                        <Text>Maharashtra</Text>
                      </Flex>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Flex gap={4} align="center">
                        <Text>Operating Unit address</Text>
                        <Text>:</Text>
                        <Text>
                          A-43, SECTOR-63 NOIDA NOIDA Gautam Buddha Nagar UP
                          201301 IN
                        </Text>
                      </Flex>
                    </Col>
                  </Row>
                </Flex>
              </Card>
            );
          })}
        </Flex>
      </Flex>
    </div>
  );
};

export default CompanyInfo;
