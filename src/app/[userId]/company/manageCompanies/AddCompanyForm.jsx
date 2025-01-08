"use client";
import { selectFilter } from "@/app/commons";
import {
  getCitiesByStateId,
  getStatesByCountryId,
} from "@/app/redux-toolkit/slices/commonSlice";
import {
  createCompany,
  updateCompany,
} from "@/app/redux-toolkit/slices/companySlice";
import {
  getBusinessActivityBySubIndustryId,
  getSubIndustryById,
} from "@/app/redux-toolkit/slices/settingSlice";
import { Icon } from "@iconify/react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Row,
  Select,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddNEditCompanyForm = ({ edit, userId, editData, subscriberId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const designationList = useSelector(
    (state) => state.setting.desiginationList
  );
  const companyTypeList = useSelector((state) => state.setting.companyTypeList);
  const locationsList = useSelector((state) => state.setting.locatedAtList);
  const countriesList = useSelector((state) => state.common.countries);
  const statesList = useSelector((state) => state.common.statesList);
  const citiesList = useSelector((state) => state.common.citiesList);
  const industriesList = useSelector((state) => state.setting.industriesList);
  const subIndusryList = useSelector((state) => state.setting.subIndusryList);
  const businessActivityList = useSelector(
    (state) => state.setting.businessActivityList
  );
  const businessActivities = useSelector(
    (state) => state.setting.businessActivities
  );
  const [openModal, setOpenModal] = useState(false);
  const [editCompanyId, setEditCompanyId] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (resp) => {
    api[resp.status]({
      message: resp.message,
    });
  };

  const handleEdit = useCallback(() => {
    if (editData) {
      dispatch(getSubIndustryById(editData?.industryId));
      dispatch(
        getBusinessActivityBySubIndustryId(editData?.industrySubCategoryId)
      );
      dispatch(getStatesByCountryId(editData?.countryId));
      dispatch(getCitiesByStateId(editData?.companyStateId));
      setEditCompanyId(editData?.companyId);

      form.setFieldsValue({
        companyName: editData?.companyName,
        companyTypeId: editData?.companyTypeId,
        businessEmailId: editData?.businessEmailId,
        companyCINNumber: editData?.companyCINNumber,
        companyPanNumber: editData?.companyPanNumber,
        companyRegistrationDate: dayjs(editData?.companyRegistrationDate),
        companyRegistrationNumber: editData?.companyRegistrationNumber,
        companyTurnover: editData?.companyTurnover,
        gstNumber: editData?.gstNumber,
        permanentEmployee: editData?.permanentEmployee,
        contractEmployee: editData?.contractEmployee,
        industryId: editData?.industryId,
        industrySubCategoryId: editData?.industrySubCategoryId,
        businessActivityId: editData?.businessActivityId,
        locatedAtId: editData?.locatedAtId,
        countryId: editData?.countryId,
        companyStateId: editData?.companyStateId,
        companyCityId: editData?.companyCityId,
        pinCode: editData?.pinCode,
        companyAddress: editData?.companyAddress,
        operationUnitAddress: editData?.operationUnitAddress,
        companyRemarks: editData?.companyRemarks,
      });
      setOpenModal(true);
    }
  }, [editData, form, dispatch]);

  const handleFinish = useCallback(
    (values) => {
      if (editCompanyId) {
        dispatch(
          updateCompany({ formData: values, companyId: editCompanyId, userId })
        )
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              openNotification({
                status: "success",
                message: "Company updated successfully !.",
              });
              router.refresh();
              setOpenModal(false);
              setEditCompanyId(null);
              form.resetFields();
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
          createCompany({
            ...values,
            userId,
            subscriberId: subscriberId,
          })
        )
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              openNotification({
                status: "success",
                message: "Company added successfully !.",
              });
              router.refresh();
              setOpenModal(false);
              form.resetFields();
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
    },
    [dispatch, form, editCompanyId, router, userId]
  );

  return (
    <>
      {contextHolder}
      {edit ? (
        <Button
          type="text"
          size="small"
          onClick={(e) => {
            setOpenModal(true);
            e.stopPropagation();
            handleEdit();
          }}
        >
          <Icon icon="fluent:edit-24-regular" height={16} width={16} />
          Edit
        </Button>
      ) : (
        <Button
          size="large"
          type="text"
          variant="filled"
          onClick={() => setOpenModal(true)}
        >
          <Icon icon="fluent:add-24-regular" width="24" height="24" />
          Add new company
        </Button>
      )}
      <Modal
        title={edit ? "Edit company" : "Create company"}
        centered
        open={openModal}
        onCancel={(e) => {
          e.stopPropagation();
          setOpenModal(false);
        }}
        onClose={(e) => {
          e.stopPropagation();
          setOpenModal(false);
        }}
        okText="Submit"
        width={800}
        height={650}
        onOk={(e) => {
          e.stopPropagation();
          form.submit();
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="[max-height:75vh] overflow-auto p-4"
        >
          <Row>
            <Col span={11}>
              <Form.Item
                label="Company name"
                name="companyName"
                // rules={[
                //   { required: true, message: "please enter company name" },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Company type"
                name="companyTypeId"
                // rules={[
                //   { required: true, message: "please select company type" },
                // ]}
              >
                <Select
                  showSearch
                  options={
                    companyTypeList?.length > 0
                      ? companyTypeList?.map((item) => ({
                          label: item?.companyTypeName,
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
                label="Bussiness email id"
                name="businessEmailId"
                // rules={[
                //   { required: true, message: "please enter your business email" },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Company CIN "
                name="cinNumber"
                // rules={[
                //   { required: true, message: "please enter company CIN number" },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Company pan number"
                name="panNumber"
                // rules={[
                //   { required: true, message: "please enter company pan number" },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Company registration date"
                name="registrationDate"
                // rules={[
                //   { required: true, message: "please enter registration date" },
                // ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Company registration number"
                name="registrationNumber"
                // rules={[
                //   { required: true, message: "please enter registration" },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Company turn over"
                name="turnover"
                // rules={[
                //   { required: true, message: "please enter company turnover" },
                // ]}
              >
                <InputNumber className="w-full" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Company GST number"
                name="gstNumber"
                // rules={[
                //   { required: true, message: "please enter GST number" },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Permanent employee"
                name="permanentEmployee"
                // rules={[
                //   { required: true, message: "please enter number permanent employee" },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Contract employee"
                name="contractEmployee"
                // rules={[
                //   { required: true, message: "please enter number of contract employee" },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Industry"
                name="industryId"
                // rules={[
                //   { required: true, message: "please select industry" },
                // ]}
              >
                <Select
                  showSearch
                  options={
                    industriesList?.length > 0
                      ? industriesList?.map((item) => ({
                          label: item?.industryName,
                          value: item?.id,
                        }))
                      : []
                  }
                  filterOption={selectFilter}
                  onChange={(e) => dispatch(getSubIndustryById(e))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Select subindustry"
                name="industrySubCategoryId"
                // rules={[
                //   { required: true, message: "please select subindustry" },
                // ]}
              >
                <Select
                  showSearch
                  options={
                    subIndusryList?.length > 0
                      ? subIndusryList?.map((item) => ({
                          label: item?.industrySubCategoryName,
                          value: item?.id,
                        }))
                      : []
                  }
                  filterOption={selectFilter}
                  onChange={(e) =>
                    dispatch(getBusinessActivityBySubIndustryId(e))
                  }
                />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Business activity"
                name="businessActivityId"
                // rules={[
                //   { required: true, message: "please select business activity" },
                // ]}
              >
                <Select
                  showSearch
                  options={
                    businessActivityList?.length > 0
                      ? businessActivityList?.map((item) => ({
                          label: item?.businessActivityName,
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
                label="Located at"
                name="locatedAtId"
                // rules={[
                //   { required: true, message: "please select location" },
                // ]}
              >
                <Select
                  showSearch
                  options={
                    locationsList?.length > 0
                      ? locationsList?.map((item) => ({
                          label: item?.locationName,
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
                label="Country"
                name="countryId"
                // rules={[
                //   { required: true, message: "please select country" },
                // ]}
              >
                <Select
                  showSearch
                  options={
                    countriesList?.length > 0
                      ? countriesList?.map((item) => ({
                          label: item?.countryName,
                          value: item?.id,
                        }))
                      : []
                  }
                  onChange={(e) => dispatch(getStatesByCountryId(e))}
                  filterOption={selectFilter}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="State"
                name="stateId"
                // rules={[
                //   { required: true, message: "please select state" },
                // ]}
              >
                <Select
                  showSearch
                  options={
                    statesList?.length > 0
                      ? statesList?.map((item) => ({
                          label: item?.stateName,
                          value: item?.id,
                        }))
                      : []
                  }
                  filterOption={selectFilter}
                  onChange={(e) => dispatch(getCitiesByStateId(e))}
                />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="City"
                name="cityId"
                // rules={[
                //   { required: true, message: "please select city" },
                // ]}
              >
                <Select
                  showSearch
                  options={
                    citiesList?.length > 0
                      ? citiesList?.map((item) => ({
                          label: item?.cityName,
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
                label="Pin code"
                name="pinCode"
                // rules={[
                //   { required: true, message: "please enter pin code" },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Company address"
                name="operationUnitAddress"
                // rules={[
                //   { required: true, message: "please enter company address" },
                // ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Company remarks"
                name="companyRemarks"
                // rules={[
                //   { required: true, message: "please enter company remarks" },
                // ]}
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

export default AddNEditCompanyForm;
