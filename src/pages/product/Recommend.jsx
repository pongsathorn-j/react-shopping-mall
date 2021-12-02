import React from "react";
import BoxSlider from "./BoxSlider";
import axios from "axios";
import Loader from "../../components/Loader";
import { Box } from "@mui/material";

const Recommend = () => {
  const [recommend, setRecommend] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    const getData = async () => {
      setRecommend([]);
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_BASE + "/product/total/10"
        );
        setRecommend(res.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(JSON.stringify(error));
      }
    };

    getData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!!error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "#ff0000",
          fontSize: "1.5rem",
          my: 2,
        }}
      >
        {error}
      </Box>
    );
  }
  return (
    <>
      <BoxSlider
        title="Recommend"
        product={recommend}
        seeAll={"/product/list/recommend"}
      />
    </>
  );
};

export default Recommend;
