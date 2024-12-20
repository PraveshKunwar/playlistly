export type time = "long_term" | "medium_term" | "short_term";
export type type = "artists" | "tracks";

export interface FormData {
  time_range: time | undefined;
  typeOf: type | undefined;
  limit: number | undefined;
}
