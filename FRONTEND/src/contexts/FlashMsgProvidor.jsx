import React, { createContext, useContext, useState } from "react";

const FlashMsgContext = createContext();

export const FlashMsgProvidor = ({ children }) => {
  const [flashMsg, setFlashMsg] = useState(null);

  const addFlashMsg = (msg) => {
    setFlashMsg(msg);
  };

  const removeFlashMsg = () => {
    setFlashMsg(null);
  };

  return (
    <FlashMsgContext.Provider value={{ flashMsg, addFlashMsg, removeFlashMsg }}>
      {children}
    </FlashMsgContext.Provider>
  );
};

export const useFlashMsg = () => useContext(FlashMsgContext);
