const Loading = () => {
  return (
    <div className="w-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1.5"
              floodColor="#1f67c9"
            />
          </filter>
        </defs>
        <circle className="loading" cx="50" cy="50" r="45" />
      </svg>
    </div>
  );
};

export default Loading;
