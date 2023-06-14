import axios from "axios";

export const put = async (body) => {
  const res = await axios.put(
    "http://localhost/konecta_test/api/actions",
    null,
    {
      params: {
        ...body,
      },
    }
  );
  if (res.status === 200) {
    return res?.data?.result;
  }
};
