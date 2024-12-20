import { AuthProvider } from "./AuthProvidor";
import { FlashMsgProvidor } from "./FlashMsgProvidor";

const ContextWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <FlashMsgProvidor>{children}</FlashMsgProvidor>
    </AuthProvider>
  );
};

export default ContextWrapper;
