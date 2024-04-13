import { useState } from "react";
import AdminSideBar from "../../../Components/Admin/Admin Side Bar/AdminSideBar";
import "../CSS/Dashboard.css";
import "../CSS/apps.css";

const Toss = () => {
  const [angle, setAngle] = useState(0);

  const flipCoin = () => {
    if (Math.random() > 0.5) setAngle((prev) => prev + 180);
    else setAngle((prev) => prev + 360);
  };

  return (
    <div className="admin-container">
      <AdminSideBar />
      <main className="dashboard-app-container">
        <h1>Toss</h1>
        <section className="center">
          <article
            className="tosscoin"
            onClick={flipCoin}
            style={{
              transform: `rotateY(${angle}deg)`,
            }}
          >
            <div></div>
            <div></div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Toss;
