import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    {
      label: "Open issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "In progress issues",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed issues",
      value: closed,
      status: "CLOSED",
    },
  ];

  return (
    <Flex gap="4">
      {containers.map((container, index) => (
        <Card key={index}>
          <Flex direction="column" gap="1">
            <Link
              className="font-medium text-sm"
              href={`/issues?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
