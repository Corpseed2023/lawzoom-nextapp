import { Flex } from "antd";
import Link from "next/link";
import React from "react";
import ComonLinkItem from "./ComonLinkItem";
import { Icon } from "@iconify/react";
import {
  LINK_ICON_COLOR,
  LINK_ICON_HEIGTH,
  LINK_ICON_WIDTH,
} from "../contants";

const ServiceContent = () => {
  return (
    <Flex className="max-w-4xl grid grid-cols-2 gap-8 p-4">
      <ComonLinkItem
        icon={
          <Icon
            icon="fluent:globe-desktop-24-regular"
            height={LINK_ICON_HEIGTH}
            width={LINK_ICON_WIDTH}
            color={LINK_ICON_COLOR}
          />
        }
        title={"Import Financing"}
        description={
          "Engages in importing goods from international markets, we can extend credit limits without requiring collateral, allowing you up to 120 days of credit."
        }
      />
      <ComonLinkItem
        icon={
          <Icon
            icon="fluent:handshake-24-regular"
            height={LINK_ICON_HEIGTH}
            width={LINK_ICON_WIDTH}
            color={LINK_ICON_COLOR}
          />
        }
        title={"Export Financing"}
        description={
          "Export Financing For credit-based sales to buyers, we cover the credit period and safeguard you against any potential payment defaults by the buyer."
        }
      />
      <ComonLinkItem
        icon={
          <Icon
            icon="fluent:attach-24-regular"
            height={LINK_ICON_HEIGTH}
            width={LINK_ICON_WIDTH}
            color={LINK_ICON_COLOR}
          />
        }
        title={"Domestic Trade Financing"}
        description={
          "Domestic Trade Financing Engaging in domestic credit-based sales? Our financing solutions ensure your credit period is covered, mitigating risks of buyer payment defaults."
        }
      />
      <ComonLinkItem
        icon={
          <Icon
            icon="fluent:currency-dollar-euro-24-regular"
            height={LINK_ICON_HEIGTH}
            width={LINK_ICON_WIDTH}
            color={LINK_ICON_COLOR}
          />
        }
        title={"Working Capital Financing"}
        description={
          "Working Capital Financing immediate funds to manage your inventory, cover payroll, make supplier payments, and handle other operational expenses."
        }
      />
    </Flex>
  );
};

export default ServiceContent;
