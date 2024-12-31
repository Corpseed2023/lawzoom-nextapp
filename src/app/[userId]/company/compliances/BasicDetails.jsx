"use client";
import { Icon } from "@iconify/react";
import { Avatar, Button, Flex, Input, Tag, Typography } from "antd";
import React from "react";
const { Title, Text } = Typography;

const BasicDetails = () => {
  return (
    <>
      <Flex vertical gap={18}>
        <Flex align="center" gap={8}>
          <Icon
            icon="fluent:apps-list-24-regular"
            width="16"
            height="16"
            color="blue"
          />
          <Title level={5}>
            Register and other records to be maintained by the contractor{" "}
          </Title>
        </Flex>
        <Flex vertical gap={12}>
          <Text>Description</Text>
          <Input.TextArea />
        </Flex>
        <Flex justify="flex-end">
          <Button type="primary">Mark completed</Button>
        </Flex>
        <Flex>
          <Button size="large" type="link">
            <Icon icon="fluent:add-24-regular" width="24" height="24" /> Add new
            milestone
          </Button>
        </Flex>
        <Flex vertical>
          <Text>Activity</Text>
          <Flex justify="space-between" align="center">
            <Flex gap={8} align="center">
              <Text>Show</Text> <Text>:</Text>
              <Tag className="text-xs">All</Tag>{" "}
              <Tag className="text-xs">Comment</Tag>{" "}
              <Tag className="text-xs">History</Tag>
            </Flex>
            <Flex gap={8} align="center">
              <Text>Newest first</Text>
              <Icon
                icon="fluent:branch-compare-24-regular"
                width="24"
                height="24"
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex align="center" gap={8}>
          <Avatar size="large">AK</Avatar>
          <Input size="large" />
        </Flex>
        <div className="[height:20vh]"></div>
        <Flex gap={8} justify="flex-end">
          <Button type="primary">Next</Button>
          <Button>Cancel</Button>
          <Button>Back</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default BasicDetails;
