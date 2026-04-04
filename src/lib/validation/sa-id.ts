export interface SAIDResult {
  valid: boolean;
  dateOfBirth?: Date;
  gender?: "male" | "female";
  citizen?: boolean;
  error?: string;
}

export function validateSAID(idNumber: string): SAIDResult {
  if (!/^\d{13}$/.test(idNumber)) {
    return { valid: false, error: "Must be exactly 13 digits" };
  }

  // Extract date of birth (YYMMDD)
  const year = parseInt(idNumber.substring(0, 2), 10);
  const month = parseInt(idNumber.substring(2, 4), 10);
  const day = parseInt(idNumber.substring(4, 6), 10);

  // Determine century: 00-29 = 2000s, 30-99 = 1900s
  const fullYear = year <= 29 ? 2000 + year : 1900 + year;

  const dateOfBirth = new Date(fullYear, month - 1, day);
  if (
    dateOfBirth.getFullYear() !== fullYear ||
    dateOfBirth.getMonth() !== month - 1 ||
    dateOfBirth.getDate() !== day
  ) {
    return { valid: false, error: "Invalid date of birth" };
  }

  // Gender: digits 7-10 (0000-4999 = female, 5000-9999 = male)
  const genderDigits = parseInt(idNumber.substring(6, 10), 10);
  const gender = genderDigits >= 5000 ? "male" : "female";

  // Citizenship: digit 11 (0 = SA citizen, 1 = permanent resident)
  const citizenDigit = parseInt(idNumber[10], 10);
  if (citizenDigit !== 0 && citizenDigit !== 1) {
    return { valid: false, error: "Invalid citizenship digit" };
  }
  const citizen = citizenDigit === 0;

  // Luhn checksum validation
  let sum = 0;
  for (let i = 0; i < 13; i++) {
    let digit = parseInt(idNumber[i], 10);
    if (i % 2 !== 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  if (sum % 10 !== 0) {
    return { valid: false, error: "Invalid checksum" };
  }

  return { valid: true, dateOfBirth, gender, citizen };
}
