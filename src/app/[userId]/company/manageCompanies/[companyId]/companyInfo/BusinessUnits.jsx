"use client";
import { selectFilter } from "@/app/commons";
import { SUBSCRIPTION_ID } from "@/app/constants";
import {
  getAllCountries,
  getCitiesByStateId,
  getStatesByCountryId,
} from "@/app/redux-toolkit/slices/commonSlice";
import {
  createBusinessUnit,
  updateBusinessUnit,
} from "@/app/redux-toolkit/slices/companySlice";
import { getAllBusinessActivity } from "@/app/redux-toolkit/slices/settingSlice";
import { Icon } from "@iconify/react";
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Popconfirm,
  Select,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const { Title, Text } = Typography;

const BusinessUnits = ({ data, refreshPage, userId }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const countriesList = useSelector((state) => state.common.countries);
  const statesList = useSelector((state) => state.common.statesList);
  const citiesList = useSelector((state) => state.common.citiesList);
  const locationsList = useSelector((state) => state.setting.locatedAtList);
  const businessActivities = useSelector(
    (state) => state.setting.businessActivities
  );
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data && data?.businessUnitResponseList?.length > 0) {
      setFilteredData(data?.businessUnitResponseList);
    }
  }, [data]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()?.trim();
    setSearchTerm(query);
    const filtered = data?.businessUnitResponseList?.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getStatesByCountryId(data?.countryId));
    dispatch(getCitiesByStateId(data?.stateId));
    dispatch(getAllBusinessActivity(""));
  }, [data, dispatch]);

  const handleEdit = (value) => {

    console.log('sdivhaosidhvash',value)
    dispatch(getAllCountries());
    dispatch(getStatesByCountryId(value?.countryId));
    form.setFieldsValue({
      gstNumber: value?.gstNumber,
      countryId: value?.countryId,
      stateId: value?.stateId,
      cityId: value?.cityId,
      locatedAtId: value?.locatedAtId,
      businessActivityId: value?.businessActivityId,
      address: value?.address,
    });
    setEditData(value);
    setOpenModal(true);
  };

  const handleFinish = (values) => {
    if (editData) {
      dispatch(
        updateBusinessUnit({
          data: { ...values, userId, subscriptionId: SUBSCRIPTION_ID },
          businessUnitId: editData?.id,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Business unit created successfully",
            });
            setOpenModal(false);
            router.refresh();
            refreshPage();
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    } else {
      dispatch(
        createBusinessUnit({
          data: { ...values, userId, subscriptionId: SUBSCRIPTION_ID },
          gstDetailsId: data?.gstId,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Business unit created successfully",
            });
            setOpenModal(false);
            router.refresh();
            refreshPage();
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    }
  };

  console.log("jdshckjsdhcskjvd", data);

  return (
    <>
      <Flex vertical>
        <Flex justify="space-between" align="center">
          <Title level={5}>Business units</Title>{" "}
          <Button onClick={() => setOpenModal(true)}>Add business unit</Button>
        </Flex>
        <Flex className="my-4">
          <Input
            placeholder="Search for company units"
            value={searchTerm}
            onChange={handleSearch}
            prefix={
              <Icon icon="fluent:search-24-regular" width="24" height="24" />
            }
          />
        </Flex>
        <Flex vertical className="[max-height:80vh] overflow-auto">
          {data &&
            data?.businessUnitResponseList?.length > 0 &&
            filteredData?.map((item,idx) => {
              return (
                <Card
                  className="w-full my-2"
                  key={`${idx}businessUnit`}
                  actions={[
                    <Flex justify="flex-end" className="px-2">
                      <Flex gap={8}>
                        <Popconfirm
                          title="Delete business unit"
                          description="Are you sure to delete the business unit"
                        >
                          <Button size="small" type="text" danger>
                            <Icon icon="fluent:delete-24-regular" />
                          </Button>
                        </Popconfirm>
                        <Button
                          size="small"
                          type="text"
                          onClick={() => handleEdit(item)}
                        >
                          <Icon icon="fluent:edit-24-regular" />
                        </Button>
                      </Flex>
                    </Flex>,
                  ]}
                >
                  <Flex vertical gap={12}>
                    <Flex justify="space-between" align="center">
                      <Flex gap={8}>
                        <Text type="secondary">GST number</Text>
                        <Text>:</Text>
                        <Text>{item?.gstNumber}</Text>
                      </Flex>
                      <Flex gap={8}>
                        <Text type="secondary">Country</Text>
                        <Text>:</Text>
                        <Text>{data?.countryName}</Text>
                      </Flex>
                    </Flex>
                    <Flex justify="space-between" align="center">
                      <Flex gap={8}>
                        <Text type="secondary">State</Text>
                        <Text>:</Text>
                        <Text>{data?.stateName}</Text>
                      </Flex>
                      <Flex gap={8} wrap>
                        <Text type="secondary">Located at</Text>
                        <Text>:</Text>
                        <Text>{item?.locatedAt}</Text>
                      </Flex>
                    </Flex>
                    <Flex justify="space-between" align="center">
                      <Flex gap={8}>
                        <Text type="secondary">Address</Text>
                        <Text>:</Text>
                        <Text>{item?.address}</Text>
                      </Flex>
                      {/* <Flex gap={8} wrap>
                        <Text type="secondary">Address</Text>
                        <Text>:</Text>
                        <Text>{item?.address}</Text>
                      </Flex> */}
                    </Flex>
                  </Flex>
                </Card>
              );
            })}
        </Flex>
      </Flex>
      <Modal
        title={editData ? "Edit business unit" : "Create business unit"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            gstNumber: data?.gstNumber,
            countryId: data?.countryId,
            stateId: data?.stateId,
          }}
          onFinish={handleFinish}
        >
          <Form.Item label="Gst number" name="gstNumber">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Country" name="countryId">
            <Select
              disabled
              showSearch
              options={
                countriesList?.length > 0
                  ? countriesList?.map((item) => ({
                      label: item?.countryName,
                      value: item?.id,
                    }))
                  : []
              }
              filterOption={selectFilter}
            />
          </Form.Item>
          <Form.Item label="State" name="stateId">
            <Select
              showSearch
              disabled
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
          <Form.Item label="Select business activity" name="businessActivityId">
            <Select
              showSearch
              options={
                businessActivities?.length > 0
                  ? businessActivities?.map((item) => ({
                      label: item?.businessActivityName,
                      value: item?.id,
                    }))
                  : []
              }
              filterOption={selectFilter}
            />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BusinessUnits;
