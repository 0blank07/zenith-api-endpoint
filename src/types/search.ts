export interface SearchOptions {
  name?: string;
  minRating?: number;
  maxRating?: number;
  auctionable?: boolean;
  position?: string;
  league?: number;
  club?: number;
  nation?: number;
  sortBy?: string;
  sortOrder?: 'desc' | 'asc';
  from?: number;
  size?: number;
  addedDate?: string;
}
