"use client";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import Link from "next/link";
import {
  createCompliance,
  getComplianceByUnitId,
} from "@/app/redux-toolkit/slices/complianceSlice";
import { SUBSCRIPTION_ID } from "@/app/constants";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import { getAllStatus } from "@/app/redux-toolkit/slices/commonSlice";
import { selectFilter } from "@/app/commons";
const { Text, Title } = Typography;
const CommonTable = dynamic(() => import("@/app/common/CommonTable"), {
  loading: () => <Loading />,
});

const Compliances = ({ data, businessUnitId, userId, subscriberId }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const statusList = useSelector((state) => state.common.statusList);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [api, contextHolder] = notification.useNotification();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
  
    useEffect(() => {
      if (data && data?.length > 0) {
        setFilteredData(data);
      }
    }, [data]);
  
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

  const openNotification = (resp) => {
    api[resp.status]({
      message: resp.message,
    });
  };

  useEffect(() => {
    dispatch(getAllStatus());
  }, [dispatch]);

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 80,
      fixed: "left",
    },
    {
      dataIndex: "name",
      title: "Compliance name",
      width: 300,
      fixed: "left",
      render: (_, data) => (
        <Link href={`compliances/${data?.id}/milestone`}>{data?.name}</Link>
      ),
    },
    {
      dataIndex: "issueAuthority",
      title: "Issuer authority",
      width: 200,
    },
    {
      dataIndex: "certificateType",
      title: "Certificate type",
      width: 200,
    },
    {
      dataIndex: "durationYear",
      title: "Duration (in year)",
      width: 150,
    },
    {
      dataIndex: "durationMonth",
      title: "Duration (in month)",
      width: 150,
    },
    {
      dataIndex: "status",
      title: "Status",
      render: (_, data) => (
        <Flex>
          <Radio.Group>
            <Radio value={"apply_now"}>Apply now</Radio>
            <Radio value={"alredy_done"}>Already done</Radio>
            <Radio value={"not_applicable"}>Not applicable</Radio>
          </Radio.Group>
        </Flex>
      ),
    },
  ];

  const handleFinish = (values) => {
    dispatch(
      createCompliance({
        userId,
        businessUnitId,
        data: { subscriberId: subscriberId, ...values },
      })
    )
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          openNotification({
            status: "success",
            message: "Compliance created successfully !.",
          });
          setOpenModal(false);
          form.resetFields();
          router.refresh();
        } else {
          openNotification({
            status: "error",
            message: "Something went wrong !.",
          });
        }
      })
      .catch(() =>
        openNotification({
          status: "error",
          message: "Something went wrong !.",
        })
      );
  };

  return (
    <>
      {contextHolder}
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Compliances list</Title>
      </Flex>
      <Flex justify="space-between" align="center" className="mb-2">
        <Input
          className="w-1/4"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          prefix={
            <Icon icon="fluent:search-16-regular" width="16" height="16" />
          }
        />
        <Flex align="center" gap={8}>
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Add compliances
          </Button>
        </Flex>
      </Flex>
      <CommonTable
        data={filteredData}
        columns={columns}
        rowKey={(row) => row?.id}
        scroll={{ y: "65vh", x: 1700 }}
      />
      <Modal
        title={editData ? "Edit compliance" : "Add compliance"}
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        width={"60%"}
        onOk={() => form.submit()}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          className="[max-height:80vh] overflow-auto"
        >
          <Row>
            <Col span={11}>
              <Form.Item
                label="Issuer authority"
                name="issueAuthority"
                rules={[
                  {
                    required: true,
                    message: "please enter issuer authority name ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Certificate type"
                name="certificateType"
                rules={[
                  { required: true, message: "Please enter certificate type" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Priority"
                name="priority"
                rules={[
                  { required: true, message: "please select the priority" },
                ]}
              >
                <Select
                  options={[
                    { label: "Low", value: 1 },
                    { label: "Medium", value: 2 },
                    { label: "High", value: 3 },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Compliance name"
                name="name"
                rules={[
                  { required: true, message: "please enter compliance name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Applicable zone"
                name="applicableZone"
                rules={[
                  { required: true, message: "please enter applicable zone" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Approval state"
                name="approvalState"
                rules={[
                  { required: true, message: "please enter approval state" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Start date"
                name="startDate"
                rules={[{ required: true, message: "please enter start date" }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Due date"
                name="dueDate"
                rules={[{ required: true, message: "please enter due date" }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Status"
                name="statusId"
                rules={[
                  { required: true, message: "please select the status" },
                ]}
              >
                <Select
                  showSearch
                  options={
                    statusList?.length > 0
                      ? statusList?.map((item) => ({
                          label: item?.name,
                          value: item?.id,
                        }))
                      : []
                  }
                  filterOption={selectFilter}
                />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Work status"
                name="workStatus"
                rules={[
                  { required: true, message: "please select the work status" },
                ]}
              >
                <Select
                  showSearch
                  options={
                    statusList?.length > 0
                      ? statusList?.map((item) => ({
                          label: item?.name,
                          value: item?.id,
                        }))
                      : []
                  }
                  filterOption={selectFilter}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Duration (years)"
                name="durationYear"
                rules={[
                  {
                    required: true,
                    message: "please enter duration in numbers",
                  },
                ]}
              >
                <InputNumber className="w-full" controls={false} />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Duration (months)"
                name="durationMonth"
                rules={[
                  {
                    required: true,
                    message: "please enter duration in numbers",
                  },
                ]}
              >
                <InputNumber className="w-full" controls={false} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={11}>
              <Form.Item
                label="Completed date"
                name="completedDate"
                rules={[
                  { required: true, message: "please enter completed date" },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "please enter description" },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default Compliances;
