import * as yup from "yup";
export const loginSchema = yup.object().shape({
  login: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(6).required("Required"),
});
