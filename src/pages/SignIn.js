import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Avatar,
  Container,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { MdLockOutline, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/action/authAction";
import Loader from "../components/Loader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().trim().email("Invalid email format").required(),
    password: yup.string().trim().required().min(6, "minimum 6 charactor"),
  })
  .required();

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    let email = data.email;
    let password = data.password;
    dispatch(signIn({ email, password }, navigate));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          m: 1,
          p: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary" }}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("signin")}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("signin")}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="../signin" variant="body2">
                {t("forgotPassword")}
              </Link>
            </Grid>
            <Grid item>
              <Link to="../signup">{t("signup")}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
