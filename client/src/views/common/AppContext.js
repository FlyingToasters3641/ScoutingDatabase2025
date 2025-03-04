import React, { createContext, useState, useContext } from 'react';

// Create a context
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [appData, setAppData] = useState({ name: 'AppData is working but hardcoded... Please Fix It!', isLoggedIn: true, currentEventID: 1, currentEventKey: '2025mimil', currentEventYear: 2025 });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, appData, setAppData }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
