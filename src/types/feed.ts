export interface Photo {
  id: string;
  author: string;
  download_url: string;
};

export interface FeedState {
  images: Photo[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
};