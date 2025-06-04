import { useState } from "react";
import { useNavigate } from "react-router";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
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

const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass1, setPass1] = useState<string>("");
  const [pass2, setPass2] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (pass1 !== pass2) {
      setStatus("Both password should match");
      return;
    } else {
      setStatus("Registering...");
    }

    try {
      const formData: SignupFormData = {
        name: name,
        email: email,
        password: pass2,
      };

      const response: Response = await fetch(
        "http://localhost:5500/api/v1/auth/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result: SignupResponse = await response.json();
        console.log("Sign up success", result);
        setStatus("Done! Redirecting to sign in page...");

        navigate("/sign-in");
      } else {
        console.error("error sending data", response.statusText);
        setStatus("error sending data");
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <main className="h-full flex flex-col items-center justify-center gap-8">
      <div className="mt-10">
        <h2 className="text-3xl">Create account - Subscription Tracker</h2>
      </div>

      <form
        action="http://localhost:5500/api/v1/auth/sign-up"
        method="POST"
        className="p-4 flex flex-col items-center gap-4 rounded-lg text-xl bg-cyan-800"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="name">Name</label>
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
          <label htmlFor="email">Email</label>
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
          <label htmlFor="pass1">Password</label>
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
          <label htmlFor="password">Confirm password</label>
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
          <input type="submit" value="Register" className="submitButton" />
        </div>
      </form>

      <div>
        <p>{status}</p>
      </div>
    </main>
  );
};

export default Signup;
