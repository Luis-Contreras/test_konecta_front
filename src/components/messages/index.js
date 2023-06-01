import { message } from "antd";

const callMessage = (body, type) => {
  switch (type) {
    case "success":
      message.success(body);
      break;
    case "info":
      message.info(body);
      break;
    case "error":
      message.error(body);
      break;

    default:
      break;
  }
};

export default callMessage;
