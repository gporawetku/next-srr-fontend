import { checkSubstring, extractFirstSegment } from "@/libs/utils/CheckSubstring";

const ActiveMenu = (pathName: any, target: any) => {
  const normalizedPath = pathName.startsWith("/") ? pathName : `/${pathName}`;
  const normalizedTarget = target.startsWith("/") ? target : `/${target}`;

  if (normalizedTarget === "/dashboard") {
    return normalizedPath === "/" ? "active-block" : "";
  }

  const targetSegment = extractFirstSegment(normalizedTarget);
  return normalizedPath.includes(targetSegment) ? "active-block" : "";
};

export { ActiveMenu };
