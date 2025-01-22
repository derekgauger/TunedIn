export type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  goal: string;
  membership?: string;
  membershipData?: Membership;
  avatar: string;
  isAdmin: boolean;
  verifiedPhone: boolean;
  verifiedEmail: boolean;
  latestChangeMembershipRequest: string;
};

export type Membership = {
  title: string;
  price: string;
  features: string[];
  color: string;
  image: string;
  description: string;
  testimonial: string;
  testimonialAuthor: string;
};

export type AboutCompanyInfoData = {
  logo: string;
  name: string;
  description: string;
};

export type AboutListItemData = {
  icon: React.ReactElement;
  primary: string;
  secondary: string;
};

export type AboutSectionData = {
  title: string;
  content: string;
  listItems?: AboutListItemData[];
};

export type AboutFounderData = {
  name: string;
  description: string;
  image: string;
  journey?: AboutListItemData[];
};

export type RedirectCardData = {
  title: string;
  description: string;
  link: string;
  buttonText: string;
  icon: React.ElementType;
  backgroundImage?: string;
};

export type EmailSettings = {
  name: string;
  email: string;
  subject: string;
  body: string;
  templateName?: string;
};

export type FileData = {
  id: number;
  fileName: string;
  contentType: string;
  fileSize: number;
  uploadDate: string;
  userId: number;
};

export type FilePreview = {
  id: number;
  url: string;
};

export type Log = {
  id: number;
  type: string;
  message: string;
  createdAt: string;
};

export type Picture = {
  id: number;
  fileName: string;
  title: string;
  description: string;
  uploadDate: string;
  fileSize: number;
  imageUrl: string;
  thumbnailUrl: string;
};
