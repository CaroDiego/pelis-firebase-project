import { useState } from "react";
import { Link } from "react-router-dom";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import "./TopNav.css";

// TODO añadir peliculas desde aqui, ahora esta en FilmsPage.jsx
// TODO La Pagina de las listas seran carruseles de peliculas
function TopNav() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className={`top-nav ${open ? "responsive" : ""}`}>
      <Link to="/" onClick={() => setOpen(false)}>
        Home
      </Link>
      <Link to="/films/watched" onClick={() => setOpen(false)}>
        Watched
      </Link>
      <Link to="/films/liked" onClick={() => setOpen(false)}>
        Likes
      </Link>
          <Link to="/lists" onClick={() => setOpen(false)}> 
        Lists
      </Link>
      <a href="javascript:void(0);" className="icon" onClick={toggleMenu}>
        <DensityMediumIcon />
      </a>
    </div>
  );
}

export default TopNav;
