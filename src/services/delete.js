import axios from "axios";

export const deleteAction = async (id) => {
  const res = await axios.delete(
    `http://localhost/konecta_test/api/actions?id=${id}`
  );
  if (res.status === 200) {
    console.log(res);
    return res?.data?.result;
  }
};
