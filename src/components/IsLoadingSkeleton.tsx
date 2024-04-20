import { Skeleton } from "primereact/skeleton";

const IsLoadingSkeleton = (props: { isLoading: any; children?: any }) => {
  const { isLoading, children } = props;
  return <>{isLoading ? <Skeleton height="100px" width="100%" /> : <>{children}</>}</>;
};

const IsLoadingDropdow = (props: { isLoading: any; children?: any }) => {
  const { isLoading, children } = props;
  return <>{isLoading ? <Skeleton height="50px" width="100%" /> : <>{children}</>}</>;
};

export { IsLoadingSkeleton, IsLoadingDropdow };
