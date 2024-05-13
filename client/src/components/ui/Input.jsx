import PropTypes from "prop-types";

const Input = ({
  type,
  placeholder,
  name,
  id,
  onChange,
  value,
  defaultValue,
  maxLength,
  minLength,
  required,
}) => {
  return (
    <>
      <input
        className="border py-3 rounded-md pl-2 outline-none focus:ring-1 focus:ring-blue-600 focus:ring-opacity-50
        "
        name={name}
        maxLength={maxLength}
        minLength={minLength}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
};

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  maxLength: PropTypes.string,
  minLength: PropTypes.string,
  required: PropTypes.bool,
};
