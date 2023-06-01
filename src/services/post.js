import axios from "axios";

export const post = async (body) => {
  const res = await axios.post(
    "http://localhost/test_konecta/api/actions",
    body,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  if (res.status === 200) {
    return res?.data?.result;
  }
};
