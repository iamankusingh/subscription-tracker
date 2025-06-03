import { useState } from "react";
import { useNavigate } from "react-router";

interface SigninFormData {
  email: string;
  password: string;
}

interface User {
  _id: string;
}

interface SigninResponse {
  success?: boolean;
  message?: string;
  data?: {
    user: User;
    token: string;
  };
}

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const navigate = useNavigate();

  const formData: SigninFormData = {
    email: email,
    password: pass,
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    // console.log(formData);

    try {
      const response: Response = await fetch(
        "http://localhost:5500/api/v1/auth/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result: SigninResponse = await response.json();
        console.log("Sign in success", result);
        setStatus("Done! Redirecting to user page...");
        // set bearer token into localstorage
        localStorage.clear();
        localStorage.setItem("token", result.data?.token || "");

        navigate(`/user/${result.data?.user._id}`);
      } else if (response.status === 404) {
        setStatus("Invalid email");
      } else if (response.status === 401) {
        setStatus("Invalid password");
      } else {
        console.error("Something went wrong", response.statusText);
        setStatus("Unable to loggin");
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <main className="h-full flex flex-col items-center justify-center gap-8">
      <div className="mt-10">
        <h2 className="text-3xl">Log in to Subscription Tracker</h2>
      </div>

      <form
        className="p-4 flex flex-col items-center gap-4 rounded-lg text-xl bg-cyan-800"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="email"
            name="email"
            className="inputBox"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            name="password"
            className="inputBox"
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>

        <div>
          <input type="submit" value="Log in" className="submitButton" />
        </div>
      </form>

      <div>
        <p>{status}</p>
      </div>
    </main>
  );
};

export default Signin;
