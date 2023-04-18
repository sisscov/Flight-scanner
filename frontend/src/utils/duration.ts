import { parse, toSeconds } from "iso8601-duration";

const ABBREVIATIONS = {
  HOURS: "h",
  MINUTES: "m",
};

export const formatDuration = (isoDuration: string) => {
  const durationSeconds = toSeconds(parse(isoDuration));
  return `${Math.floor(durationSeconds / 3600)}${ABBREVIATIONS.HOURS} \
                             ${Math.ceil((durationSeconds % 3600) / 60)}${
    ABBREVIATIONS.MINUTES
  }`;
};
