import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from "nativewind";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Al abrir la app, mirar qué había guardado
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setColorScheme(savedTheme);
      } else {
        setColorScheme('light'); // Por defecto luz
      }
      setLoaded(true);
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newTheme); // Cambia el visual
    await AsyncStorage.setItem('theme', newTheme); // Guarda en memoria
  };

  if (!loaded) return null; 

  return (
    <ThemeContext.Provider value={{ theme: colorScheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);