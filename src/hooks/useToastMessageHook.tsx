import { message } from "antd";
import { useState } from "react";

const useToastMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);

  const showMessage = (
    type: "success" | "error" | "warning" | "info" | "loading",
    content: string,
    duration: number = 5
  ) => {
    switch (type) {
      case "success":
        messageApi.success({
          content,
          duration,
        });
        setLoading(false);
        break;
      case "error":
        messageApi.error({
          content,
          duration,
        });
        setLoading(false);
        break;
      case "warning":
        messageApi.warning({
          content,
          duration,
        });
        setLoading(false);
        break;
      case "info":
        messageApi.info({
          content,
          duration,
        });
        setLoading(false);
        break;
      case "loading":
        setLoading(true);
        messageApi.loading({
          content,
          duration: 0, // Duration set to 0 to keep loading active
        });
        break;
      default:
        break;
    }
  };

  const hideLoading = () => {
    messageApi.destroy(); // To hide the loading spinner
    setLoading(false);
  };

  return { showMessage, hideLoading, loading, contextHolder };
};

export default useToastMessage;
