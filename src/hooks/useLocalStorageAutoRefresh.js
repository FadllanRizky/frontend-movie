import { useState, useEffect, useCallback } from 'react';

export function useLocalStorageAutoRefresh(key, initialValue = []) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Function to load from storage
  const loadFromStorage = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        // Only update if data actually changed
        if (JSON.stringify(parsed) !== JSON.stringify(value)) {
          setValue(parsed);
          setLastUpdate(Date.now());
        }
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key, value]);

  // Set up auto-refresh
  useEffect(() => {
    // Load every 3 seconds
    const intervalId = setInterval(loadFromStorage, 3000);

    // Listen for storage events from other tabs
    const handleStorageChange = (e) => {
      if (e.key === key) {
        loadFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, loadFromStorage]);

  // Function to manually refresh
  const refresh = useCallback(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Function to update storage
  const updateStorage = useCallback((newValue) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
      setLastUpdate(Date.now());
      
      // Dispatch event for other tabs/components
      window.dispatchEvent(new StorageEvent('storage', { key }));
    } catch (error) {
      console.error(`Error updating localStorage key "${key}":`, error);
    }
  }, [key, value]);

  // Clean function to remove from localStorage
  const removeFromStorage = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setValue(initialValue);
      setLastUpdate(Date.now());
      window.dispatchEvent(new StorageEvent('storage', { key }));
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return { 
    value, 
    refresh, 
    updateStorage, 
    removeFromStorage,
    lastUpdate 
  };
}