import { Box, Skeleton } from "@radix-ui/themes";

const LoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <br />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingPage;
