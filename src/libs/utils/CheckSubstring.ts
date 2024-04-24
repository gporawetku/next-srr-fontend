const checkSubstring = (text: string, target: any) => {
  const isTargetPresent = text?.includes(target);
  return isTargetPresent;
};

const extractFirstSegment = (input: string) => {
  const parts = input.split("/");
  return parts.length > 1 ? parts[1] : "";
};

export { checkSubstring, extractFirstSegment };
