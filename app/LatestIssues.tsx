import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import IssueStatusBadge from "./components/IssueStatusBadge";
import Link from "next/link";

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: { created_at: "desc" },
    take: 5,
    include: {
      assigned_to: true,
    },
  });

  return (
    <Card>
      <Heading size="2" mb="2">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>{" "}
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assigned_to && (
                    <Avatar
                      src={issue.assigned_to.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
