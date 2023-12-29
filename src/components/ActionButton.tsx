import { IconType } from "react-icons";

interface ActionButtonProps {
  id?: number;
  Icon: IconType;
  iconColor?: string;
  actionFunc: () => void;
  styles: string;
}

const ActionButton = ({
  id = 0,
  Icon,
  iconColor = "",
  actionFunc,
  styles = "",
}: ActionButtonProps) => {
  return (
    <button
      key={id}
      onClick={actionFunc}
      className={`w-fit h-fit p-3 text-btn_toggle transition-colors duration-variable rounded-md ${styles}`}
    >
      <Icon color={iconColor} />
    </button>
  );
};
export default ActionButton;
