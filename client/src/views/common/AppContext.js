import React, { createContext, useState, useEffect } from 'react';

// Create a context
const AppContext = createContext();

const AppProvider = ({ children }) => {
  
  const defaultAppData = {name: 'Default', isLoggedIn: true, currentEventID: 0, currentEventKey: '', currentEventYear: 0};
  const initialAppData = JSON.parse(localStorage.getItem('appData')) || defaultAppData;
  const [appData, setAppData] = useState(initialAppData);

  // Update localStorage whenever appData changes
  useEffect(() => {
    localStorage.setItem('appData', JSON.stringify(appData));
  }, [appData]);

  const [theme, setTheme] = useState('light');

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
