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

interface updateUserFormData {
  name: string;
  email: string;
  password: string;
}

interface updateUserResponse {
  success?: boolean;
  message?: string;
  data?: {
    token?: string;
    user?: {
      name: string;
      email: string;
    };
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

  // updating user ////////////////////////////
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass1, setPass1] = useState<string>("");
  const [pass2, setPass2] = useState<string>("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (pass1 !== pass2) {
      alert("Both password should match");
      return;
    } else {
      alert("Registering...");
    }

    try {
      const formData: updateUserFormData = {
        name: name,
        email: email,
        password: pass2,
      };

      const response: Response = await fetch(
        `http://localhost:5500/api/v1/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result: updateUserResponse = await response.json();
        console.log("User update success", result);
        alert("Done! User updated...");
      } else {
        console.error("error sending data", response.statusText);
        alert("error sending data");
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <main className="p-4">
      <h1>{`Welcome ${username?.data?.name}`}</h1>

      <p>Modify Your info or password</p>

      <form
        action="http://localhost:5500/api/v1/user"
        method="PUT"
        className="p-4 flex flex-col items-center gap-4 rounded-lg text-xl bg-cyan-800"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="name">New Name</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            className="inputBox"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">New Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            className="inputBox"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="pass1">New Password</label>
          <br />
          <input
            type="password"
            name="pass1"
            id="pass1"
            className="inputBox"
            onChange={(e) => setPass1(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Confirm new password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            className="inputBox"
            onChange={(e) => setPass2(e.target.value)}
            required
          />
        </div>

        <div>
          <input type="submit" value="Update" className="submitButton" />
        </div>
      </form>

      <button
        onClick={deleteUser}
        className="p-2 rounded-sm bg-red-600 cursor-pointer"
      >
        Delete Account
      </button>
    </main>
  );
};

export default Account;
