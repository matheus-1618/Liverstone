import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";

function ProtectedPage() {
  const [res, setRes] = useState("");
  const api = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/test/");
        setRes(response.data.response);
      } catch {
        console.error();
        setRes("Erro de autenticaçãp");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Projected Page</h1>
      <p>{res}</p>
    </div>
  );
}

export default ProtectedPage;