import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type User from "./User";

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

const Account: React.FC = () => {
  const { id } = useParams(); //userid

  const navigate = useNavigate();

  const [username, setUsername] = useState<userData | undefined>();

  // fetch user info
  const fetchApi = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        `http://localhost:5500/api/v1/user/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const result: userData = await response.json();
        console.log("User data fetched successfully", result);
        setUsername(result);
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

  // updating user ////////////////////////////

  // Deleting user ////////////////////////////
  const deleteUser = async () => {
    if (confirm("Are you sure?") == true) {
      try {
        const response: Response = await fetch(
          `http://localhost:5500/api/v1/user/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("User deleted successfully", result);
          alert("user deleted successfully");
          navigate("/sign-in");
        }
      } catch (error) {
        console.error("Something went wrong while deleting User", error);
        alert("Failed to delete User");
      }
    }
  };

  return (
    <main>
      <h1>{`Welcome ${username?.data?.name}`}</h1>

      <p>Modify Your info or password</p>

      <button onClick={deleteUser} className="submitButton">
        Delete Account
      </button>
    </main>
  );
};

export default Account;
