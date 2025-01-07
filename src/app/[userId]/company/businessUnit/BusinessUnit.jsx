"use client";
import Loading from "@/app/loading";
import {
  createCountry,
  updateCountry,
} from "@/app/redux-toolkit/slices/commonSlice";
import { getAllCompliances } from "@/app/redux-toolkit/slices/complianceSlice";
import { Icon } from "@iconify/react";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  notification,
  Popover,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const { Text, Title } = Typography;
const CommonTable=dynamic(()=>import('@/app/common/CommonTable'),{loading:()=><Loading/>})

const BusinessUnit = ({ userId, data }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [editData, setEditData] = useState(null);

  const handleUpdateCountries = (data) => {
    form.setFieldsValue({
      countryCode: data?.countryCode,
      countryName: data?.countryName,
    });
    setEditData(data);
    setOpenModal(true);
  };


  const searchFilters = () => {
    return (
      <Form layout="vertical">
        <Row>
          <Col span={11}>
            <Form.Item label="Choose company">
              <Select showSearch />
            </Form.Item>
          </Col>
          <Col span={2} />
          <Col span={11}>
            <Form.Item label="Choose by state">
              <Select showSearch />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            {" "}
            <Form.Item label="Choose by operational unit">
              <Select showSearch />
            </Form.Item>
          </Col>
          <Col span={2} />
          <Col span={11}>
            <Form.Item label="Search by licence name">
              <Select showSearch />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Sort by department">
              <Select showSearch />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Apply
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const sortFilters = () => {
    const onChange = () => {};

    return (
      <Checkbox.Group
        options={[
          { label: "Not started", value: "not_started" },
          { label: "In progress", value: "in_progress" },
          { label: "Completed", value: "completed" },
          { label: "Onhold", value: "onhold" },
        ]}
        onChange={onChange}
      />
    );
  };

  const columns = [
    { dataIndex: "companyId", title: "Id", width: 80 },
    {
      dataIndex: "companyName",
      title: "Company",
    },
    {
      dataIndex: "businessAddress",
      title: "Business unit",
    },
    {
      dataIndex: "businessActivity",
      title: "Activity",
    },
    {
      dataIndex: "complianceCount",
      title: "Compliance",
      render: (_, data) => (
        <Link href={`businessUnit/${data?.businessUnitId}/compliances`}>
          {data?.complianceCount}
        </Link>
      ),
    },
    { dataIndex: "date", title: "Last update" },
    { dataIndex: "gstNumber", title: "Gst no." },
  ];

  const onRowSelection = () => {};

  const handleFinish = (values) => {
    if (editData) {
      dispatch(updateCountry({ ...values, id: editData?.id }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Country updated successfully !.",
            });
            setOpenModal(false);
            form.resetFields();
            router.refresh();
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    } else {
      dispatch(createCountry(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Country created successfully !.",
            });
            setOpenModal(false);
            form.resetFields();
            router.refresh();
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    }
  };

  return (
    <>
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Approve applicable Compliances</Title>
      </Flex>
      <Flex justify="space-between" align="center" className="mb-2">
        <Input
          className="w-1/4"
          placeholder="Search"
          prefix={
            <Icon icon="fluent:search-16-regular" width="16" height="16" />
          }
        />
        <Flex align="center" gap={8}>
          <Popover
            title="Filters"
            trigger={"click"}
            overlayStyle={{ width: 600 }}
            placement="bottomRight"
            content={searchFilters}
          >
            <Icon
              icon="fluent:filter-24-regular"
              className="cursor-pointer"
              width="24"
              height="24"
            />
          </Popover>
          <Popover
            title="Sort"
            trigger={"click"}
            overlayStyle={{ width: 150 }}
            placement="bottomRight"
            content={sortFilters}
          >
            <Icon
              className="cursor-pointer"
              icon="fluent:arrow-sort-24-regular"
              width="24"
              height="24"
            />
          </Popover>
        </Flex>
      </Flex>
      <CommonTable
        data={data}
        columns={columns}
        rowKey={(row) => row?.businessUnitId}
        scroll={{ y: 600 }}
        handleRowSelection={onRowSelection}
      />
    </>
  );
};

export default BusinessUnit;
