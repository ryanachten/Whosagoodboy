// Dataset labels use the following format - n02086646-blenheim_spaniel
// this helper formats them nicely for display
export const formatDisplayLabel = (rawLabel: string): string => {
  // 1. remove prefix
  const prefixRegex = /n\d{8}-/;
  let label = rawLabel.replace(prefixRegex, "");

  // 2. remove underscores
  label = label.replaceAll("_", " ");

  return label;
};
