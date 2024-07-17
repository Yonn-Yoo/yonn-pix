export interface ImageDataType {
  id: string;
  slug: string;
  alternative_slugs: AlternativeSlugsType;
  created_at: Date;
  updated_at: Date;
  promoted_at: Date;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: null | string;
  alt_description: string;
  breadcrumbs: BreadcrumbType[];
  urls: UrlsType;
  links: WelcomeLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: null;
  topic_submissions: TopicSubmissions;
  asset_type: AssetType;
  user: UserType;
  exif: ExifType;
  location: LocationType;
  views: number;
  downloads: number;
  profile_image: { large: string; medium: string; small: string };
}

export interface AlternativeSlugsType {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  ko: string;
  de: string;
  pt: string;
}

export enum AssetType {
  Photo = 'photo',
}

export interface BreadcrumbType {
  slug: string;
  title: string;
  index: number;
  type: string;
}

export interface ExifType {
  make: null | string;
  model: null | string;
  name: null | string;
  exposure_time: null | string;
  aperture: null | string;
  focal_length: null | string;
  iso: number | null;
}

export interface WelcomeLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface LocationType {
  name: null | string;
  city: null | string;
  country: null | string;
  position: Position;
}

export interface Position {
  latitude: number | null;
  longitude: number | null;
}

export interface TopicSubmissions {
  nature?: Animals;
  travel?: Animals;
  wallpapers?: Animals;
  film?: Animals;
  spirituality?: Experimental;
  'fashion-beauty'?: Animals;
  people?: Animals;
  animals?: Animals;
  'golden-hour'?: Experimental;
  experimental?: Experimental;
}

export interface Animals {
  status: Status;
  approved_on?: Date;
}

export enum Status {
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface Experimental {
  status: Status;
}

export interface UrlsType {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export interface UserType {
  id: string;
  updated_at: Date;
  username: string;
  name: string;
  first_name: string;
  last_name: null | string;
  twitter_username: null | string;
  portfolio_url: null | string;
  bio: null | string;
  location: null | string;
  links: UserLinks;
  profile_image: ProfileImage;
  instagram_username: null | string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

export interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface Social {
  instagram_username: null | string;
  portfolio_url: null | string;
  twitter_username: null | string;
  paypal_email: null;
}

export type ModalType = {
  isOpen: boolean;
  type: 'login' | 'detail' | null;
  imageData?: ImageDataType;
  data: any;
};
