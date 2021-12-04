import {
  Breadcrumbs,
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Avatar,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToCart, addToCart } from "../redux/action/cartAction";
import { useTranslation } from "react-i18next";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";

const Cart = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.authReducer);
  const navigator = useNavigate();
  const { cart, total, priceAll, discountAll } = useSelector(
    (state) => state.cartReducer
  );

  const addCart = (p) => {
    const product = {
      _id: p._id,
      name: p.title,
      photo: p.photo,
      price: p.price,
      discount: p.discount,
      quantity: p.quantity,
      qty: 1,
    };
    dispatch(addToCart(product, cart));
  };

  const removeCart = (p) => {
    const product = {
      _id: p._id,
      name: p.title,
      photo: p.photo,
      price: p.price,
      discount: p.discount,
      quantity: p.quantity,
      qty: 1,
    };
    dispatch(removeToCart(product, cart));
  };

  const handleCheckOut = () => {
    console.log("isAuth => " + isAuth);
    if (isAuth) {
    } else {
      navigator("/signin");
    }
  };

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ pl: 2, my: 1 }}>
        <Link underline="hover" color="inherit" to="/">
          {t("menuHome")}
        </Link>

        <Typography color="text.primary">{t("cart")}</Typography>
      </Breadcrumbs>

      <Container>
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          {t("cart")}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <List
              sx={{ width: "100%", maxWidth: 900, bgcolor: "background.paper" }}
            >
              {total > 0 ? (
                cart.map((items, index) => {
                  return (
                    <div key={items._id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar alt={items.name} src={items.photo[0]} />
                        </ListItemAvatar>

                        <ListItemText
                          sx={{ width: "50%" }}
                          primary={
                            <Link to={`/product/detail/${items._id}`}>
                              {items.name}
                            </Link>
                          }
                        />

                        <ListItemText
                          primary={
                            <>
                              <IconButton onClick={() => removeCart(items)}>
                                <MdOutlineRemove size="20" />
                              </IconButton>
                              {items.qty} {t("item")}
                              <IconButton onClick={() => addCart(items)}>
                                <MdOutlineAdd size="20" />
                              </IconButton>
                            </>
                          }
                        />
                        <ListItemText
                          primary={
                            !!items.discount && items.discount !== 0 ? (
                              <>
                                <span style={{ color: "#ff0000" }}>
                                  ฿{items.price - items.discount}
                                </span>
                                <small>
                                  <sup>
                                    <del>฿{items.price}</del>
                                  </sup>
                                </small>
                              </>
                            ) : (
                              <span>฿{items.price}</span>
                            )
                          }
                        />
                      </ListItem>

                      <Divider variant="inset" component="li" />
                    </div>
                  );
                })
              ) : (
                <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
                  No Item
                </Typography>
              )}
            </List>
          </Grid>
          <Grid item xs={12} md={4}>
            {total > 0 && (
              <Box>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ textAlign: "center" }}
                    >
                      {t("orderSum")}
                    </Typography>
                    <Divider />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                      sx={{ pt: "1em" }}
                    >
                      {t("included")} {total} {t("item")}
                    </Typography>
                    <Typography
                      sx={{
                        my: 1,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{t("totalprice")}</span>
                      <span>฿{priceAll}</span>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="secondary"
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <span>{t("discount")}</span> <span>-฿{discountAll}</span>
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        my: 1,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{t("total")} </span>
                      <span>฿{priceAll - discountAll}</span>
                    </Typography>
                  </CardContent>
                  <CardActions sx={{}}>
                    <Button
                      size="small"
                      variant="contained"
                      fullWidth
                      onClick={handleCheckOut}
                    >
                      {t("checkout")}
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Cart;
