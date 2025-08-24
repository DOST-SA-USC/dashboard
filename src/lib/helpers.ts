import { toZonedTime } from 'date-fns-tz';

export const getManilaTime = () => toZonedTime(new Date(), 'Asia/Manila');

export function capitalizeFirstLetter(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function truncateWithEllipsis(
  str: string,
  maxLength: number = 100
): string {
  if (!str) return '';
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function getRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths >= 1) {
    return formatDate(date);
  } else if (diffDays >= 1) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffHours >= 1) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffMinutes >= 1) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  } else {
    return 'just now';
  }
}

export function getUserInitials(name: string) {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function formatDateStartEnd(
  startDate: string,
  endDate?: string
): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : undefined;

  const month = start.toLocaleString('en-US', { month: 'short' });
  const startDay = start.getDate();

  if (end) {
    const isSameDate =
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate();

    if (!isSameDate) {
      const sameMonth =
        start.getMonth() === end.getMonth() &&
        start.getFullYear() === end.getFullYear();
      const endDay = end.getDate();

      if (sameMonth) {
        return `${month} ${startDay}-${endDay}`;
      } else {
        const endMonth = end.toLocaleString('en-US', { month: 'short' });
        return `${month} ${startDay} - ${endMonth} ${endDay}`;
      }
    }
  }

  return `${month} ${startDay}`;
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number = 400
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('09')) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

export function getMinutesSecondsLeft(targetDate: Date): string {
  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();
  if (diffMs <= 0) return '0m 0s';

  const totalSeconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}m ${seconds}s`;
}
