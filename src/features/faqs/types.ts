export interface FAQ {
  id: string;
  question: string;
  answer: string;

  link?: {
    label: string;
    href: string;
    external?: boolean;
  };
}

export interface FAQCategory {
  id: string;
  title: string;
  description: string;
  faqs: FAQ[];
}
