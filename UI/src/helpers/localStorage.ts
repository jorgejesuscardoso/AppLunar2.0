export const GetLocalStrorage = (key: string) => {
    const data = localStorage.getItem(key);
    try {
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Erro ao parsear JSON do localStorage para a chave ${key}:`, error);
      return data; // Retorna o valor original caso não seja JSON válido
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