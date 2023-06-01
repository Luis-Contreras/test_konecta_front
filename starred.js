const axios = require("axios");

const createTable = async () => {
  const res = await axios.get("http://localhost/test_konecta/api/create_table");
  console.log(res?.data);
};

createTable();
