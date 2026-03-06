export const bankDetails = {
  beneficiary: process.env.NEXT_PUBLIC_BANK_BENEFICIARY || "SWARP FOUNDATION S.R.L.",
  bankName: process.env.NEXT_PUBLIC_BANK_NAME || "Bank details available after request confirmation",
  iban: process.env.NEXT_PUBLIC_BANK_IBAN || "TBD",
  swift: process.env.NEXT_PUBLIC_BANK_SWIFT || "TBD",
  referencePrefix: process.env.NEXT_PUBLIC_BANK_REFERENCE_PREFIX || "PROJECT",
};
