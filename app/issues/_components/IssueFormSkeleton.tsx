import { Box, Skeleton } from "@radix-ui/themes";
import React from "react";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <br />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
