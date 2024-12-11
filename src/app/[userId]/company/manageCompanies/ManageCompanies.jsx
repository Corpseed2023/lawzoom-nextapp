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
const { Title, Text } = Typography;

const ManageCompanies = () => {
  return (
    <div className="p-4">
      <Flex>
        <Title level={2}>Manage companies</Title>
      </Flex>
      <Flex justify="space-between" className="w-full my-4">
        <Button size="large" type="text" variant="filled">
          <Icon icon="fluent:add-24-regular" width="24" height="24" />
          Add new company
        </Button>
        <Button size="large" type="text" variant="filled">
          <Icon
            icon="fluent:arrow-download-24-regular"
            width="24"
            height="24"
          />
          Export
        </Button>
      </Flex>
      <Divider style={{ margin: 6 }} />
      <Flex className="w-full my-4">
        <Input
          size="large"
          className="w-full"
          placeholder="Search for companies"
          prefix={
            <Icon icon="fluent:search-24-regular" width="24" height="24" />
          }
        />
      </Flex>
      <Flex className="w-full my-4">
        <Card
          hoverable
          title={
            <Flex align="center" gap={8}>
              <Avatar
                size={72}
                src="https://img.freepik.com/premium-vector/minimalist-type-creative-business-logo-template_1283348-23026.jpg?semt=ais_hybrid"
              ></Avatar>
              <Title level={5}>GPAY Pvt Ltd.</Title>
            </Flex>
          }
          //   loading={true}
          className="w-full"
          extra={
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
                  Delete
                </Button>
              </Popconfirm>
              <Button type="text" size="small">
                <Icon icon="fluent:edit-24-regular" height={16} width={16} />
                Edit
              </Button>
            </Flex>
          }
        >
          <Flex vertical gap={16}>
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
        </Card>
      </Flex>
    </div>
  );
};

export default ManageCompanies;
