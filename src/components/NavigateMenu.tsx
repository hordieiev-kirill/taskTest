import { NavLink } from 'react-router-dom';
import '../style/navigateMenu.css';

export default function NavigateMenu() {
  return (
    <nav className="navigate" aria-label="Main navigation">
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          isActive ? 'navigate__link active' : 'navigate__link'
        }
      >
        Orders
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive ? 'navigate__link active' : 'navigate__link'
        }
      >
        Products
      </NavLink>
    </nav>
  );
}
