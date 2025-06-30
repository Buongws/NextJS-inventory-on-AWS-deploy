/**
 * Hàm debounce giúp trì hoãn việc thực thi một hàm cho đến khi
 * không có sự kiện nào xảy ra trong một khoảng thời gian nhất định
 *
 * @param func Hàm cần debounce
 * @param wait Thời gian chờ tính bằng milliseconds
 * @param immediate Có thực thi ngay lập tức không
 * @returns Hàm đã được debounce
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    const context = this;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
