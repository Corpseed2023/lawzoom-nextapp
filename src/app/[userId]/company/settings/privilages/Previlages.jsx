"use client";
import React, { useEffect, useState } from "react";
import VirtualList from "rc-virtual-list";
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  List,
  message,
  Modal,
  Typography,
} from "antd";
import { Icon } from "@iconify/react";
const { Text, Title } = Typography;

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 580;
const Privilages = () => {
  const [data, setData] = useState([]);

  const appendData = (showMessage = true) => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        showMessage &&
          message.success(`${body.results.length} more items loaded!`);
      });
  };
  useEffect(() => {
    appendData(false);
  }, []);

  const onScroll = (e) => {
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          ContainerHeight
      ) <= 1
    ) {
      appendData();
    }
  };
  return (
    <>
      <Flex className="w-full mb-2" justify="space-between" align="center">
        <Title level={4}>Users privilages</Title>
        <Button type="text" size="large" className="text [color:#1677ff]">
          <Icon icon="fluent:add-24-regular" width="24" height="24" />
          Add privilages for users
        </Button>
      </Flex>
      <Divider style={{ margin: 6 }} />
      <Flex className="w-full my-2">
        <Input
          placeholder="Search for users"
          prefix={
            <Icon icon="fluent:search-24-regular" width="24" height="24" />
          }
        />
      </Flex>

      <List>
        <VirtualList
          data={data}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="email"
          onScroll={onScroll}
          style={{ padding: "8px" }}
        >
          {(item) => (
            <List.Item
              key={item.email}
              style={{ width: "95%" }}
              actions={[
                <Button size="small" type="text" danger>
                  <Icon
                    icon="fluent:delete-24-regular"
                    height={16}
                    width={16}
                  />
                </Button>,
                <Button size="small" type="text">
                  <Icon
                    icon="fluent:checkmark-24-regular"
                    color="#1677ff"
                    height={16}
                    width={16}
                  />
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <Flex align="center" gap={8}>
                <Checkbox>Read</Checkbox>
                <Checkbox>Create</Checkbox>
                <Checkbox>Delete</Checkbox>
                <Checkbox>Update</Checkbox>
                <Checkbox>Export</Checkbox>
                <Checkbox>Share</Checkbox>
              </Flex>
            </List.Item>
          )}
        </VirtualList>
      </List>
      <Modal>

      </Modal>
    </>
  );
};

export default Privilages;
