import { Flex } from "antd";
import Link from "next/link";
import React from "react";

const ComonLinkItem = ({ icon, description, title }) => {
  return (
    <Flex justify='center' gap={12}>
      <Flex>{icon}</Flex>
      <Flex vertical gap={8}>
        <Link href={""} className="text-lg font-semibold hover:underline">
          {title}
        </Link>
        <p className="text-sm flex flex-wrap">{description}</p>
      </Flex>
    </Flex>
  );
};

export default ComonLinkItem;
