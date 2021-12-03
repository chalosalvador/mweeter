import PropTypes from "prop-types";

const Loading = ({ className }) => {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#1f67c9" />
        </filter>
      </defs>
      <circle className="loading" cx="50" cy="50" r="45" />
    </svg>
  );
};

Loading.propTypes = {
  className: PropTypes.string,
};
export default Loading;
