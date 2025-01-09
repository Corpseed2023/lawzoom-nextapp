import { Popover } from "antd";
import React from "react";

const CommonPopOver = ({ children, content,onOpenChange }) => {
  return (
    <Popover className="group" onOpenChange={onOpenChange} content={content}>
      {children}
    </Popover>
  );
};

export default CommonPopOver;
