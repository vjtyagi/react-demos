import { useCallback, useEffect, useState } from "react";
import { fetchRoomDetails, fetchUserDetails } from "./utils";

export default function useFetchData<T>(key: string, defaultValue: T) {
  const [status, setStatus] = useState<string>("loading");
  const [data, setData] = useState<T>(defaultValue);

  const callAPI = useCallback(async (key: string) => {
    console.log("api called ");
    setStatus("loading");
    const data =
      key == "rooms_data" ? await fetchRoomDetails() : await fetchUserDetails();
    setData(data as T);
    setStatus("ready");
  }, []);

  useEffect(() => {
    callAPI(key);
  }, [key]);
  return { data, status };
}
