"use client";
import { Icon } from "@iconify/react";
import { Badge, Button, Card, Checkbox, Divider, Flex, Typography } from "antd";
import React from "react";
const { Title, Text } = Typography;

const Subscription = () => {
  return (
    <Flex vertical className="w-full px-24 py-8">
      <Flex>
        <Title level={2}>Plan</Title>
      </Flex>
      <Divider />

      <Flex gap={32} className="w-full h-2/3" justify='center'  >
        <Card hoverable className="[min-width:20%]">
          <Flex vertical gap={86} className='h-full' justify='space-between'>
            <Flex vertical gap={24}>
              <Title level={5}>Startup</Title>
              <Flex vertical gap={12}>
                <Flex gap={8} align="center">
                  <Icon
                    icon="fluent:checkmark-circle-16-regular"
                    width="16"
                    height="16"
                    color="#1677ff"
                  />
                  <Text>A Full CRM solution</Text>
                </Flex>
                <Flex gap={8} align="center">
                  <Icon
                    icon="fluent:checkmark-circle-16-regular"
                    width="16"
                    height="16"
                    color="#1677ff"
                  />
                  <Text>5 Workflows</Text>
                </Flex>
                <Flex gap={8} align="center">
                  <Icon
                    icon="fluent:checkmark-circle-16-regular"
                    width="16"
                    height="16"
                    color="#1677ff"
                  />
                  <Text>Power dailers</Text>
                </Flex>
                <Flex gap={8} align="center">
                  <Icon icon="fluent:info-16-regular" width="16" height="16" />
                  <Text>Usages limits</Text>
                </Flex>
              </Flex>
            </Flex>

            <Flex gap={24} vertical>
              <Flex vertical>
                <Title level={4}>$59</Title>
                <Text type="secondary">per user/mothly</Text>
                <Text type="secondary">billed mothly</Text>
              </Flex>
              <Button shape="round" className="w-full">
                Downgrade...
              </Button>
            </Flex>
          </Flex>
        </Card>
        {/* <Badge.Ribbon text="Most popular" className="[min-width:20%]" > */}
          <Card hoverable className="[min-width:20%]">
            <Flex vertical className='h-full' gap={86}>
              <Flex vertical gap={24}>
                <Title level={5}>Professionals</Title>
                <Flex vertical gap={12}>
                  <Flex gap={8} align="center">
                    <Icon
                      icon="fluent:checkmark-circle-16-regular"
                      width="16"
                      height="16"
                      color="#1677ff"
                    />
                    <Text> 5 custom activity type</Text>
                  </Flex>
                  <Flex gap={8} align="center">
                    <Icon
                      icon="fluent:checkmark-circle-16-regular"
                      width="16"
                      height="16"
                      color="#1677ff"
                    />
                    <Text>25 Workflows</Text>
                  </Flex>
                  <Flex align="center" gap={8}>
                    <Icon
                      icon="fluent:info-16-regular"
                      width="16"
                      height="16"
                    />{" "}
                    <Text>Usages limits</Text>
                  </Flex>
                  <Button type="text" variant="filled" shape="round" size="small">
                    & STARTUP FEATURES
                  </Button>
                </Flex>
              </Flex>

              <Flex gap={24} vertical>
                <Flex vertical>
                  <Title level={4}>$109</Title>
                  <Text type="secondary">per user/mothly</Text>
                  <Text type="secondary">billed mothly</Text>
                </Flex>
                <Button shape="round" className="w-full">
                  Downgrade...
                </Button>
              </Flex>
            </Flex>
          </Card>
        {/* </Badge.Ribbon> */}
        <Card hoverable className="[min-width:20%]">
          <Flex vertical className='h-full border-s-violet-50' gap={56}>
            <Flex vertical gap={24}>
              <Title level={5}>Enterprise</Title>
              <Flex vertical gap={12}>
                <Flex gap={8} align="center">
                  <Icon
                    icon="fluent:checkmark-circle-16-regular"
                    width="16"
                    height="16"
                    color="#1677ff"
                  />
                  <Text> 200 custom activity type</Text>
                </Flex>
                <Flex gap={8} align="center">
                  <Icon
                    icon="fluent:checkmark-circle-16-regular"
                    width="16"
                    height="16"
                    color="#1677ff"
                  />
                  <Text>100 Workflows</Text>
                </Flex>
                <Flex gap={8} align="center">
                  <Icon
                    icon="fluent:checkmark-circle-16-regular"
                    width="16"
                    height="16"
                    color="#1677ff"
                  />
                  <Text>Call coaching</Text>
                </Flex>
                <Flex gap={8} align="center">
                  <Icon
                    icon="fluent:checkmark-circle-16-regular"
                    width="16"
                    height="16"
                    color="#1677ff"
                  />
                  <Text>Custom roles</Text>
                </Flex>
                <Flex gap={8} align="center">
                  <Icon
                    icon="fluent:checkmark-circle-16-regular"
                    width="16"
                    height="16"
                    color="#1677ff"
                  />
                  <Text>User groups</Text>
                </Flex>
                <Flex align="center" gap={8}>
                  <Icon icon="fluent:info-16-regular" width="16" height="16" />{" "}
                  <Text>Usages limits</Text>
                </Flex>
                <Button type="text" variant="filled" shape="round" size="small">
                  & PROFESSIONAL FEATURES
                </Button>
              </Flex>
            </Flex>

            <Flex gap={24} vertical>
              <Flex vertical>
                <Title level={4}>$149</Title>
                <Text type="secondary">per user/mothly</Text>
                <Text type="secondary">billed mothly</Text>
              </Flex>
              <Button shape="round" className="w-full">
                Your current plan
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default Subscription;
