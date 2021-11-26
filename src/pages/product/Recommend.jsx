import React from "react";
import BoxSlider from "./BoxSlider";

const Recommend = () => {
  const item = [1, 2, 3, 4, 5, 'test'];
  return (
    <>
      <BoxSlider title="Recommend" product={item} />
    </>
  );
};

export default Recommend;
