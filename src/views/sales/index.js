import React, { useEffect, useState } from "react";
import { sales } from "../../services/sales";
import Table from "../../components/table";

const Sales = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getSales = async () => {
      const res = await sales();
      if (res !== "Not Found") {
        setData(res);
      } else {
        setData([]);
      }
    };

    getSales();
  }, []);

  const actionsTable = (info, action) => {
    if (action === "EDIT") {
    }

    if (action === "DELETE") {
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "end",
          marginBottom: 20,
        }}></div>
      <Table
        data={data}
        actions={(info, action) => actionsTable(info, action)}
      />
    </div>
  );
};

export default Sales;
