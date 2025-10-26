// hooks/useResponsive.ts
import { useMediaQuery } from "react-responsive";

export const useIsMobile = () => {
  return useMediaQuery({ maxWidth: 640 });
};
export const useIsTablet = () => {
  return useMediaQuery({ minWidth: 641, maxWidth: 1024 });
};
export const useIsDesktop = () => {
  return useMediaQuery({ minWidth: 1025 });
};
export const useIsSmallScreen = () => {
  return useMediaQuery({ maxWidth: 768 });
};
export const useIsLargeScreen = () => {
  return useMediaQuery({ minWidth: 1280 });
};
export const useCustomBreakpoint = (query: string) => {
  return useMediaQuery({ query });
};
