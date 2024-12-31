import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router";

 const ScrolltoTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({top:0,left:0,behavior:'instant'});
  }, [pathname]);

  return null;
};
 export default ScrolltoTop;