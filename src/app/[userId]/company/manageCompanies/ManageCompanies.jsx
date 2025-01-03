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
  notification,
  Popconfirm,
  Row,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  getAllBusinessActivity,
  getAllCompanyType,
  getAllDesiginations,
  getAllIndustries,
  getAllLocatedAt,
} from "@/app/redux-toolkit/slices/settingSlice";
import { useDispatch } from "react-redux";
import { getAllCountries } from "@/app/redux-toolkit/slices/commonSlice";
import { useRouter } from "next/navigation";
import {
  deleteCompanyById,
  getAllCompanies,
} from "@/app/redux-toolkit/slices/companySlice";
import Link from "next/link";
import dynamic from "next/dynamic";
const AddNEditCompanyForm = dynamic(() => import("./AddCompanyForm"), {
  loading: () => <h1>Loading .....</h1>,
  ssr: false,
});
const { Title, Text } = Typography;

const ManageCompanies = ({ userId, data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data && data?.length > 0) {
      setFilteredData(data);
    }
  }, [data]);

  // useEffect(() => {
  //   dispatch(getAllCompanies({ userId: 1, subscriptionId: 1 }));
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCompanyType());
    dispatch(getAllCountries());
    dispatch(getAllLocatedAt());
    dispatch(getAllIndustries());
    dispatch(getAllBusinessActivity(""));
  }, [dispatch]);

  const handleDeleteCompany = (companyId) => {
    dispatch(deleteCompanyById({ id: companyId, userId }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "Company deleted successfully !." });
        } else {
          notification.error({ message: "Something went wrong !." });
        }
      })
      .catch(() => notification.error({ message: "Something went wrong !." }));
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()?.trim();
    setSearchTerm(query);
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
    setFilteredData(filtered);
  };

  return (
    <div className="p-4">
      <Flex>
        <Title level={2}>Manage companies</Title>
      </Flex>
      <Flex justify="space-between" className="w-full my-2">
        <AddNEditCompanyForm userId={userId} />
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
          value={searchTerm}
          onChange={handleSearch}
          prefix={
            <Icon icon="fluent:search-24-regular" width="24" height="24" />
          }
        />
      </Flex>
      <Flex
        vertical
        gap={8}
        className="w-full my-4 [max-height:60vh] overflow-auto"
      >
        {filteredData?.map((item, idx) => {
          return (
            <Card
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                router.push(`manageCompanies/${1}/companyInfo`);
              }}
              key={`${idx}companyCard`}
              hoverable
              title={
                <Flex align="center" gap={8}>
                  <Avatar
                    size={72}
                    src="https://img.freepik.com/premium-vector/minimalist-type-creative-business-logo-template_1283348-23026.jpg?semt=ais_hybrid"
                  ></Avatar>
                  <Title level={5}>{item?.companyName}</Title>
                </Flex>
              }
              //   loading={true}
              className="w-full"
              extra={
                <Flex className="w-full" gap={8} justify="flex-end">
                  <Popconfirm
                    title="Delete the company unit"
                    description="Are you sure to delete this company unit"
                    onCancel={(e) => e.stopPropagation()}
                    onConfirm={(e) => {
                      e.stopPropagation();
                      handleDeleteCompany(item?.companyId);
                    }}
                  >
                    <Button
                      type="text"
                      size="small"
                      danger
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Icon
                        icon="fluent:delete-24-regular"
                        height={16}
                        width={16}
                      />
                      Delete
                    </Button>
                  </Popconfirm>
                  <AddNEditCompanyForm
                    edit={true}
                    editData={item}
                    userId={userId}
                  />
                </Flex>
              }
            >
              <Flex vertical gap={16}>
                <Row>
                  <Col span={8}>
                    <Text>{item?.companyType}</Text>
                  </Col>
                  <Col span={8} />
                  <Col span={8}>
                    <Flex gap={8} align="center">
                      <Text type="secondary">Registration ID (CIN)</Text>
                      <Text>:</Text>
                      <Text>{item?.companyCINNumber}</Text>
                    </Flex>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Flex align="center" gap={8}>
                      <Text type="secondary">Formation state</Text>
                      <Text>:</Text>
                      <Text>{item?.companyState}</Text>
                    </Flex>
                  </Col>
                  <Col span={8} />
                  <Col span={8}>
                    <Flex gap={8} align="center">
                      <Text type="secondary">Formation date</Text>
                      <Text>:</Text>
                      <Text>{item?.companyRegistrationDate}</Text>
                    </Flex>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Flex align="center" gap={8}>
                      <Text type="secondary">Operation units</Text>
                      <Text>:</Text>
                      <Link href={""}>{item?.businessUnitCount} units</Link>
                    </Flex>
                  </Col>
                  <Col span={8}>
                    <Flex align="center" gap={8}>
                      <Text type="secondary">Number of states operating</Text>
                      <Text>:</Text>
                      <Link href={""}>{item?.stateCount} states</Link>
                    </Flex>
                  </Col>
                  <Col span={8}>
                    <Flex gap={8} align="center">
                      <Text type="secondary">GST Registraion</Text>
                      <Text>:</Text>
                      <Link href={""}>
                        {item?.gstDetailsCount} registration
                      </Link>
                    </Flex>
                  </Col>
                </Row>
              </Flex>
            </Card>
          );
        })}
      </Flex>
    </div>
  );
};

export default ManageCompanies;
