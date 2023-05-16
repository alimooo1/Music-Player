interface Song {
  id: number;
  name: string;
  artist: string;
  cover: string;
  src: string;
  background: string;
}

const getMusics = async () => {
  const data = await fetch("./Songs.json");
  const result = await data.json();
  return result as Song[];
};

export { getMusics, Song };
