import React from "react";
import ComonLinkItem from "./ComonLinkItem";
import { Icon } from "@iconify/react";
import {
  LINK_ICON_COLOR,
  LINK_ICON_HEIGTH,
  LINK_ICON_WIDTH,
} from "../contants";
import { Flex } from "antd";

const PartnersContent = () => {
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
        title={"Become Investor"}
        description={
          "Broaden your investment portfolio with trade finance opportunities at an institutional level."
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
        title={"Become Channel Partner"}
        description={
          "Become Channel Partner Capitalize your connections with exporters by enrolling in our Channel Partnership Program."
        }
      />
    </Flex>
  );
};

export default PartnersContent;
