export interface ActivityInterface {
  articles: {
    icon: number;
    text: string;
    time: string;
    comment: string;
    uploads: {
      url: string;
      alt: string;
    }[] | string;
  }[]
}