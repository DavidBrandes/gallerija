import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const pathname = useLocation();

  useEffect(() => {
    console.log("scroll to top");
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
