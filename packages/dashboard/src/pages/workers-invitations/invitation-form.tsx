import { useFormik } from "formik";
import * as yup from "yup";
import { FormInput } from "../../components/form-input";
import { Button } from "@medusajs/ui";
import { useAcceptInvitation } from "../../services/api";
import { useNavigate } from "react-router-dom";

const invitationSchema = yup.object().shape({
  code: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
});

const InvitationForm = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useAcceptInvitation();
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        code: "",
        email: "",
      },
      validationSchema: invitationSchema,
      onSubmit: (values) => {
        acceptInvitation(values);
      },
    });

  const acceptInvitation = async (data: any) => {
    await mutateAsync(data, {
      onSuccess: (response) => {
        navigate("/worker-form?code=test", {
          state: { code: data.code },
        });
      },
      onError: (error) => {},
    }).catch((error) => console.log());
  };

  return (
    <div className=" h-[100vh] w-full flex justify-center items-center">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <FormInput
          handleBlur={handleBlur}
          handleChange={handleChange}
          className="w-full"
          type="email"
          placeholder="Enter Email "
          id="email"
          name="email"
          value={values.email}
          errors={errors.email}
          touched={touched.email}
        />
        <FormInput
          handleBlur={handleBlur}
          handleChange={handleChange}
          className="w-full"
          type="text"
          placeholder="Enter verification code "
          id="code"
          name="code"
          value={values.code}
          errors={errors.code}
          touched={touched.code}
        />
        <Button
          disabled={isLoading}
          className=" border-none outline-none bg-blue-500"
          type="submit"
        >
          Send verification code
        </Button>
      </form>
    </div>
  );
};
export default InvitationForm;
