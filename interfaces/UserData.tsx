export interface UserData {
  display_name: string;
  email: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  images: [
    {
      height: number;
      width: number;
      url: string;
    }
  ];
  product: string;
  type: string;
}
