import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuesPage = () => {
  return (
    <>
      <Button>
        <Link href="/issues/new">Add Issue</Link>
      </Button>
      <p>Issues Page</p>
    </>
  );
};

export default IssuesPage;
