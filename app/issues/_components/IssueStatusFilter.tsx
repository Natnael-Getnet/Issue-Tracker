"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const IssueStatusFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterIssues = (status: string) => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);

    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);

    const query = params.size ? "?" + params.toString() : "";
    router.push(`/issues/${query}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "0"}
      onValueChange={filterIssues}
    >
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
