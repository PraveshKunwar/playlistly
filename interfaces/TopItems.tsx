export interface TopItems {
  external_urls: {
    spotify: string;
  };
  name: string;
  followers: {
    href: null | string;
    total: number;
  };
  id: string;
  images: [
    {
      height: number;
      width: number;
      url: string;
    }
  ];
  popularity: number;
  genres: [string];
}
