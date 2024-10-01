export type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  goal?: string;
  membership?: string;
  membershipData?: Membership;
};

export type Membership = {
  title: string;
  price: string;
  features: string[];
  color: string;
  image: string;
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
  journey: AboutListItemData[];
};
