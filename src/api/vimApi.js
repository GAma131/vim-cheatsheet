import axios from "axios";

const API_URL = "https://vim-cheatsheet.onrender.com/api/vim-cheatsheet";

export const fetchVimCheatsheet = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
