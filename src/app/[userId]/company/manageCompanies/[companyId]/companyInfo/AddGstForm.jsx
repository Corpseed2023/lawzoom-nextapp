"use client";
import { selectFilter } from "@/app/commons";
import { SUBSCRIPTION_ID } from "@/app/constants";
import {
  getAllCountries,
  getStatesByCountryId,
} from "@/app/redux-toolkit/slices/commonSlice";
import {
  addGstDetails,
  updateGstDetails,
} from "@/app/redux-toolkit/slices/companySlice";
import { Icon } from "@iconify/react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Select,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddGstForm = ({ edit, companyId, editData, userId }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const countriesList = useSelector((state) => state.common.countries);
  const statesList = useSelector((state) => state.common.statesList);
  const [openModal, setOpenModal] = useState(false);
  const [gstId, setGstId] = useState(null);

  const handleEdit = () => {
    if (editData) {
      dispatch(getStatesByCountryId(editData?.countryId));
      setGstId(editData?.id);
      form.setFieldsValue({
        gstNumber: editData?.gstNumber,
        gstRegistrationDate: dayjs(editData?.gstRegistrationDate),
        countryId: editData?.countryId,
        stateId: editData?.stateId,
      });
      setOpenModal(true);
    }
  };

  const handleFinish = (values) => {
    values.gstRegistrationDate = dayjs(values?.gstRegistrationDate).format(
      "YYYY-MM-DD"
    );
    if (gstId) {
      dispatch(
        updateGstDetails({
          ...values,
          gstId,
          userId,
          subscriptionId: SUBSCRIPTION_ID,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "GST details updated successfully !.",
            });
            form.resetFields();
            setOpenModal(false);
            router.refresh();
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    } else {
      dispatch(
        addGstDetails({
          ...values,
          companyId,
          userId,
          subscriptionId: SUBSCRIPTION_ID,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "GST details added successfully !.",
            });
            form.resetFields();
            setOpenModal(false);
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
      {edit ? (
        <Button
          size="small"
          type="text"
          onClick={(e) => {
            e.stopPropagation();
            setOpenModal(true);
            handleEdit();
          }}
        >
          <Icon icon="fluent:edit-24-regular" />
        </Button>
      ) : (
        <Button type="primary" onClick={() => setOpenModal(true)}>
          <Icon icon="fluent:add-24-regular" width="16" height="16" />
          Add GST
        </Button>
      )}
      <Modal
        title={edit ? "Edit GST details" : "Add GST details"}
        open={openModal}
        onCancel={(e) => {
          e.stopPropagation();
          setOpenModal(false);
        }}
        onClose={() => {
          e.stopPropagation();
          setOpenModal(false);
        }}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          onClick={(e) => e.stopPropagation()}
        >
          <Form.Item
            label="GST number"
            name="gstNumber"
            rules={[{ required: true, message: "please enter GST number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="GST registration date"
            name="gstRegistrationDate"
            rules={[
              { required: true, message: "please enter registration date" },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            label="Select country"
            name="countryId"
            rules={[{ required: true, message: "please select country" }]}
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
          <Form.Item
            label="Select state"
            name="stateId"
            rules={[{ required: true, message: "please select state" }]}
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
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddGstForm;
