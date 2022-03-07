export const set = (key, value) => {
  if (typeof value === "object") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

export const get = (key, defaultValue) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value;
  } catch (e) {
    return defaultValue || localStorage.getItem(key);
  }
};

export default {
  get,
  set
};
