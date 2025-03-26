import axios from "axios";
import dotenv from "dotenv";

const upload = async (file) => {
  dotenv.config();
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "FreeLanza");

  try {
    const res = await axios.post(import.meta.env.VITE_UPLOAD_LINK, data);

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;
