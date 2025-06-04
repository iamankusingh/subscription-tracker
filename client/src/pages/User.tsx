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

interface createSubscriptionFormData {
  name: string;
  price: number;
  currency: string;
  frequency: string;
  category: string;
  payment: string;
  status: string;
  startDate: Date | undefined;
}

interface createSubscriptionResponse {
  success?: boolean;
  message?: string;
  data?: {
    _id: string;
    name: string;
    price: number;
    currency: string;
    frequency: string;
    category: string;
    payment: string;
    status: string;
    startDate: Date | undefined;
  };
}

interface subscriptionResponse {
  success?: boolean;
  message?: string;
  data?: Array<{
    _id: string;
    name: string;
    price: number;
    currency: string;
    frequency: string;
    category: string;
    payment: string;
    status: string;
    startDate: Date | string;
    renewalDate: Date | string;
    createdAt: Date | string;
  }>;
}

const User: React.FC = () => {
  // fetching user ////////////////////////////
  const { id } = useParams();

  const [username, setUsername] = useState<userData | undefined>();

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
        // console.log("User data fetched successfully", result);
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

  //  creating subscription ////////////////////////////
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [payment, setPayment] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();

  const formData: createSubscriptionFormData = {
    name: name,
    price: price,
    currency: currency,
    frequency: frequency,
    category: category,
    payment: payment,
    status: status,
    startDate: startDate,
  };

  const handleCreateSubscription = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    // console.log(formData);

    try {
      const response: Response = await fetch(
        "http://localhost:5500/api/v1/subscription",
        {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result: createSubscriptionResponse = await response.json();
        console.log("Subscription response", result);
        alert("Subscription created successfully");
      }
    } catch (error) {
      console.error("Something went wrong", error);
      alert("Failed to create subscription");
    }
  };

  // gettign subscriptions ////////////////////////////
  const [subscriptionData, setSubscriptionData] = useState<
    | Array<{
        _id: string;
        name: string;
        price: number;
        currency: string;
        frequency: string;
        category: string;
        payment: string;
        status: string;
        startDate: Date | string;
        renewalDate: Date | string;
        createdAt: Date | string;
      }>
    | undefined
  >([]);

  const fetchSubscription = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        `http://localhost:5500/api/v1/subscription/user/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const result: subscriptionResponse = await response.json();
        console.log("Subscription result", result);
        console.log("Subscription data", result.data);
        setSubscriptionData(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch subscription data", error);
    }
  };

  useEffect(() => {
    fetchSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div>
        <h1 className="p-2 text-2xl">{`Welcome ${username?.data?.name}`}</h1>
      </div>

      {/* create subscription form */}
      <section className="flex flex-col items-center justify-center">
        <h3 className="p-2 text-xl">Create new subscription</h3>

        <form
          action="https://localhost:5500/api/v1/subscription"
          className="p-4 grid md:grid-cols-2 items-center gap-4 rounded-lg text-xl bg-cyan-800"
          onSubmit={handleCreateSubscription}
        >
          <div>
            <label htmlFor="sub-name">Subscription name</label>
            <br />
            <input
              type="text"
              name="sub-name"
              id="sub-name"
              placeholder="Netflix, Disney, etc..."
              className="inputBox"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="price">Cost</label>
            <br />
            <input
              type="number"
              name="price"
              id="price"
              placeholder="149"
              className="inputBox"
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <label htmlFor="currency">Currency</label>
            <br />
            <select
              name="currency"
              id="currency"
              onChange={(e) => setCurrency(e.target.value)}
              required
            >
              <option className="bg-gray-600" disabled selected>
                Select Currency
              </option>
              <option value="Rupees" className="bg-gray-600">
                Rupees
              </option>
              <option value="USD" className="bg-gray-600">
                USD
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="frequency">Frequency</label>
            <br />
            <select
              name="frequency"
              id="frequency"
              onChange={(e) => setFrequency(e.target.value)}
              required
            >
              <option className="bg-gray-600" disabled selected>
                Select frequency
              </option>
              <option value="daily" className="bg-gray-600">
                Daily
              </option>
              <option value="weekly" className="bg-gray-600">
                Weekly
              </option>
              <option value="monthly" className="bg-gray-600">
                Monthly
              </option>
              <option value="yearly" className="bg-gray-600">
                Yearly
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <br />
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option className="bg-gray-600" disabled selected>
                Select category
              </option>
              <option value="Entertainment" className="bg-gray-600">
                Entertainment
              </option>

              <option value="Sports" className="bg-gray-600">
                Sports
              </option>

              <option value="News" className="bg-gray-600">
                News
              </option>

              <option value="Bussiness" className="bg-gray-600">
                Bussiness
              </option>

              <option value="Education" className="bg-gray-600">
                Education
              </option>

              <option value="Personal" className="bg-gray-600">
                Personal
              </option>

              <option value="" className="bg-gray-600">
                Health
              </option>

              <option value="Fitness" className="bg-gray-600">
                Fitness
              </option>

              <option value="Others" className="bg-gray-600">
                Others
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="payment">Payment</label>
            <br />
            <input
              type="text"
              name="payment"
              id="payment"
              placeholder="Cash, UPI, card..."
              className="inputBox"
              onChange={(e) => setPayment(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="status">Subscription status</label>
            <br />
            <select
              name="status"
              id="status"
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option className="bg-gray-600" disabled selected>
                Select status
              </option>
              <option value="Active" className="bg-gray-600">
                Active
              </option>
              <option value="Expired" className="bg-gray-600">
                Expired
              </option>
              <option value="Canceled" className="bg-gray-600">
                Canceled
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="startDate">Start date</label>
            <br />
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="inputBox"
              onChange={(e) =>
                setStartDate(
                  e.target.value ? new Date(e.target.value) : undefined
                )
              }
              required
            />
          </div>

          <div>
            <input type="submit" value="Create" className="submitButton" />
            <input type="reset" value="Clear" className="submitButton mx-4" />
          </div>
        </form>
      </section>

      <section className="mt-8 text-center">
        <h4 className="text-xl">Your Listed Subscriptions</h4>

        <div className="p-4 grid md:grid-cols-2 gap-4">
          {subscriptionData?.map((data) => (
            <div
              key={data._id}
              className="my-4 p-4 border rounded bg-gray-700 text-left"
            >
              {Object.entries(data).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {String(value)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default User;
