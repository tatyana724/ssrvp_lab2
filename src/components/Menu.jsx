import { Link } from 'react-router-dom';

function Menu({ labs }) {
  return (
    <nav>
      <ul>
        {labs.map(lab => (
          <li key={lab.title}>
            <Link to={`/${lab.title}`}>{lab.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
