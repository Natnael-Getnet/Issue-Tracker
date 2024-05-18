import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";
import Link from "../components/Link";
import NextLink from "next/link";
import IssuesToolBar from "./IssuesToolBar";
import { stat } from "fs";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const columns: { title: string; value: keyof Issue; className?: string }[] = [
    { title: "Title", value: "title" },
    { title: "Status", value: "status", className: "hidden md:table-cell" },
    {
      title: "Created",
      value: "created_at",
      className: "hidden md:table-cell",
    },
  ];

  const issues = await prisma.issue.findMany({
    where: { status },
  });

  return (
    <>
      <IssuesToolBar />
      <Table.Root variant={"surface"}>
        <Table.Header>
          <Table.Row>
            {columns.map(({ title, value, className }, index) => (
              <Table.ColumnHeaderCell key={index} className={className}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: value },
                  }}
                >
                  {title}{" "}
                  {value === searchParams.orderBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.created_at.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
