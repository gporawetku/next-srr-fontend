"use client";
export interface BreadcrumbItemProps {
  label: string;
  url?: string;
}

const Breadcrumb = ({ item }: { item: BreadcrumbItemProps[] }) => {
  return (
    <>
      <nav className="w-full">
        <ol className="flex gap-2" style={{ marginBottom: "0px" }}>
          {item?.map((item: any, idx: any) => (
            <li key={idx} className="text-sm" aria-current={!item?.url && "page"}>
              {idx !== 0 && "/ "}
              {item?.url ? (
                <a href={item?.url} className="hover:text-[#EF4036]">
                  {item?.label}
                </a>
              ) : (
                item?.label
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
