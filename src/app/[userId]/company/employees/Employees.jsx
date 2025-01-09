"use client";
import { selectFilter } from "@/app/commons";
import Loading from "@/app/loading";
import { getAllRoles } from "@/app/redux-toolkit/slices/commonSlice";
import {
  addEmployee,
  createTeamMember,
  getAllEmployeesByUserId,
  updateEmployee,
} from "@/app/redux-toolkit/slices/employeesSlice";
import {
  getAllDepartmentList,
  getAllDesiginations,
  getAllResourceType,
} from "@/app/redux-toolkit/slices/settingSlice";
import { Icon } from "@iconify/react";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Typography,
} from "antd";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const { Title } = Typography;
const CommonTable = dynamic(() => import("@/app/common/CommonTable"), {
  loading: () => <Loading />,
  ssr:false
});

const Employees = ({ data, userId,subscriberId }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const allRoles = useSelector((state) => state.common.allRoles);
  const departmentList = useSelector((state) => state.setting.departmentList);
  const resourceTypeList = useSelector(
    (state) => state.setting.resourceTypeList
  );
  const desiginationList = useSelector(
    (state) => state.setting.desiginationList
  );
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (resp) => {
    api[resp.status]({
      message: resp.message,
    });
  };

  console.log("jsbvkajsdhbjshg", departmentList);

  useEffect(() => {
    dispatch(getAllDepartmentList());
    dispatch(getAllRoles());
    dispatch(getAllResourceType());
  }, [dispatch]);

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

  const handleEdit = (value) => {
    dispatch(getAllDesiginations(value?.departmentId));
    form.setFieldsValue({
      memberName: value?.memberName,
      memberMail: value?.memberMail,
      memberMobile: value?.memberMobile,
      departmentId: value?.departmentId,
      designationId: value?.designationId,
      roleId: value?.roleId,
    });
    setOpenModal(true);
    setEditData(value);
  };

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 80,
      fixed:'left'
    },
    {
      dataIndex: "name",
      title: "Employee name",
      fixed:'left'
    },
    {
      dataIndex: "memberMail",
      title: "Email",
    },
    {
      dataIndex: "mobile",
      title: "Phone no.",
    },
    {
      dataIndex: "roleName",
      title: "Role",
    },
    {
      dataIndex: "departmentName",
      title: "Department,",
    },
    {
      dataIndex: "designationName",
      title: "Designation,",
    },
    {
      dataIndex: "edit",
      title: "Edit",
      render: (_, data) => (
        <Button type="text" size="small" onClick={() => handleEdit(data)}>
          <Icon icon="fluent:edit-24-regular" />
        </Button>
      ),
    },
  ];

  const handleFinish = (values) => {
    if (editData) {
      dispatch(updateEmployee(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            openNotification({
              status: "success",
              message: "Employee updated successfully !.",
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
    } else {
      dispatch(
        addEmployee({ ...values, userId, subscribedId: subscriberId })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            openNotification({
              status: "success",
              message: "Employee added successfully !.",
            });
            dispatch(
              createTeamMember({
                ...values,
                userId,
                subscribedId: SUBSCRIPTION_ID,
              })
            )
              .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                  openNotification({
                    status: "success",
                    message: "Employee added successfully in compliance !.",
                  });
                  router.refresh();
                } else {
                  openNotification({
                    status: "error",
                    message: "Something went wrong in compliance !.",
                  });
                }
              })
              .catch(() =>
                openNotification({
                  status: "error",
                  message: "Something went wrong in compliance !.",
                })
              );
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
    }
  };

  return (
    <>
      {contextHolder}
      <Flex justify="space-between" align="center" className="mb-2">
        <Title level={4}>Employees List</Title>
      </Flex>
      <Flex justify="space-between" className="mb-2">
        <Input
          className="w-1/4"
          placeholder="search"
          value={searchTerm}
          onChange={handleSearch}
          prefix={
            <Icon icon="fluent:search-24-regular" width="16" height="16" />
          }
        />
        <Button
          type="primary"
          onClick={() => {
            setOpenModal(true);
            setEditData(null);
            form.resetFields();
          }}
        >
          Add employee
        </Button>
      </Flex>
      <CommonTable
        data={filteredData}
        columns={columns}
        rowKey={(row) => row?.id}
        scroll={{ y: "60vh", x: 1800 }}
      />
      <Modal
        title={editData ? "Edit employee detail" : "Create employee"}
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          className="[max-height:80vh] overflow-auto w-full"
        >
          <Form.Item
            label="Employee name"
            name="name"
            rules={[{ required: true, message: "Please enter employee name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter employee email id",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee mobile number"
            name="mobile"
            rules={[
              {
                required: true,
                message: "Please enter employee mobile number",
              },
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>
          <Form.Item
            label="Department"
            name="departmentId"
            rules={[
              {
                required: true,
                message: "Please select department",
              },
            ]}
          >
            <Select
              showSearch
              options={
                departmentList?.length > 0
                  ? departmentList?.map((item) => ({
                      label: item?.departmentName,
                      value: item?.id,
                    }))
                  : []
              }
              filterOption={selectFilter}
              onChange={(e) => dispatch(getAllDesiginations(e))}
            />
          </Form.Item>
          <Form.Item
            label="Designation"
            name="designationId"
            rules={[
              {
                required: true,
                message: "Please select designation",
              },
            ]}
          >
            <Select
              showSearch
              options={
                desiginationList?.length > 0
                  ? desiginationList?.map((item) => ({
                      label: item?.designationName,
                      value: item?.designationId,
                    }))
                  : []
              }
              filterOption={selectFilter}
            />
          </Form.Item>
          <Form.Item
            label="Role"
            name="roleId"
            rules={[
              {
                required: true,
                message: "Please select role",
              },
            ]}
          >
            <Select
              showSearch
              options={
                allRoles?.length > 0
                  ? allRoles?.map((item) => ({
                      label: item?.role,
                      value: item?.id,
                    }))
                  : []
              }
              filterOption={selectFilter}
            />
          </Form.Item>
          <Form.Item
            label="Reporting manager"
            name="reportingManagerId"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please select role",
            //   },
            // ]}
          >
            <Select
              showSearch
              options={[
                { label: "None", value: 0 },
                ...(data?.length > 0
                  ? data?.map((item) => ({
                      label: item?.name,
                      value: item?.id,
                    }))
                  : []),
              ]}
              filterOption={selectFilter}
            />
          </Form.Item>
          <Form.Item
            label="Resource type"
            name="typeOfResource"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please select role",
            //   },
            // ]}
          >
            <Select
              showSearch
              options={
                resourceTypeList?.length > 0
                  ? resourceTypeList?.map((item) => ({
                      label: item?.typeOfResourceName,
                      value: item?.id,
                    }))
                  : []
              }
              filterOption={selectFilter}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Employees;
