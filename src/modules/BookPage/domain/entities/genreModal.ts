export interface GenrePayload {
  title: "string";
  image_url: "string";
}

export type GenreRequest = {
  id?: number;
  title: string;
  image_url: string;
};
