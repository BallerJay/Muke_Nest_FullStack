import { useQuery } from "@apollo/client";
import { GET_OSS_INFO } from "../graphql/oss";

export const useUploadOSS = () => {
  // 1. 获取到签名信息
  // 2. 通过签名信息 post 请求把参数传给服务端
  const { data: resultData } = useQuery(GET_OSS_INFO);

  const uploadHandler = async (file: File) => {
    const formData = new FormData();
    const { getOSSInfo: returnData } = resultData;
    const key = `static/${file.name}`;
    formData.append("key", `static/${file.name}`);
    formData.append("policy", returnData.policy);
    formData.append("OSSAccessKeyId", returnData.accessId);
    formData.append("success_action_status", "200");
    formData.append("signature", returnData.signature);
    formData.append("file", file);
    const res = await fetch(returnData.host, {
      method: "POST",
      body: formData,
    });

    return { url: res.url + key };
  };
  return uploadHandler;
};
