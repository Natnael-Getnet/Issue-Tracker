import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import { IssueDetails } from "./IssueDetails";
import EditIssueButton from "./EditIssueButton";

interface Props {
  params: { id: string };
}
const page = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex gap="4">
          <EditIssueButton id={issue.id} />
          <DeleteIssueButton id={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default page;
