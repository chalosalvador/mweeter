import { format } from "date-fns";
import PropTypes from "prop-types";

const MweetDate = ({ dateInSeconds }) => {
  const dateInMilliseconds = dateInSeconds && dateInSeconds.seconds * 1000;

  return dateInMilliseconds ? (
    <span className="mr-2 has-tooltip cursor-pointer">
      <span className="tooltip rounded shadow-lg p-1 bg-gray-800 bg-opacity-60 text-white text-xs -mt-5">
        {format(dateInMilliseconds, "MMM d, Y hh:mm:ss")}
      </span>
      {format(dateInMilliseconds, "MMM d, Y")}
    </span>
  ) : (
    <div className="w-20 mx-auto flex-grow-0">
      <div className="animate-pulse flex">
        <div className="flex-1 py-1">
          <div className="h-3 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

MweetDate.propTypes = {
  dateInSeconds: PropTypes.number,
};

export default MweetDate;
