import axios from "axios";

export const get = async () => {
  const res = await axios.get("http://localhost/test_konecta/api/actions");
  if (res.status === 200) {
    return res?.data?.result;
  }
};
