export const GetLocalStrorage = (key: string) => {
  const data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    } else {
        return null;
    }
};

export const SetLocalStorage = (key: string, value: string) => {
    const valueJson = JSON.stringify(value);
    const toSet = localStorage.setItem(key, valueJson);
    return toSet;
}

export const RemoveLocalStorage = (key: string) => {
    const toRemove = localStorage.removeItem(key);
    return toRemove;
}