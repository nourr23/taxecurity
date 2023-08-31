export const FormInput = ({
  handleChange,
  errors,
  touched,
  handleBlur,
  ...otherProps
}: any) => {
  return (
    <div className="h-[70px] mb-2">
      <input
        onChange={handleChange}
        onBlur={handleBlur}
        {...otherProps}
        className={`h-[50px] w-60 border-2 px-4 outline-none rounded  ${
          errors && touched ? "border-red-600" : "border-blue-400"
        } `}
      />
      {errors && touched && (
        <div className="text-red-600 text-xs mt-1">{errors}</div>
      )}
    </div>
  );
};
