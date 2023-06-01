import { Modal as ModalAnt } from "antd";
const Modal = ({
  title,
  children,
  isModalOpen,
  setIsModalOpen,
  actionOk,
  actionCancel = () => {},
  labelAction = "OK",
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
    actionCancel();
  };

  return (
    <>
      <ModalAnt
        title={title}
        open={isModalOpen}
        onOk={actionOk}
        onCancel={handleCancel}
        okText={labelAction}
      >
        {children}
      </ModalAnt>
    </>
  );
};
export default Modal;
