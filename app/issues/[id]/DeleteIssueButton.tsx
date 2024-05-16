"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/issues/" + id);
      router.push("/issues");
      router.refresh();
      setIsDeleting(false);
    } catch (error) {
      setError(true);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color="red">
            <TrashIcon />
            Delete issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action can not be
            reverted!
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>

            <AlertDialog.Action>
              <Button color="red" onClick={deleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button
            className="mt-3"
            variant="soft"
            color="gray"
            onClick={() => setError(false)}
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
