export const saveToStorage = (key: string, value: any) => {
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

export const getFromStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};
