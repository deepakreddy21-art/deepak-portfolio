import { useEffect, useRef } from "react";

export const RevealOnScroll = ({ 
  children, 
  threshold = 0.2, 
  delay = 0,
  direction = "up", // "up", "down", "left", "right"
  duration = 0.7
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a delay if specified
          setTimeout(() => {
          ref.current.classList.add("visible");
          }, delay);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, delay]);

  // Determine the initial transform based on direction
  let initialTransform = "translateY(20px)";
  if (direction === "down") initialTransform = "translateY(-20px)";
  if (direction === "left") initialTransform = "translateX(20px)";
  if (direction === "right") initialTransform = "translateX(-20px)";

  const animationStyle = {
    opacity: 0,
    transform: initialTransform,
    transition: `opacity ${duration}s ease, transform ${duration}s ease`,
  };

  const visibleStyle = {
    opacity: 1,
    transform: "translate(0)",
  };

  return (
    <div 
      ref={ref} 
      className="reveal"
      style={animationStyle}
      data-visible-style={JSON.stringify(visibleStyle)}
    >
      {children}
    </div>
  );
};
