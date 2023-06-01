import axios from "axios";

export const deleteAction = async (id) => {
  const res = await axios.delete(
    `http://localhost/test_konecta/api/actions?id=${id}`
  );
  if (res.status === 200) {
    console.log(res);
    return res?.data?.result;
  }
};
