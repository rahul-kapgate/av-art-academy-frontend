
const ALLOWED_IMAGE_HOST =
  "artisticvickey-v3.s3.ap-south-2.amazonaws.com";

export function getCourseImageUrl(
  path: string | null | undefined,
): string | null {
  if (!path?.trim()) {
    return null;
  }

  try {
    const url = new URL(path);

    if (
      url.protocol !== "https:" ||
      url.hostname !== ALLOWED_IMAGE_HOST ||
      !url.pathname.startsWith(
        "/Courses-images/",
      )
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}
