import Cookies from "js-cookie";

export const removeCredentials = () => {
  Cookies.remove("user");
  Cookies.remove("access_token");
};

const defaultDateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "2-digit",
};

export function formatDate(
  date?: string | Date,
  options: Intl.DateTimeFormatOptions = defaultDateOptions
): string {
  if (!date) {
    return "";
  }

  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", options).format(dateObj);
}

export function getWhatsAppLink(
  phoneNumber: string | number | undefined
): string {
  if (!phoneNumber) {
    return "";
  }

  const formattedNumber = `${phoneNumber}`.replace(/\D/g, "");
  return `https://wa.me/${formattedNumber}`;
}

export const currencyToStringNumber = (value: string): string => {
  return value.replace(/\./g, "").replace(/[^0-9]/g, "");
};

export const formatCurrency = (value?: number | string): string => {
  if (value === undefined || value === null) {
    return "";
  }

  const amount = typeof value === "string" ? parseFloat(value) : value;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};