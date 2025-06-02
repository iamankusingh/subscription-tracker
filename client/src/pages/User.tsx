import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface User {
  name: string;
}

interface userData {
  success?: boolean;
  message?: string;
  data?: {
    user: User;
    name: string;
    email: string;
    token: string;
  };
}

const User: React.FC = () => {
  const { id } = useParams();

  const [result, setResult] = useState<userData | undefined>();

  const fetchApi = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        `http://localhost:5500/api/v1/user/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // bearer token
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            // or use cookies
            // Cookie: `token=${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const result: userData = await response.json();
        console.log("User data fetched successfully", result);
        setResult(result);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div>{`Welcome ${result?.data?.name}`}</div>
    </main>
  );
};

export default User;
