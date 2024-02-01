import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface DisplayContextType {
  display: string;
  setDisplay: Dispatch<SetStateAction<string>>;
}

const DisplayContext = createContext<DisplayContextType | undefined>(undefined);

interface DisplayProviderProps {
  children: ReactNode;
}

export const DisplayProvider: React.FC<DisplayProviderProps> = ({ children }) => {
  const [display, setDisplay] = useState<string>("none");

  const contextValue: DisplayContextType = {
    display,
    setDisplay,
  };

  return (
    <DisplayContext.Provider value={contextValue}>
      {children}
    </DisplayContext.Provider>
  );
};

export const useDisplayContext = (): DisplayContextType => {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error("useDisplayContext must be used within a DisplayProvider");
  }
  return context;
};
