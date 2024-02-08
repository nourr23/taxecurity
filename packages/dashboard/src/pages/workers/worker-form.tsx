import { useFormik } from "formik";
import { workerSchema } from "../../Validations";
import { FormInput } from "../../components/form-input";
import { useAddWorker } from "../../services/api";
const WorkerForm = () => {
  const { mutateAsync, isLoading, isError, error } = useAddWorker();
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        code: "024923",
      },
      validationSchema: workerSchema,
      onSubmit: (values) => {
        postWorker(values);
        // console.log(values);
      },
    });

  const postWorker = async (data: any) => {
    await mutateAsync(data, {
      onSuccess: (response) => {},
      onError: (error) => {
        console.log("from add worker", error);
      },
    }).catch((error) => console.log());
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
        <FormInput
          handleBlur={handleBlur}
          handleChange={handleChange}
          type="text"
          placeholder="First Name"
          id="firstName"
          name="firstName"
          value={values.firstName}
          errors={errors.firstName}
          touched={touched.firstName}
        />
        <FormInput
          handleBlur={handleBlur}
          handleChange={handleChange}
          type="text"
          placeholder="Last Name"
          id="lastName"
          name="lastName"
          value={values.lastName}
          errors={errors.lastName}
          touched={touched.lastName}
        />
        <FormInput
          handleBlur={handleBlur}
          handleChange={handleChange}
          type="text"
          placeholder="Phone number"
          id="phone"
          name="phone"
          value={values.phone}
          errors={errors.phone}
          touched={touched.phone}
        />
        <button
          //   disabled={isLoading}
          type="submit"
          className={`h-[50px] w-60  border-none px-4 text-white  font-bold outline-none rounded ${
            false ? "bg-gray-400" : "bg-blue-400"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default WorkerForm;
