"use client";
import CommonTable from "@/app/common/CommonTable";
import { selectFilter } from "@/app/commons";
import { getAllRoles } from "@/app/redux-toolkit/slices/commonSlice";
import {
  addEmployee,
  updateEmployee,
} from "@/app/redux-toolkit/slices/employeesSlice";
import {
  getAllDepartmentList,
  getAllDesiginations,
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
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const { Title } = Typography;

const Employees = ({ data, userId }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const allRoles = useSelector((state) => state.common.allRoles);
  const departmentList = useSelector((state) => state.common.departmentList);
  const desiginationList = useSelector(
    (state) => state.common.desiginationList
  );
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getAllDepartmentList());
    dispatch(getAllRoles());
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
      width:80
    },
    {
      dataIndex: "memberName",
      title: "Employee name",
    },
    {
      dataIndex: "memberMail",
      title: "Email",
    },
    {
      dataIndex: "memberMobile",
      title: "Phone no.",
    },
    {
      dataIndex: "role",
      title: "Role",
    },
    {
      dataIndex: "department",
      title: "Department,",
    },
    {
      dataIndex: "designation",
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
            notification.success({
              message: "Employee updated successfully !.",
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
      dispatch(addEmployee(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Employee added successfully !." });
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
        scroll={{ y: 600 }}
      />
      <Modal
        title={editData ? "Edit employee detail" : "Create employee"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Employee name"
            name="memberName"
            rules={[{ required: true, message: "Please enter employee name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee email"
            name="memberMail"
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
            name="memberMobile"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter employee mobile number",
              },
            ]}
          >
            <Input />
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
                data?.length > 0
                  ? data?.map((item) => ({
                      label: item?.memberName,
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
