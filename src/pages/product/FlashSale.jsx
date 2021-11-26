import React from "react";
import BoxSlider from "./BoxSlider";

const FlashSale = () => {
  const item = [1, 2, 3, 4, 5];
  return (
    <>
      <BoxSlider title="Flash Deal" product={item} />
    </>
  );
};

export default FlashSale;
