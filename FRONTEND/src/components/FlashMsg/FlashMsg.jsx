import { useFlashMsg } from "../../contexts/FlashMsgProvidor";
import CloseIcon from "@mui/icons-material/Close";

export default function FlashMsg() {
  let { flashMsg, removeFlashMsg } = useFlashMsg();
  return (
    <div className="md:w-1/3 w-full mt-8 ease-out flex justify-between bg-green-200 rounded-md p-4">
      <p className="text-green-900">{flashMsg}.</p>
      <CloseIcon
        className="text-green-900 cursor-pointer"
        onClick={() => removeFlashMsg()}
      />
    </div>
  );
}
