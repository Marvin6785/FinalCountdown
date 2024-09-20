import { Link } from "react-router-dom";

function Footer() {
    return (
      <footer>
        <p>&copy; 2024 - Marvin GUERINI</p>
        <p>
          <Link to="/privacy-policy">Politique de confidentialité</Link> | {" "}
          <Link to="/terms-of-use">Conditions d&apos;utilisation</Link>
        </p>
      </footer>
    )
  }
  
  export default Footer