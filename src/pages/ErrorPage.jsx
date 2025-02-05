import { Link } from "react-router-dom";
import "./ErrorPage.css";
function ErrorPage() {
  return (
    <div>
      <section id="error-page">
        <h1>ERROR</h1>
        <h2>Dirección no valida</h2>
        <Link to="/">Ir a Home</Link>
      </section>
    </div>
  );
}

export default ErrorPage
