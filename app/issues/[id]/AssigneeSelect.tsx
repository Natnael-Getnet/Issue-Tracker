"use client";

import { User } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
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
    <Select.Root>
      <Select.Trigger placeholder="Assign ..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
