
import type { CoursePricing } from "../types";

/* =========================================
   FORMAT PRICE FROM MINOR CURRENCY UNITS
========================================== */

export function formatCoursePrice(
  amount: number,
  currency = "INR",
): string {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,

    minimumFractionDigits: 0,
  });

  const currencyDigits =
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
    }).resolvedOptions().maximumFractionDigits;

  const divisor =
    10 ** (currencyDigits ?? 2);

  return formatter.format(amount / divisor);
}

/* =========================================
   CALCULATE COURSE PRICING
========================================== */

export function getCoursePricing(
  pricing: CoursePricing,
) {
  const {
    isFree,
    priceAmount,
    salePriceAmount,
    currency,
  } = pricing;

  const hasDiscount =
    !isFree &&
    priceAmount > 0 &&
    salePriceAmount !== null &&
    salePriceAmount >= 0 &&
    salePriceAmount < priceAmount;

  const finalAmount = isFree
    ? 0
    : hasDiscount
      ? salePriceAmount!
      : priceAmount;

  const savingsAmount = hasDiscount
    ? priceAmount - finalAmount
    : 0;

  const discountPercentage = hasDiscount
    ? Math.round(
        (savingsAmount / priceAmount) * 100,
      )
    : 0;

  return {
    isFree,

    hasDiscount,

    finalAmount,

    savingsAmount,

    discountPercentage,

    displayPrice: isFree
      ? "Free"
      : formatCoursePrice(
          finalAmount,
          currency,
        ),

    originalPrice: formatCoursePrice(
      priceAmount,
      currency,
    ),

    displaySavings: formatCoursePrice(
      savingsAmount,
      currency,
    ),
  };
}
