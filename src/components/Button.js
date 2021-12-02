import Loading from "components/Loading";
import PropTypes from "prop-types";

const Button = ({ disabled, className, children, loading, ...rest }) => {
  return (
    <button className={`flex ${className}`} disabled={disabled} {...rest}>
      {loading && <Loading className="w-6 mr-3 opacity-30" />}
      {children}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.elementType,
};

export default Button;
