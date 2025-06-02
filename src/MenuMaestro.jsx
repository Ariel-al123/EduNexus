import { Link } from 'react-router-dom';

function MenuMaestro() {
    return (
        <div className="nav">
            <div className="logo">
            </div>
            <ul>
                <Link to="/listaralumnos"><li>Listar Alumnos</li></Link>
                <Link to="/listarmaestros"><li>Listar Maestros</li></Link>
                <Link to="/ponercalificaciones"><li>Poner Calificaciones</li></Link>
                <Link to="/modificarcalificaciones"><li>Modificar Calificaciones</li></Link>
                <Link to="/ponerfaltas"><li>Poner faltas</li></Link>
                <Link to="/modificarfaltas"><li>Modificar Faltas</li></Link>
                <Link to="/listarfaltas"><li>Listar Faltas</li></Link>
            </ul>
        </div>
    );
}

export default MenuMaestro;