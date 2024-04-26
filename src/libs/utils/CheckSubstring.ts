const checkSubstring = (text: string, target: any) => {
  const isTargetPresent = text?.includes(target);
  return isTargetPresent;
};

const extractFirstSegment = (input: string) => {
  const parts = input.split("/");
  return parts.length > 1 ? parts[1] : "";
};

const extractFirstSegmentUrl = (input: string) => {
  const segments = input.split("/").filter(Boolean);
  return segments.length > 0 ? `/${segments[0]}` : "";
};

export { checkSubstring, extractFirstSegment, extractFirstSegmentUrl };
