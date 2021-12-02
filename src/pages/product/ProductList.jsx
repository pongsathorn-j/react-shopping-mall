import React from "react";
import {
  Breadcrumbs,
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Pagination,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdAddShoppingCart } from "react-icons/md";
import axios from "axios";
import Loader from "../../components/Loader";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/action/cartAction";

const ProductList = () => {
  const { itemtype } = useParams();
  const { t } = useTranslation();
  const [itemData, setItemData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [pagination, setPagination] = React.useState(1);
  const [numberPage, setNumberPage] = React.useState(1);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartReducer);

  const addCart = (p) => {
    const product = {
      id: p.id,
      name: p.title,
      photo: p.photo,
      price: p.price,
      discount: p.discount,
      quantity: p.quantity,
      qty: 1,
    };
    dispatch(addToCart(product, cart));
  };

  React.useEffect(() => {
    setLoading(true);
    const getData = async () => {
      setItemData([]);
      try {
        let url = "";
        if (itemtype === "flash") {
          url =
            process.env.REACT_APP_API_BASE +
            "/product/discount/" +
            pagination +
            "/20/40";
        } else if (itemtype === "recommend") {
          url = process.env.REACT_APP_API_BASE + "/product/page/" + pagination;
        } else {
          const resCategoryId = await axios.get(
            process.env.REACT_APP_API_BASE + "/category/title/" + itemtype
          );
          if (!!resCategoryId.data.data && resCategoryId.data.data.length > 0) {
            console.log(resCategoryId.data.data);

            let dataCategoryId = resCategoryId.data.data[0].id;
            url =
              process.env.REACT_APP_API_BASE +
              "/product/category/" +
              dataCategoryId +
              "/" +
              +pagination;
          }
        }
        if (!!url) {
          const res = await axios.get(url);
          setItemData(res.data);
          setNumberPage(Math.ceil(res.data.totalCount / res.data.pageLimit));
          setLoading(false);
        } else {
          setLoading(false);
          setError("ไม่พบข้อมูล " + itemtype);
        }
      } catch (error) {
        setLoading(false);
        setError(JSON.stringify(error));
      }
    };

    getData();
  }, [pagination, itemtype]);

  const handlePageChange = (event) => {
    event.preventDefault();
    setPagination(event.target.textContent);
  };

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
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ pl: 2, m: 1 }}>
        <Link to="/">{t("menuHome")}</Link>
        <Typography color="text.primary">{t(itemtype)}</Typography>
      </Breadcrumbs>
      <Container maxWidth="lg">
        <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
          {t(itemtype)}
        </Typography>
        <Grid container spacing={3}>
          {loading ? (
            <Loader />
          ) : (
            !!itemData.data &&
            itemData.data.map((items, index) => {
              return (
                <Grid item xs={6} sm={4} md={3} key={items._id}>
                  <Card sx={{ maxWidth: 300 }}>
                    <Link to={`/product/detail/${items._id}`}>
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="150"
                        image={items?.photo[0]}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {items.title}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle"
                          component="div"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {items.content}
                        </Typography>
                      </CardContent>
                    </Link>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ mx: 1 }}
                      >
                        {!!items.discount && items.discount !== 0 ? (
                          <>
                            <span style={{ color: "#ff0000" }}>
                              ฿{items.price - items.discount}
                            </span>
                            <small>
                              <sup>
                                <del>{items.price}</del>
                              </sup>
                            </small>
                          </>
                        ) : (
                          items.price
                        )}
                      </Typography>
                      <IconButton onClick={() => addCart(items)}>
                        <MdAddShoppingCart />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <Pagination
            onChange={handlePageChange}
            count={numberPage}
            color="primary"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductList;
