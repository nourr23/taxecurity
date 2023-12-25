const SearchInput = ({ value, onChangeValue, placeholder }: any) => {
  return (
    <input
      type="text"
      className="border-[1px] border-gray-400 px-8 py-2"
      placeholder={placeholder}
      value={value}
      onChange={(e) =>
        // setVariables((prev) => ({ ...prev, firstName: e.target.value }))
        onChangeValue(e)
      }
    />
  );
};

export default SearchInput;
