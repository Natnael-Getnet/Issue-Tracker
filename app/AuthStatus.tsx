import { Avatar, Box, DropdownMenu, Skeleton, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading")
    return (
      <Skeleton>
        <Link className="nav-link" href="">
          Login
        </Link>
      </Skeleton>
    );

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            size="2"
            radius="full"
            src={session!.user!.image!}
            fallback="?"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content sideOffset={15}>
          <DropdownMenu.Label>
            <Text size="2">{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default AuthStatus;
