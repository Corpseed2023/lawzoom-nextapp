import { Skeleton } from "antd";
import React from "react";

const BoxScalaton = ({ height }) => {
  return (
    <>
      <div className="py-2">
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      </div>
    </>
  );
};

export default BoxScalaton;
