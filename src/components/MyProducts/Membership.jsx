// import { useParams, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "../../App.css";
import { useHistory } from "react-router-dom";

export default function Membership() {
  const { name } = useParams();
  const history = useHistory();

  const plans = {
    basic: {
      price: "₹999",
      features: ["2 Washes", "Basic Cleaning", "Exterior Wash"],
    },
    pro: {
      price: "₹1999",
      features: ["4 Washes", "Interior Cleaning", "Foam Wash"],
    },
    prime: {
      price: "₹2999",
      features: ["Unlimited Wash", "Full Detailing", "Priority Service"],
    },
  };

  const plan = plans[name];

  return (
    <div className="plan-page">
      <h1 className="plan-title">{name.toUpperCase()} Plan</h1>
      <h2 className="plan-price">{plan.price}</h2>

      <ul className="plan-features">
        {plan.features.map((f, i) => (
          <li key={i}>✔ {f}</li>
        ))}
      </ul>

      <button className="btn">Proceed to Payment</button>

      <br /><br />

      <button onClick={() => history("/")}>← Back</button>
    </div>
  );
}