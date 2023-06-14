import axios from "axios";

export const sales = async () => {
  const res = await axios.get("http://localhost/konecta_test/api/sales");
  if (res.status === 200) {
    return res?.data?.result;
  }
};
