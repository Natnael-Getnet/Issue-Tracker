import { useQuery } from "@tanstack/react-query";

const fetchIssues = () => {
  const {} = useQuery({
    queryKey: ["issues"],
    queryFn: () => {},
  });
};
