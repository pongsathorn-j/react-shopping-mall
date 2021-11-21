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
import { MdOutlineAppRegistration, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/action/authAction";
import Loader from "../components/Loader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().trim().required(),
    email: yup.string().trim().email("Invalid email format").required(),
    password: yup.string().trim().required().min(6, "minimum 6 charactor"),
    confirmpassword: yup.string().trim().required().oneOf(
      [yup.ref("password"), null],
      "Passwords must match"
    ),
  })
  .required();

const SignUp = () => {
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
  // ShowPassword
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowComfirmPassword] = React.useState(false);
  const handleClickShowConfirmPassword = () => setShowComfirmPassword(!showConfirmPassword);

  const onSubmit = (data) => {
    let email = data.email;
    let password = data.password;
    let name = data.name;
    dispatch(signUp({ name, email, password }, navigate));
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
          <MdOutlineAppRegistration />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("signup")}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
          autoComplete="off"
        >
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
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
          <TextField
            margin="normal"
            fullWidth
            name="confirmpassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmpassword"
            error={!!errors.confirmpassword}
            helperText={errors.confirmpassword?.message}
            {...register("confirmpassword")}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                  >
                    {showConfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}
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
            {t("signup")}
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="../signin">{t("signin")}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
