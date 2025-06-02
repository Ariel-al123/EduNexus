import { Link } from 'react-router-dom';

function MenuAdmin() {
  return (
    <div className="nav">
      <div className="logo">
      </div>
      <ul>
        <Link to="/altaalumno"><li>Alta Alumno</li></Link>
        <Link to="/altamaestro"><li>Alta Maestro</li></Link>
        <Link to="/altaasignatura"><li>Alta Asignatura</li></Link>
        <Link to="/bajaalumno"><li>Baja Alumno</li></Link>
        <Link to="/bajamaestro"><li>Baja Maestro</li></Link>
        <Link to="/bajaasignatura"><li>Baja Asignatura</li></Link>
        <Link to="/modificaralumno"><li>Modificar Alumno</li></Link>
        <Link to="/modificarmaestro"><li>Modificar Maestro</li></Link>
        <Link to="/modificarasignatura"><li>Modificar Asignatura</li></Link>
        <Link to="/matricularalumno"><li>Matricular Alumno</li></Link>
        <Link to="/revisarjustificantes"><li>Revisar Justificantes</li></Link>
      </ul>
    </div>
  );
}

export default MenuAdmin;