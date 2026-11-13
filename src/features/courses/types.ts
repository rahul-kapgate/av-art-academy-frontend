export interface CoursePricing {
  isFree: boolean;
  priceAmount: number;
  salePriceAmount: number | null;
  currency: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnailPath: string | null;
  estimatedDurationMinutes: number;
  pricing: CoursePricing;
  courseIncludes: string[];
}

export interface CoursesResponse {
  success: boolean;
  data: Course[];
}
