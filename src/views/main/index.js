import React, { useEffect, useState } from "react";
import { get } from "../../services/get";
import Table from "../../components/table";
import Modal from "../../components/modal";
import { deleteAction } from "../../services/delete";
import callMessage from "../../components/messages";
import Form from "../form";
import { Button } from "antd";
import { post } from "../../services/post";
import { validateFields } from "../../tools/validateFields";
import { put } from "../../services/put";
import FormSale from "../formSale";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [data, setData] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalCreateUpdate, setModalCreateUpdate] = useState(false);
  const [modalSale, setModalSale] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [isCreate, setIsCreate] = useState(false);
  const [formData, setFormData] = useState({});
  const [dataSale, setDataSale] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const res = await get();
      if (res !== "Not Found") {
        setData(res);
      } else {
        setData([]);
      }
    };

    getData();
  }, [modalDelete, modalCreateUpdate, modalSale]);

  const deleteProduct = async () => {
    const res = await deleteAction(deleteItem);
    if (res.comment === "successfully deleted") {
      callMessage("Eliminado correctamente", "info");
      return setModalDelete(false);
    }
  };

  const updateProduct = async () => {
    const valErrors = validateFields(formData);
    if (valErrors.length > 0) {
      valErrors.map((err) => callMessage(err, "error"));
      return;
    }
    const res = await put(formData);
    if ((res.comment = "successfully updated")) {
      callMessage("Producto actualizado correctamente", "success");
      setModalCreateUpdate(false);
      setFormData({});
    } else {
      callMessage("El producto no se puede actualizar", "error");
      setModalCreateUpdate(false);
      setFormData({});
    }
  };

  const createProduct = async () => {
    const valErrors = validateFields(formData);
    if (valErrors.length > 0) {
      valErrors.map((err) => callMessage(err, "error"));
      return;
    }
    const res = await post(formData);
    if ((res.comment = "successfully created")) {
      callMessage("Producto creado correctamente", "success");
      setModalCreateUpdate(false);
      setFormData({});
    } else {
      callMessage("El producto no se puede crear", "error");
      setModalCreateUpdate(false);
      setFormData({});
    }
  };

  const actionsTable = (info, action) => {
    if (action === "EDIT") {
      setFormData(info);
      setModalCreateUpdate(true);
    }

    if (action === "DELETE") {
      setDeleteItem(info.id);
      setModalDelete(true);
    }
  };

  const actionSale = async () => {
    if (!dataSale?.id || !dataSale?.stock) {
      return callMessage("Ingrese el producto y la cantidad a vender", "error");
    }

    const currentStock = data.find((item) => item.id === dataSale?.id);

    if (currentStock.stock - dataSale?.stock < 0) {
      return callMessage(
        "La cantidad a vender supera a la cantidad existente",
        "error"
      );
    }

    const body = {
      id: dataSale?.id,
      quantity_sold: dataSale.stock,
    };

    const res = await put(body);
    if ((res.comment = "successfully sale")) {
      callMessage("Producto vendido correctamente", "success");
      setModalSale(false);
      setDataSale({});
    } else {
      callMessage("El producto no se puede vendido", "error");
      setModalSale(false);
      setDataSale({});
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
        }}>
        <Button
          type="primary"
          onClick={() => {
            setIsCreate(true);
            setModalCreateUpdate(true);
          }}>
          Crear Producto
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          type="primary"
          danger
          onClick={() => {
            setModalSale(true);
          }}>
          Crear Venta
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          type=""
          onClick={() => {
            navigate("/sales");
          }}>
          Ver Ventas
        </Button>
      </div>

      <Table
        data={data}
        actions={(info, action) => actionsTable(info, action)}
      />
      <Modal
        title={"Eliminar Producto"}
        isModalOpen={modalDelete}
        setIsModalOpen={setModalDelete}
        actionOk={() => deleteProduct()}
        labelAction={"Eliminar"}>
        Esta seguro que desea eliminar este producto?
      </Modal>
      <Modal
        title={`${isCreate ? "Crear" : "Editar"} Producto`}
        isModalOpen={modalCreateUpdate}
        setIsModalOpen={setModalCreateUpdate}
        labelAction={isCreate ? "Crear" : "Editar"}
        actionOk={() => (isCreate ? createProduct() : updateProduct())}
        actionCancel={() => {
          setFormData({});
          setIsCreate(false);
        }}>
        <Form formData={formData} setFormData={setFormData} />
      </Modal>
      <Modal
        title={`Generar Venta`}
        isModalOpen={modalSale}
        setIsModalOpen={setModalSale}
        labelAction={"Generar Venta"}
        actionOk={() => actionSale()}
        actionCancel={() => {
          setDataSale({});
          setModalSale(false);
        }}>
        <FormSale data={data} dataSale={dataSale} setDataSale={setDataSale} />
      </Modal>
    </div>
  );
};

export default Main;
