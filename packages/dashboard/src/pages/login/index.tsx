import React from "react";
import { useSignIn } from "../../services/api";
import { loginSchema } from "../../Validations";
import * as yup from "yup";
import { useFormik } from "formik";
import { FormInput } from "../../components/form-input";

const LoginPage = () => {
  const [showError, setShowError] = React.useState(false);
  const { mutateAsync, isLoading } = useSignIn();
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values) => {
        login(values);
      },
    });

  const login = async (data: any) => {
    await mutateAsync(data, {
      onSuccess: (response) => {
        console.log(response);
        if (response.data.status === 403) {
          setShowError(true);
        } else {
          setShowError(false);
        }
      },
      onError: (error) => setShowError(true),
    });
  };

  return (
    <div className="flex w-full h-[100vh] items-center justify-center">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <FormInput
          handleBlur={handleBlur}
          handleChange={handleChange}
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={values.email}
          errors={errors.email}
          touched={touched.email}
        />
        <FormInput
          handleBlur={handleBlur}
          handleChange={handleChange}
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={values.password}
          errors={errors.password}
          touched={touched.password}
        />
        <button
          disabled={isLoading}
          type="submit"
          className={`h-[50px] w-60  border-none px-4 text-white  font-bold outline-none rounded ${
            isLoading ? "bg-gray-400" : "bg-blue-400"
          }`}
        >
          Submit
        </button>
        {showError && <div>Credentials incorrected</div>}
      </form>
    </div>
  );
};
export default LoginPage;
