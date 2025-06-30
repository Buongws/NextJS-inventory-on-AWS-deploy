import { useState, useEffect } from "react";

/**
 * Hook useDebounce giúp trì hoãn việc cập nhật giá trị
 * cho đến khi không có thay đổi trong một khoảng thời gian nhất định
 *
 * @param value Giá trị cần debounce
 * @param delay Thời gian chờ tính bằng milliseconds
 * @returns Giá trị đã được debounce
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Tạo timeout để cập nhật giá trị sau khoảng thời gian delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function để clear timeout nếu value hoặc delay thay đổi
    // hoặc component unmount
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
