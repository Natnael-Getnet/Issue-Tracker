import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./_components/IssueStatusFilter";

const IssuesToolBar = () => {
  return (
    <Flex justify="between" mb="3">
      <IssueStatusFilter />

      <Button className="p-8">
        <Link href="/issues/new">Add Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssuesToolBar;
