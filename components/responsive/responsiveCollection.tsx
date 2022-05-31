import { useMediaQuery } from 'react-responsive'

interface responsiveType {
    children : React.FC;
}

export const Desktop = ({ children } : responsiveType) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}

export const Tablet = ({ children } :responsiveType) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}

export const Mobile = ({ children } :responsiveType) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}

export const Default = ({ children } : responsiveType) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}