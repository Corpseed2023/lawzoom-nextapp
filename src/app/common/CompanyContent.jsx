import { Flex } from "antd";
import React from "react";
import ComonLinkItem from "./ComonLinkItem";
import {
  LINK_ICON_COLOR,
  LINK_ICON_HEIGTH,
  LINK_ICON_WIDTH,
} from "../contants";
import { Icon } from "@iconify/react";

const CompanyContent = () => {
  return (
    <Flex className="max-w-4xl grid grid-cols-2 gap-8 p-4">
      <ComonLinkItem
        icon={
          <Icon
            icon="fluent:building-desktop-24-regular"
            height={LINK_ICON_HEIGTH}
            width={LINK_ICON_WIDTH}
            color={LINK_ICON_COLOR}
          />
        }
        title={"About Company"}
        description={
          "At Tradbee®, we are committed to offer affordable and convenient trade finance solutions."
        }
      />

      <ComonLinkItem
        icon={
          <Icon
            icon="fluent:book-contacts-24-regular"
            height={LINK_ICON_HEIGTH}
            width={LINK_ICON_WIDTH}
            color={LINK_ICON_COLOR}
          />
        }
        title={"Contact"}
        description={
          "Still seeking clarity on our process? engage with our Export Finance Advisor."
        }
      />
      <ComonLinkItem
        icon={
          <Icon
            icon="fluent:globe-surface-24-regular"
            height={LINK_ICON_HEIGTH}
            width={LINK_ICON_WIDTH}
            color={LINK_ICON_COLOR}
          />
        }
        title={"Careers"}
        description={
          "Work with Tradbee, we invest in the power of people to move the world forward."
        }
      />
      <ComonLinkItem
        icon={
          <Icon
            icon="fluent:globe-24-regular"
            height={LINK_ICON_HEIGTH}
            width={LINK_ICON_WIDTH}
            color={LINK_ICON_COLOR}
          />
        }
        title={"Knowledge Center"}
        description={
          "Elevate your product understanding with comprehensive feature overviews and insights."
        }
      />
    </Flex>
  );
};

export default CompanyContent;
