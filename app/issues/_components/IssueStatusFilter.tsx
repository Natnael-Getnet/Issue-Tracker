"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const IssueStatusFilter = () => {
  const router = useRouter();
  const filterIssues = (status: string) => {
    const query = status === "0" ? "" : `?status=${status}`;
    router.push(`/issues/${query}`);
  };

  return (
    <Select.Root onValueChange={filterIssues}>
      <Select.Trigger placeholder="Filter by Status ..." />
      <Select.Content>
        <Select.Item value="0">All</Select.Item>
        <Select.Item value={Status.OPEN}>OPEN</Select.Item>
        <Select.Item value={Status.IN_PROGRESS}>IN PROGRESS</Select.Item>
        <Select.Item value={Status.CLOSED}>CLOSED</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
