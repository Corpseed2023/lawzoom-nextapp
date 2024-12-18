"use client";
import { Icon } from "@iconify/react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Flex,
  Input,
  List,
  Popconfirm,
  Row,
  Skeleton,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import AddGstForm from "./AddGstForm";
import { useRouter } from "next/navigation";
import { getAllCountries } from "@/app/redux-toolkit/slices/commonSlice";
import { useDispatch } from "react-redux";
import BusinessUnits from "./BusinessUnits";
import { getAllLocatedAt } from "@/app/redux-toolkit/slices/settingSlice";
const { Text, Title } = Typography;

const CompanyInfo = ({ companyId, data, companyDetail,userId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [gstData, setGstData] = useState(null);

  const refreshPage=()=>{
    router.refresh()
  }

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllLocatedAt());
  }, [dispatch]);

  return (
    <div className="h-full w-full p-4">
      <Flex className="w-full" justify="space-between">
        <Flex align="center" gap={8}>
          <Avatar
            size={42}
            src="https://img.freepik.com/premium-vector/minimalist-type-creative-business-logo-template_1283348-23026.jpg?semt=ais_hybrid"
          ></Avatar>
          <Title level={5}>{companyDetail?.companyName}</Title>
        </Flex>
        <Flex gap={4}>
          <AddGstForm companyId={companyId} />
        </Flex>
      </Flex>
      <Divider style={{ margin: 8 }} />
      <Flex vertical gap={8}>
        <Row>
          <Col span={8}>
            <Text>{companyDetail?.companyType}</Text>
          </Col>
          <Col span={8} />
          <Col span={8}>
            <Flex gap={8} align="center">
              <Text type="secondary">Registration ID (CIN)</Text>
              <Text>:</Text>
              <Text>{companyDetail?.companyCINNumber}</Text>
            </Flex>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Flex align="center" gap={8}>
              <Text type="secondary">Formation state</Text>
              <Text>:</Text>
              <Text>{companyDetail?.companyState}</Text>
            </Flex>
          </Col>
          <Col span={8} />
          <Col span={8}>
            <Flex gap={8} align="center">
              <Text type="secondary">Formation date</Text>
              <Text>:</Text>
              <Text>{companyDetail?.companyRegistrationDate}</Text>
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
              <Text>GST Registration</Text>
              <Text>:</Text>
              <Text>2 states</Text>
            </Flex>
          </Col>
        </Row>
      </Flex>
      <Divider />
      <Flex vertical gap={8} className="w-full">
        <Title level={4}>GST details</Title>
        <Input
          prefix={
            <Icon icon="fluent:search-24-regular" width="24" height="24" />
          }
          placeholder="Search"
        />
      </Flex>
      <Flex className="w-full [max-height:65vh] overflow-auto">
        <List
          className="demo-loadmore-list my-2 w-full"
          itemLayout="horizontal"
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                setOpenDrawer(true);
                setGstData(item);
              }}
              actions={[
                <Popconfirm
                  title="Delete GST"
                  description="Are you sure to delete the gst"
                  onConfirm={(e) => {
                    e.stopPropagation();
                  }}
                  onCancel={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Button
                    type="text"
                    size="small"
                    danger
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon icon="fluent:delete-24-regular" />
                  </Button>
                </Popconfirm>,
                <AddGstForm edit={true} editData={item} />,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  className="cursor-pointer"
                  // avatar={<Avatar src={item.picture.large} />}
                  title={
                    <Flex align="center" gap={4}>
                      <Text type="secondary">GST Number</Text>
                      <Text>:</Text>
                      <Text>{item.gstNumber}</Text>
                    </Flex>
                  }
                />
                <Flex gap={12} align="center">
                  <Flex align="center" gap={4}>
                    <Text type="secondary">GST registration date</Text>{" "}
                    <Text>:</Text>
                    <Text>{item?.gstRegistrationDate}</Text>
                  </Flex>
                  <Flex align="center" gap={4}>
                    <Text type="secondary">State name</Text> <Text>:</Text>
                    <Text>{item?.stateName}</Text>
                  </Flex>
                </Flex>
              </Skeleton>
            </List.Item>
          )}
        />
      </Flex>
      <Drawer
        width={"70%"}
        open={openDrawer}
        closeIcon={false}
        onClose={() => setOpenDrawer(false)}
      >
        <BusinessUnits data={gstData} userId={userId} refreshPage={refreshPage} />
      </Drawer>
    </div>
  );
};

export default CompanyInfo;
