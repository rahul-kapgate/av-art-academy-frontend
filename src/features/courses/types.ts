export interface CoursePricing {
  isFree: boolean;
  priceAmount: number;
  salePriceAmount: number | null;
  currency: string;
}

/* =========================================
   PUBLIC COURSE LIST
========================================== */

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnailUrl: string | null;
  estimatedDurationMinutes: number | null;
  pricing: CoursePricing;
  courseIncludes: string[];
}

/* =========================================
   ACTUAL BACKEND RESPONSE

   Supports the current API spelling
   and the corrected Swagger spelling.
========================================== */

export interface CourseApiItem extends Omit<Course, "thumbnailUrl"> {
  thumbnailUrl?: string | null;
  tuhumbnailUrl?: string | null;
}

export interface CoursesResponse {
  success: boolean;
  message?: string;
  data: CourseApiItem[];
}

/* =========================================
   COURSE MEDIA
========================================== */

export interface CourseMedia {
  thumbnailPath: string | null;
  bannerPath: string | null;
}

/* =========================================
   COURSE ACCESS
========================================== */

export interface CourseAccess {
  type: string;
  durationDays: number | null;
  endAt: string | null;
}

/* =========================================
   SINGLE COURSE DETAILS
========================================== */

export interface CourseDetails {
  id: string;
  title: string;
  slug: string;

  subtitle: string | null;
  shortDescription: string;
  description: string;

  media: CourseMedia;

  category: string | null;
  level: string | null;
  language: string | null;

  estimatedDurationMinutes: number | null;

  pricing: CoursePricing;

  access: CourseAccess;

  whatYouWillLearn: string[];
  courseIncludes: string[];
  courseHighlights: string[];

  certificateAvailable: boolean;
  liveClassesAvailable: boolean;

  whatsappContact: string | null;

  publishedAt: string | null;
}

export interface CourseDetailsResponse {
  success: boolean;
  message?: string;
  data: CourseDetails;
}
