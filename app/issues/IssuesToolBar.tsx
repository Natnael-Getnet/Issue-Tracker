import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuesToolBar = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/issues/new">Add Issue</Link>
      </Button>
    </div>
  );
};

export default IssuesToolBar;
