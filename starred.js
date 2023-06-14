const axios = require("axios");

const createTable = async () => {
  const res = await axios.get("http://localhost/konecta_test/api/create_table");
  console.log(res?.data);
};

createTable();
