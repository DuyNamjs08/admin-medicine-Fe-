import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginSchema } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoginPost } from "../../useQuery/useLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });
  const { data, mutate } = useLoginPost();
  useEffect(() => {
    const cb = async () => {
      if (data) {
        await localStorage.setItem("accessToken", data.accessToken);
        await localStorage.setItem("refreshToken", data.refreshToken[0]);
        await localStorage.setItem("mail", data.mail);
        await localStorage.setItem("userId", data.user);
        await navigate("/");
      }
    };
    cb();
  }, [data]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Màn hình quản lý
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit((data) => {
              mutate(data, {
                onSuccess: () => {
                  reset();
                },
              });
            })}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Nhập email"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("mail")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("password")}
              name="password"
              label="Nhập mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
