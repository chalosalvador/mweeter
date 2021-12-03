import PropTypes from "prop-types";

const TextInput = ({ label, register, errors, ...rest }) => {
  return (
    <label className="block mt-4">
      <span className="text-gray-700">{label}</span>
      <input type="text" {...register} {...rest} />
      <p className="text-red-500">{errors}</p>
    </label>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  register: PropTypes.any,
  errors: PropTypes.string,
};

export default TextInput;
