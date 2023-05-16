import axios from "axios";

interface Song {
  id: number;
  name: string;
  artist: string;
  cover: string;
  src: string;
  background: string;
}

const getSongs = () => {
  return axios.get("./Songs.json").then((response) => {
    return response.data as Song[];
  });
};

export { getSongs, Song };
