import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import { IssueDetails } from "./IssueDetails";
import { cache } from "react";

const fetchIssues = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

interface Props {
  params: { id: string };
}
const page = async ({ params: { id } }: Props) => {
  const issue = await fetchIssues(parseInt(id));

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} />
          <EditIssueButton id={issue.id} />
          <DeleteIssueButton id={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssues(parseInt(params.id));

  if (!issue) return notFound();

  return {
    title: issue.title,
    description: "Details of issue " + issue.title,
  };
}

export default page;
