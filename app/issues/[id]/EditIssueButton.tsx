import Link from "@/app/components/Link";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

const EditIssueButton = ({ id }: { id: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/${id}/edit`}>Edit page</Link>
    </Button>
  );
};

export default EditIssueButton;
