"use client";

import { Issue, User } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, isError, error } = useUsers();

  const assignIssue = (user_id: string) =>
    axios
      .patch("/api/issues/" + issue.id, {
        user_id: user_id === "0" ? null : user_id,
      })
      .catch(() => {
        toast.error("Changed cannot be saved!!!");
      });
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   async function getUsers() {
  //     const { data } = await axios.get<User[]>("/api/users");
  //     setUsers(data);
  //   }
  //   getUsers();
  // }, []);

  if (isLoading) return <Skeleton />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <Select.Root
        defaultValue={issue.user_id || "0"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign ..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="0">Unassign</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60 seconds
    retry: 3,
  });

export default AssigneeSelect;
