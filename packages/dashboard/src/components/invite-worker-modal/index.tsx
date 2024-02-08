import { Button, Input } from "@medusajs/ui";
import { BsXLg } from "react-icons/bs";
import { useFormik } from "formik";
import * as yup from "yup";
import { FormInput } from "../form-input";
import { useAddInvitation } from "../../services/api";
import { useNavigate } from "react-router-dom";

const invitationSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});

const InviteWorkerModal = ({ setOpen }: any) => {
  const navigate = useNavigate();
  const { mutateAsync } = useAddInvitation();
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: invitationSchema,
      onSubmit: (values) => {
        sendInvitation(values);
      },
    });

  const sendInvitation = async (data: any) => {
    await mutateAsync(data, {
      onSuccess: (response) => {
        navigate("/workers-invitations");
        setOpen();
      },
      onError: (error) => {},
    }).catch((error) => console.log());
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,0.6)] backdrop-blur-[2px] flex items-center justify-center">
      <div className="rounded-lg flex flex-col gap-y-4 bg-white max-h-[95vh] px-4 w-full max-w-[460px] py-6 ">
        <div className="flex justify-between items-center">
          <h1 className=" text-base text-gray-500 font-bold text-primary">
            Set an email to send an invitation
          </h1>
          <button onClick={setOpen}>
            <BsXLg />
          </button>
        </div>
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
          <Button
            className=" border-none outline-none bg-blue-500"
            type="submit"
          >
            Send Invitation
          </Button>
        </form>
      </div>
    </div>
  );
};
export default InviteWorkerModal;
