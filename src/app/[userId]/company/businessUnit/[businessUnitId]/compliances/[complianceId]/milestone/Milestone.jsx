"use client";
import CommonTable from "@/app/common/CommonTable";
import { Icon } from "@iconify/react";
import { Button, Flex, Form, Input, Modal, Progress, Typography } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const { Title, Text } = Typography;
const AddMilestone = dynamic(() => import("./AddMilestone"), {
  loading: () => <Loading />,
});

const Milestone = ({
  data,
  businessUnitId,
  complianceId,
  userId,
  complianceData,
  subscriberId,
  userList,
}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
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

  const columns = [
    { dataIndex: "id", title: "Id", width: 80, fixed: "left" },
    {
      dataIndex: "mileStoneName",
      title: "Milestone name",
      fixed: "left",
      render: (_, data) => (
        <Link href={`milestone/${data?.id}/task`}>{data?.mileStoneName}</Link>
      ),
    },
    { dataIndex: "reporterName", title: "Reporter" },
    { dataIndex: "assignedName", title: "Assignee" },
    { dataIndex: "assigneeMail", title: "Assignee email" },
    { dataIndex: "assignedByName", title: "Assigned By" },
    { dataIndex: "description", title: "Description" },
    { dataIndex: "issuedDate", title: "Issue date" },
    { dataIndex: "renewalDate", title: "Renewal date" },
    { dataIndex: "dueDate", title: "Due date" },
    { dataIndex: "criticality", title: "Criticality" },
    {
      dataIndex: "status",
      title: "Status",
      render: (_, data) => (
        <Progress
          percent={30}
          percentPosition={{
            align: "start",
            type: "outer",
          }}
        />
      ),
    },
    { dataIndex: "remark", title: "Remark" },
  ];

  return (
    <>
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Milestones</Title>
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
            Add milestone
          </Button>
        </Flex>
      </Flex>
      <CommonTable
        data={filteredData}
        columns={columns}
        rowKey={(row) => row?.id}
        scroll={{ y: "65vh", x: 1800 }}
      />
      <Modal
        title="Add milestone"
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
        width={"80%"}
        footer={null}
      >
        <AddMilestone
          setOpenModal={setOpenModal}
          businessUnitId={businessUnitId}
          complianceId={complianceId}
          userId={userId}
          complianceData={complianceData}
          subscriberId={subscriberId}
          userList={userList}
        />
      </Modal>
    </>
  );
};

export default Milestone;
