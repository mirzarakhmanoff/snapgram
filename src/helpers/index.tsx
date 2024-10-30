export const saveStorage = (key: string, payload: any) => {
  localStorage.setItem(key, JSON.stringify(payload));
};

export const getStorage = (key: string) => {
  JSON.parse(localStorage.getItem(key)!);
};
