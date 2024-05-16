import Link from "@/app/components/Link";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

const DeleteIssueButton = ({ id }: { id: number }) => {
  return (
    <Button color="red">
      <TrashIcon />
      <Link href={`/issues/${id}/delete`}>Delete issue</Link>
    </Button>
  );
};

export default DeleteIssueButton;
