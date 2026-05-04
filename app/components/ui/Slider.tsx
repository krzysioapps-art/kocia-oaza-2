"use client";

import { forwardRef } from "react";
import "@/app/style/ui/slider.css";

type SliderProps = {
  children: React.ReactNode;
};

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  ({ children }, ref) => {
    return (
      <div className="slider">
        <div className="slider__track" ref={ref}>
          {children}
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;