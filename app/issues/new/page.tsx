import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueFrom = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueFrom />;
};

export default NewIssuePage;
