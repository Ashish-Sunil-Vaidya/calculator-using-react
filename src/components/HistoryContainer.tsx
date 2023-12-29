import { useAppDispatch, useAppSelector } from "../redux/store";
import { setInputByHistory, flushHistory } from "../redux/calculatorSlice";
import ActionButton from "./ActionButton";
import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const HistoryContainer = () => {
  const dispatch = useAppDispatch();
  const historyRecords = useAppSelector((state) => state.calculator.history);

  return (
    <>
      <div className="text-small text-center font-bold mb-4">History</div>
      <div className="flex">
        <div className="w-full h-full flex flex-col-reverse overflow-y-auto hide-scrollbar::-webkit-scrollbar hide-scrollbar gap-2 sm:pl-3 px-3">
          {historyRecords &&
            historyRecords.map(
              (
                { expression, result }: { expression: string; result: string },
                index: number
              ) => {
                return (
                  <motion.button
                    layout
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3 }}
                    key={index}
                    className="bg-btn_history transition-colors duration-variable flex flex-col items-end w-full overflow-x-clip hover:bg-btn_history_hover p-3 rounded-md"
                    onClick={() => {
                      dispatch(setInputByHistory({ expression, result }));
                    }}
                  >
                    <div className="">{expression}</div>
                    <div className="">{result}</div>
                  </motion.button>
                );
              }
            )}
          {!historyRecords.length && (
            <div className="text-small flex-1 grid place-items-center text-mutex">
              <span>No History Records Found</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end transition-colors duration-variable">
        <ActionButton
          Icon={FaTrashAlt}
          actionFunc={() => dispatch(flushHistory())}
          styles="m-1 absolute bottom-0 hover:bg-btn_history_hover sm:fixed sm:bottom-0 sm:right-0 sm:m-2"
        />
      </div>
    </>
  );
};
export default HistoryContainer;
