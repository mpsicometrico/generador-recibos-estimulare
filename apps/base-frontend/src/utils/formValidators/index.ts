import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .min(2, "El correo electrónico debe tener al menos 8 caracteres.")
    .max(100, "El correo electrónico debe tener como máximo 100 caracteres.")
    .required("El correo electrónico es requerido."),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(100, "La contraseña debe tener como máximo 100 caracteres.")
    .required("Se requiere la contraseña para continuar."),
});

export const registerValidationSchema = Yup.object({
  username: Yup.string()
    .min(2, "Username should be of minimum 8 characters length.")
    .max(100, "Username should be of maximum 100 characters length.")
    .required("Username is required."),
  first_name: Yup.string()
    .min(2, "First name should be of minimum 8 characters length.")
    .max(100, "First name should be of maximum 100 characters length.")
    .required("First name is required."),
  last_name: Yup.string()
    .min(2, "Last name should be of minimum 8 characters length.")
    .max(100, "Last name should be of maximum 100 characters length.")
    .required("Last name is required."),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .max(100, "Password should be of maximum 100 characters length.")
    .required("Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords not matched")
    .required("Please confirm your password"),
});
