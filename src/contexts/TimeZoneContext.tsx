import React, { createContext, useState, useContext } from 'react';

type TimeZoneContextType = {
  timeZone: string;
  setTimeZone: (timeZone: string) => void;
};

const TimeZoneContext = createContext<TimeZoneContextType | undefined>(undefined);

export const TimeZoneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeZone, setTimeZone] = useState('UTC');

  return (
    <TimeZoneContext.Provider value={{ timeZone, setTimeZone }}>
      {children}
    </TimeZoneContext.Provider>
  );
};

export const useTimeZone = () => {
  const context = useContext(TimeZoneContext);
  if (context === undefined) {
    throw new Error('useTimeZone must be used within a TimeZoneProvider');
  }
  return context;
};