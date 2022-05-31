import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);
  const tablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  useEffect(() => {
    setIsTablet(tablet);
  }, [tablet]);

  return isTablet;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);

  return isMobile;
}
