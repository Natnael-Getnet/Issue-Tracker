import { Card, Flex, Skeleton } from "@radix-ui/themes";

const LoadingPage = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card mt="4">
        <Skeleton />
        <br />
        <Skeleton />
        <br />
        <Skeleton />
      </Card>
    </div>
  );
};

export default LoadingPage;
