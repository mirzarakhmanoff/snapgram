export interface CounterState {
  value: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export interface FormLogin {
  username: string;
  password: string;
}

export interface FormData {
  full_name: string;
  username: string;
  email: string;
  password: string;
}

export interface UserItems {
  id: number;
  img: string;
  nickname: string;
}

export interface CreatorsProps {
  creators: any[];
  error: any;
  isLoading: boolean;
  title: string;
}

export interface AuthProps {
  children: React.ReactNode;
}

export interface CommentInputProps {
  id: string;
  refetch?: () => void;
}

export interface CommentsProps {
  comments: {
    user: { fullName: string };
    message: string;
    createdAt: string;
    likes: number;
  }[];
  isLoading: boolean;
}

export interface PostType {
  _id: string;
  caption: string;
  content_alt: string;
  createdAt: string;
  content: [
    {
      url: string;
      type: "AUDIO" | "VIDEO" | "IMAGE";
    }
  ];
  likes_count: number;
  comments_count: number;
  shares_count: number;
  owner: any;
  photo: string;
}

export interface ContentItem {
  type: "IMAGE" | "VIDEO";
  url: string;
}

export interface PostImageProps {
  data: {
    content: ContentItem[];
  };
  isLoading: boolean;
  id: any;
}

export interface PostItemProps {
  post: any;
  setGalleryImage?: (url: string) => void;
  refetch?: () => void;
}

export interface UserData {
  username: string;
  fullName?: string;
  photo?: string;
  createdAt?: string;
}

export interface UserProfileProps {
  userData: UserData;
  linkPrefix?: string;
  showFullName?: boolean;
  showDate?: boolean;
}

export interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}
