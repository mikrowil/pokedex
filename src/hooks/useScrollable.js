import { useEffect, useState } from "react";

//Checks if the scrollbar appears on the page
function useBodyScrollable() {
  const [bodyScrollable, setBodyScrollable] = useState(
    document.body.scrollHeight > window.innerHeight
  );
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setBodyScrollable(document.body.scrollHeight > window.innerHeight);
    });
    resizeObserver.observe(document.body);
    return () => {
      resizeObserver.unobserve(document.body);
    };
  }, []);
  return bodyScrollable;
}

export default useBodyScrollable;
