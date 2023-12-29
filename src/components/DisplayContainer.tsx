import { RootState, useAppSelector } from "../redux/store";

const DisplayContainer = () => {
  const expression = useAppSelector((state:RootState) => state.calculator.expression);
  const inputData = useAppSelector((state:RootState) => state.calculator.inputData);
  const error = useAppSelector((state:RootState) => state.calculator.error);
  return (
    <div className="flex flex-col justify-center p-5">
      <div className=" h-fit text-right">
        {!expression ? (
          <span className=" text-mutex text-small">0</span>
        ) : (
          <span className=" text-medium">{expression}</span>
        )}
      </div>
      {/* <div className="h-fit text-right">
        {inputData ? (
          <span className="text-large">{inputData}</span>
        ) : (
          <span className="text-medium text-mutex">0</span>
        )}
      </div> */}
      <input
        type="text"
        readOnly
        placeholder="0"
        value={inputData}
        className={`w-full h-fit text-right ${
          inputData ? "text-large" : "text-medium"
        } bg-transparent outline-none`}
      />
      {error && (
        <div
          className={`${
            error.severity === "warning"
              ? " bg-error-warning hover:bg-error-warning-hover"
              : " bg-error-error hover:bg-error-error-hover"
          }flex-1`}
        >
          {error.message}
        </div>
      )}
    </div>
  );
};
export default DisplayContainer;
