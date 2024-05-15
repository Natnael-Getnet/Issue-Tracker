"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdDangerous } from "react-icons/md";
import SimpleMDE from "react-simplemde-editor";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl">
      {!error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <MdDangerous />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            if (axios.isAxiosError(error)) {
              error.response?.data.map(
                (e: { path: string[]; message: string }) => {
                  if (e.path[0] == "title") {
                    setTitleError(e.message);
                  } else if (e.path[0] == "description") {
                    setDescriptionError(e.message);
                  }
                }
              );
            } else {
              setError("Unexpected error occurred.");
            }
          }
        })}
      >
        <TextField.Root size="2" placeholder="Title" {...register("title")} />
        {titleError && (
          <span>
            <Callout.Root color="red" className="mt-2">
              <Callout.Icon>
                <MdDangerous />
              </Callout.Icon>
              <Callout.Text>{titleError}</Callout.Text>
            </Callout.Root>
          </span>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {descriptionError && (
          <Callout.Root color="red">
            <Callout.Icon>
              <MdDangerous />
            </Callout.Icon>
            <Callout.Text>{descriptionError}</Callout.Text>
          </Callout.Root>
        )}

        <Button>Submit new Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
