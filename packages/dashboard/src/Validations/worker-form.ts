import * as yup from "yup";
export const workerSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(6).required("Required"),
  phone: yup.string().min(3).required("Required"),
  firstName: yup.string().min(3).required("Required"),
  lastName: yup.string().min(3).required("Required"),
//   code: yup.string().required("Required"),
});
