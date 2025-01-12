"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Steps,
  theme,
  Typography,
} from "antd";
import logo from "../../../assets/lowZoom.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBusinessActivity,
  getAllCompanyType,
  getAllDesiginations,
  getAllIndustries,
  getAllLocatedAt,
  getBusinessActivityBySubIndustryId,
  getSubIndustryById,
} from "@/app/redux-toolkit/slices/settingSlice";
import { selectFilter } from "@/app/commons";
import {
  getAllCountries,
  getCitiesByStateId,
  getStatesByCountryId,
} from "@/app/redux-toolkit/slices/commonSlice";
const { Title, Text } = Typography;

const CompanyOnboarding = ({ userId }) => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [activityForm] = Form.useForm();
  const router = useRouter();
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
  const [current, setCurrent] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    dispatch(getAllDesiginations());
    dispatch(getAllCompanyType());
    dispatch(getAllCountries());
    dispatch(getAllLocatedAt());
    dispatch(getAllIndustries());
    dispatch(getAllBusinessActivity(""));
  }, [dispatch]);

  const steps = [
    {
      title: "First",
      content: (
        <Flex vertical className="w-full">
          <Row className="w-full">
            <Col span={11}>
              <Form.Item
                label="First name"
                name="firstName"
                // rules={[
                //   { required: true, message: "please enter your first name" },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Last name"
                name="lastName"
                // rules={[
                //   { required: true, message: "please enter your first name" },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row className="w-full">
            <Col span={11}>
              <Form.Item
                label="Designation"
                name="designationId"
                // rules={[
                //   { required: true, message: "please select your designation" },
                // ]}
              >
                <Select
                  showSearch
                  options={
                    designationList?.length > 0
                      ? designationList?.map((item) => ({
                          label: item?.designationName,
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
                label="Business email id"
                name="businessEmailId"
                // rules={[
                //   {
                //     required: true,
                //     type: "email",
                //     message: "please enter youe business email id ",
                //   },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Flex>
      ),
    },
    {
      title: "Second",
      content: (
        <Flex vertical className="w-full">
          <Row className="w-full">
            <Col span={11}>
              <Form.Item
                label="Select type of company"
                name="companyTypeId"
                // rules={[
                //   {
                //     required: true,
                //     message: "please select your company type",
                //   },
                // ]}
              >
                <Select
                  showSearch
                  options={
                    companyTypeList?.length > 0
                      ? companyTypeList?.map((item) => ({
                          label: item?.designationName,
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
                label="Company name"
                name="companyName"
                // rules={[
                //   { required: true, message: "please enter company name" },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row className="w-full">
            <Col span={11}>
              <Form.Item
                label="Company pan number / CIN number"
                name="companyPinCode"
                // rules={[
                //   { required: true, message: "please select your designation" },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item label="Company pan number" name="companyPanNumber">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row className="w-full">
            <Col span={11}>
              <Form.Item
                label="Country"
                name="country"
                // rules={[
                //   {
                //     required: true,
                //     message: "please select country ",
                //   },
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
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="State"
                name="companyStateId"
                // rules={[
                //   { required: true, message: "please select your state" },
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
          </Row>
          <Row className="w-full">
            <Col span={11}>
              <Form.Item
                label="City"
                name="companyCityId"
                // rules={[
                //   {
                //     required: true,
                //     message: "please select city",
                //   },
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

            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Pin code"
                name="pinCode"
                // rules={[
                //   {
                //     required: true,
                //     message: "please enter pin code",
                //   },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Flex>
      ),
    },
    {
      title: "Last",
      content: (
        <Flex vertical className="w-full">
          <Row>
            <Col span={11}>
              <Form.Item
                label="Company turnover"
                name="companyTurnover"
                // rules={[
                //   {
                //     required: true,
                //     message: "please enter your company turnover",
                //   },
                // ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Located at"
                name="locatedAtId"
                // rules={[
                //   {
                //     required: true,
                //     message: "please select location",
                //   },
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
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item label="Business activity" name="businessActivityId">
                <Select
                  // showSearch
                  onDropdownVisibleChange={() => {
                    setOpenModal(true);
                  }}
                  open={false}
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
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Permanent employees in the company"
                name="permanentEmployee"
                // rules={[
                //   {
                //     required: true,
                //     message: "please enter the number of permanent employee",
                //   },
                // ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Contract employee in the company"
                name="contractEmployee"
                // rules={[
                //   {
                //     required: true,
                //     message: "please enter the number of contract employee",
                //   },
                // ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="GST number"
                name="companyRegistrationNumber"
                // rules={[{ required: true, message: "please enter GST number" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Operating unit address"
                name="operationUnitAddress"
                // rules={[
                //   { required: true, message: "please enter your unit address" },
                // ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
        </Flex>
      ),
    },
  ];

  const next = () => {
    form
      .validateFields()
      .then(() => {
        form.submit();
        setCurrent(current + 1);
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    margin: "16px 4px 0px 4px",
  };

  const handleFinish = useCallback(
    (values, x, y) => {
      setData((prev) => ({ ...prev, ...values }));
      console.log("valuessssss", values, x, y);
      message.success("Processing complete!");
    },
    [current]
  );

  const handleBusinessActivities = useCallback(
    (values) => {
      form.setFieldsValue({ businessActivityId: values?.businessActivityId });
      setOpenModal(false);
    },
    [form]
  );

  console.log("sjxchgASDGVAISDGHLI", data);

  return (
    <>
      <Flex gap={24} justify="space-between" className="py-6 px-24">
        <Image
          src={logo}
          priority={true}
          alt="lowzoom-logo"
          height={"10%"}
          width={"20%"}
        />{" "}
        <Button type="link" size="large" className="text-xl">
          Logout
        </Button>
      </Flex>
      <Flex className="w-full px-24">
        <Steps current={current} items={items} />
      </Flex>
      <div className="m-2 w-99% px-24 py-4" style={contentStyle}>
        <Form
          form={form}
          layout="vertical"
          size="large"
          onFinish={(values, x, y) => handleFinish(values, x, y)}
        >
          {steps[current].content}
        </Form>
      </div>
      <Flex justify={"space-between"} className="w-full px-12 py-6 mt-6">
        <div style={{ display: current === 0 ? "" : "none" }}></div>
        {current > 0 && (
          <Button
            size="large"
            style={{ padding: "4px 32px", font: 14 }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
        <Flex vertical align="center">
          <Title level={3}  className="text-xl">
            Need help?
          </Title>
          <Flex align="center" gap={4}>
            <Title level={4} >
              Call
            </Title>
            <Title level={4} style={{ color: "#1677ff" }}>
              7558 640 644
            </Title>
          </Flex>
          <Text className="text-lg">(9.00 am to 6.00 PM IST, Mon-Fri)</Text>
        </Flex>
        <Flex>
          {current < steps.length - 1 && (
            <Button
              type="primary"
              size="large"
              style={{ padding: "4px 32px", font: 14 }}
              onClick={() => next()}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              size="large"
              style={{ padding: "4px 32px", font: 14 }}
              onClick={() => {
                form.submit();
                router.push(`addUsers`);
              }}
            >
              Done
            </Button>
          )}
        </Flex>
      </Flex>
      <Modal
        title="Select business activity"
        width={800}
        open={openModal}
        okText="Apply"
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => activityForm.submit()}
      >
        <Row>
          <Col span={24}>
            <Select
              className="w-full my-4"
              size="large"
              variant="filled"
              showSearch
              allowClear
              onClear={() => {
                setSelectedOption(null);
                activityForm.resetFields();
                form.resetFields(["businessActivityId"]);
              }}
              placeholder="Search for business activity"
              onSearch={(e) => dispatch(getAllBusinessActivity(e?.trim()))}
              value={selectedOption?.label}
              filterOption={false}
              open={openDropdown}
              onDropdownVisibleChange={(e) => setOpenDropdown(e)}
              dropdownRender={() => {
                return (
                  <div className="grid grid-cols-3 gap-2 p-2 max-h-72 overflow-auto ">
                    {businessActivities?.map((option) => (
                      <div
                        key={option.id}
                        style={{
                          backgroundColor:
                            selectedOption?.value === option?.id
                              ? "#e6f4ff"
                              : null,
                          borderColor:
                            selectedOption?.value === option?.id
                              ? "rgba(5, 145, 255, 0.1)"
                              : null,
                        }}
                        className="border border-solid [border-color:#f0f0f0] p-2 text-left rounded-sm bg [background-color:#fafafa] z [z-index:10000] cursor-pointer"
                        onClick={() => {
                          setSelectedOption({
                            label: option?.businessActivityName,
                            value: option?.id,
                          });
                          setOpenDropdown(false);
                          if (option) {
                            dispatch(
                              getBusinessActivityBySubIndustryId(
                                option?.industrySubCategoryId
                              )
                            );
                            dispatch(
                              getSubIndustryById(option?.industryCategoryId)
                            );

                            activityForm.setFieldsValue({
                              subindustryId: option?.industrySubCategoryId,
                              industryId: option?.industryCategoryId,
                              businessActivityId: option?.id,
                            });
                          }
                        }}
                      >
                        {option.businessActivityName}
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          </Col>
        </Row>
        <Flex className="w-full my-4" justify="center" align="center">
          <Text className="main-heading-text">OR</Text>
        </Flex>
        <Form
          form={activityForm}
          size="large"
          layout="vertical"
          onFinish={handleBusinessActivities}
        >
          <Row>
            <Col span={11}>
              <Form.Item label="Select industry" name="industryId">
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
            <Col span={2} />
            <Col span={11}>
              <Form.Item label="Select subindustry" name="subindustryId">
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
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Select business activity"
                name="businessActivityId"
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
                  onSelect={(x, y) => setSelectedOption(y)}
                  filterOption={selectFilter}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CompanyOnboarding;
