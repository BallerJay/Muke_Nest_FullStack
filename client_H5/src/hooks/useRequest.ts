import { useCallback, useState } from "react";
import useMount from "./useMount";

interface IOptions {
  params: Record<string, string>;
  manual?: boolean; // 是否手动触发
  onSuccess?: (res: unknown) => void;
  onFail?: (reason: unknown) => void;
}

/**
 * @description 1. 实现组件初始化，发送获取请求数据 2. 手动触发请求
 * @param service
 * @param params
 * @returns
 */
const useRequest = (service: (params: Record<string, string>) => Promise<unknown>, options: IOptions) => {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);

  const init = useCallback(
    (curParams: Record<string, string>) => {
      setLoading(true);
      service(curParams)
        .then(res => {
          setData(res);
          setLoading(false);
          options.onSuccess && options.onSuccess(res);
        })
        .catch(reason => {
          setLoading(false);
          options.onFail && options.onFail(reason);
        });
    },
    [service]
  );

  useMount(() => {
    if (!options.manual) {
      init(options.params);
    }
  });

  const run = (runParams: Record<string, string>) => options.manual && init(runParams);
  return { loading, data, run };
};

export default useRequest;
