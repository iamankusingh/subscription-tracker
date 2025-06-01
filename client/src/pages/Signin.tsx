import { useState } from "react";
import { useNavigate } from "react-router";

interface SigninFormData {
  email: string;
  password: string;
}

interface SigninResponse {
  success?: boolean;
  message?: string;
  data?: JSON;
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

    console.log(formData);

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

        navigate("http://localhost:5500/api/v1/user/");
      }
    } catch (error) {
      console.error("Somthing went wring", error);
    }
  };

  return (
    <main className="h-full flex flex-col items-center justify-center gap-8">
      <div className="mt-10">
        <h2 className="text-3xl">Log in to Subscription Tracker</h2>
      </div>

      <form
        action="http://localhost:5500/api/v1/auth/sign-up"
        method="POST"
        className="p-4 flex flex-col items-center gap-4 rounded-lg text-xl bg-cyan-800"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="">Email</label>
          <br />
          <input
            type="email"
            name="email"
            className="p-1 bg-gray-600 rounded-sm"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="">Password</label>
          <br />
          <input
            type="password"
            name="password"
            className="p-1 bg-gray-600 rounded-sm"
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="submit"
            value="Login"
            className="p-2 rounded-sm bg-teal-600 cursor-pointer"
          />
        </div>
      </form>

      <div>
        <p>{status}</p>
      </div>
    </main>
  );
};

export default Signin;
