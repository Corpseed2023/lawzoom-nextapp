"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  notification,
  Row,
  Typography,
} from "antd";
import logo from "../assets/lowZoom.png";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createEnquiry } from "./redux-toolkit/slices/commonSlice";
import dynamic from "next/dynamic";
import Loading from "./loading";
const { Text } = Typography;
const CommonPopOver = dynamic(() => import("./common/CommonPopOver"), {
  loading: () => <Loading />,
  ssr: false,
});
const ServiceContent = dynamic(() => import("./common/ServiceContent"), {
  loading: () => <Loading />,
  ssr: false,
});
const PartnersContent = dynamic(() => import("./common/PartnersContent"), {
  loading: () => <Loading />,
  ssr: false,
});
const CompanyContent = dynamic(() => import("./common/CompanyContent"), {
  loading: () => <Loading />,
  ssr: false,
});

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [serviceOpenChange, setServiceOpenChange] = useState(false);
  const [partnerOpenChange, setPartnerOpenChange] = useState(false);
  const [companyOpenChange, setCompanyOpenChange] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  const logos = [
    "https://www.designrush.com/uploads/users/customer-12/image_1532370547_K2BS8iYkjQHBA8JhHKuArTd5ptOTR3DzNlFvIaft.png",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370530_PUupRl8PHyZvMCs2KRMuskJdYeyqW3IeacT72WYE.png",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370578_0mRzJtSfsuLaBrBZZwcyUdSRtyvmHmndLQ2iFIZO.png",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370597_fxvyDE7rRXPffHwfK04VsV3Fxr8YGOlSNmmfQ7mH.png ",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370621_l2SsCMBQ7M5SXBm7KabSIx0u1ZTcMU9tDCRyEtpW.jpeg",
    "https://www.designrush.com/uploads/users/customer-2/image_1505931862_e2896044118462ae451d87076f16ce6d.jpeg",
    "https://www.designrush.com/uploads/users/customer-2/image_1505931872_4231f9d8068ec8e9188a926eb42885e3.png",
    "https://www.designrush.com/uploads/users/customer-2/image_1505931969_932f312aeb5789608e890a8a5ba07c7f.jpeg",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370547_K2BS8iYkjQHBA8JhHKuArTd5ptOTR3DzNlFvIaft.png",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370530_PUupRl8PHyZvMCs2KRMuskJdYeyqW3IeacT72WYE.png",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370578_0mRzJtSfsuLaBrBZZwcyUdSRtyvmHmndLQ2iFIZO.png",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370597_fxvyDE7rRXPffHwfK04VsV3Fxr8YGOlSNmmfQ7mH.png ",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370621_l2SsCMBQ7M5SXBm7KabSIx0u1ZTcMU9tDCRyEtpW.jpeg",
    "https://www.designrush.com/uploads/users/customer-2/image_1505931862_e2896044118462ae451d87076f16ce6d.jpeg",
    "https://www.designrush.com/uploads/users/customer-2/image_1505931872_4231f9d8068ec8e9188a926eb42885e3.png",
    "https://www.designrush.com/uploads/users/customer-2/image_1505931969_932f312aeb5789608e890a8a5ba07c7f.jpeg",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370547_K2BS8iYkjQHBA8JhHKuArTd5ptOTR3DzNlFvIaft.png",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370530_PUupRl8PHyZvMCs2KRMuskJdYeyqW3IeacT72WYE.png",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370578_0mRzJtSfsuLaBrBZZwcyUdSRtyvmHmndLQ2iFIZO.png",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370597_fxvyDE7rRXPffHwfK04VsV3Fxr8YGOlSNmmfQ7mH.png ",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370621_l2SsCMBQ7M5SXBm7KabSIx0u1ZTcMU9tDCRyEtpW.jpeg",
    "https://www.designrush.com/uploads/users/customer-2/image_1505931862_e2896044118462ae451d87076f16ce6d.jpeg",
    "https://www.designrush.com/uploads/users/customer-2/image_1505931872_4231f9d8068ec8e9188a926eb42885e3.png",
    "https://www.designrush.com/uploads/users/customer-2/image_1505931969_932f312aeb5789608e890a8a5ba07c7f.jpeg",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370547_K2BS8iYkjQHBA8JhHKuArTd5ptOTR3DzNlFvIaft.png",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370530_PUupRl8PHyZvMCs2KRMuskJdYeyqW3IeacT72WYE.png",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370578_0mRzJtSfsuLaBrBZZwcyUdSRtyvmHmndLQ2iFIZO.png",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370597_fxvyDE7rRXPffHwfK04VsV3Fxr8YGOlSNmmfQ7mH.png ",
    "https://www.designrush.com/uploads/users/customer-12/image_1532370621_l2SsCMBQ7M5SXBm7KabSIx0u1ZTcMU9tDCRyEtpW.jpeg",
    "https://www.designrush.com/uploads/users/customer-2/image_1505931862_e2896044118462ae451d87076f16ce6d.jpeg",
    "https://www.designrush.com/uploads/users/customer-2/image_1505931872_4231f9d8068ec8e9188a926eb42885e3.png",
    "https://www.designrush.com/uploads/users/customer-2/image_1505931969_932f312aeb5789608e890a8a5ba07c7f.jpeg",
  ];

  const handleFinish = (values) => {
    dispatch(createEnquiry(values))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          form.resetFields();
          notification.success({ message: "Enquiry added successfully" });
        } else {
          notification.error({ message: "Something went wrong !." });
        }
      })
      .catch(() => notification.error({ message: "Something went wrong !." }));
  };

  return (
    render && (
      <>
        <div className="!sticky !inset-0 top-0 z-[100] w-full flex items-center bg-white px-28 py-6">
          <Flex justify="space-between" className="w-full">
            <Image
              src={logo}
              priority={true}
              alt="lowzoom-logo"
              height={"10%"}
              width={"20%"}
            />
            <Flex justify="flex-end" align="center" gap={24}>
              <ul className="flex justify-center gap-6 text-lg leading-relaxed">
                <li className="flex items-center leading-relaxed cursor-pointer">
                  <CommonPopOver
                    content={<ServiceContent />}
                    onOpenChange={(e) => setServiceOpenChange(e)}
                  >
                    <Flex align="center" gap={8}>
                      <h4>Services</h4>{" "}
                      <Icon
                        icon="fluent:chevron-down-24-filled"
                        className={`transform transition-transform duration-300 ${
                          serviceOpenChange ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </Flex>
                  </CommonPopOver>
                </li>
                <li className="flex items-center leading-relaxed cursor-pointer">
                  <CommonPopOver
                    content={<PartnersContent />}
                    onOpenChange={(e) => setPartnerOpenChange(e)}
                  >
                    <Flex align="center" gap={8}>
                      <h4>Partner</h4>{" "}
                      <Icon
                        icon="fluent:chevron-down-24-filled"
                        className={`transform transition-transform duration-300 ${
                          partnerOpenChange ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </Flex>
                  </CommonPopOver>
                </li>
                <li className="flex items-center leading-relaxed cursor-pointer">
                  <CommonPopOver
                    content={<CompanyContent />}
                    onOpenChange={(e) => setCompanyOpenChange(e)}
                  >
                    <Flex align="center" gap={8}>
                      <h4>Company</h4>{" "}
                      <Icon
                        icon="fluent:chevron-down-24-filled"
                        className={`transform transition-transform duration-300 ${
                          companyOpenChange ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </Flex>
                  </CommonPopOver>
                </li>
              </ul>
              <Button
                shape="round"
                size="large"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </Flex>
          </Flex>
        </div>
        <div>
          <Flex
            vertical
            gap={48}
            className="my-1 bg-white h-full overflow-auto"
          >
            <Row className="p-4">
              <Col span={1} />
              <Col span={13}>
                <Flex vertical gap={42}>
                  <Flex vertical gap={8}>
                    <h1 className="!text-7xl !font-bold ">Trade Finance & </h1>
                    <h1 className="!text-7xl !font-bold ">Working Capital</h1>
                    <h1 className="!text-7xl !font-bold ">Solutions</h1>
                  </Flex>
                  <Flex>
                    <p className="!text-3xl tracking-normal font-gilroy ">
                      Empower trade and enhance working capital needs offering
                      instant cash without the need for collateral. We go beyond
                      financial services – we embody your company's enduring
                      vision.
                    </p>
                  </Flex>
                </Flex>
              </Col>
              <Col
                span={9}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Flex
                  className="enquiry-form-container"
                  vertical
                  align="center"
                >
                  <Form
                    layout="vertical"
                    form={form}
                    size="large"
                    style={{ width: "90%" }}
                    onFinish={handleFinish}
                  >
                    <Form.Item
                      label="Full name"
                      name="fullName"
                      rules={[
                        {
                          required: true,
                          message: "please enter your full name",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Desigination"
                      name="designation"
                      rules={[
                        {
                          required: true,
                          message: "please enter your desigination",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Phone"
                      name="mobile"
                      rules={[
                        {
                          required: true,
                          message: "please enter your phone number",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Company name"
                      name="companyName"
                      rules={[
                        {
                          required: true,
                          message: "please enter your company name",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        type="primary"
                        style={{ width: "100%" }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                  <Text type="secondary">
                    By registering you have read and agree to the
                  </Text>
                </Flex>
              </Col>
              <Col span={1} />
            </Row>
            <Row className="w-full">
              <div className="scroller-container">
                {/* Scrolling Content */}
                <div className="scroller">
                  {/* Render Logos Twice for Seamless Loop */}
                  {logos.concat(logos).map((logo, index) => (
                    <img
                      key={index}
                      src={logo}
                      alt={`Logo ${index}`}
                      className="logo"
                    />
                  ))}
                </div>
              </div>
            </Row>
            <Row className="w-full bg-custom-blue p-8 flex flex-col items-center h-auto gap-24">
              <h1 className="text-7xl text-white">Key Offerings</h1>
              <Flex className="w-full justify-center" gap={32}>
                <Flex
                  vertical
                  className="flex items-center border-solid bg-white rounded-md p-24"
                  gap={24}
                >
                  <h2 className="text-2xl text-custom-blue">
                    Import Financing
                  </h2>
                  <h6>Learn More</h6>
                </Flex>
                <Flex
                  vertical
                  className=" flex items-center border-solid bg-white rounded-md p-24"
                  gap={24}
                >
                  <h2 className="text-2xl text-custom-blue">
                    Import Financing
                  </h2>
                  <h6>Learn More</h6>
                </Flex>
                <Flex
                  vertical
                  className="flex items-center border-solid bg-white rounded-md p-24"
                  gap={24}
                >
                  <h2 className="text-2xl text-custom-blue">
                    Import Financing
                  </h2>
                  <h6>Learn More</h6>
                </Flex>
              </Flex>
            </Row>
          </Flex>
        </div>
      </>
    )
  );
};

export default Home;
