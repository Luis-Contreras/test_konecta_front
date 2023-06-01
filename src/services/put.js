import axios from "axios";

export const put = async (body) => {
  const res = await axios.put(
    "http://localhost/test_konecta/api/actions",
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
