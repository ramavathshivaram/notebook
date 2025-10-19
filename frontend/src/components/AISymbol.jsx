import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/AI assistant - Animation.json";

const AISymbol = () => {
  return <Lottie animationData={animationData} loop autoplay />;
};

export default AISymbol;
