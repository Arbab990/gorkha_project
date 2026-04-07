import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Use a slight delay to allow React Router and Framer Motion to mount the new page first
        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }, 10);
    }, [pathname]);

    return null;
}
