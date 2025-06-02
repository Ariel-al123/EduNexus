import { Link } from 'react-router-dom';

function MenuAlumno() {
return (
    <div className="nav">
        <div className="logo">
        </div>
        <ul>
            <Link to="/consultarhorario"><li>Consultar Horario</li></Link>
            <Link to="/listaralumnos"><li>Listar Alumnos</li></Link>
            <Link to="/listarmaestros"><li>Listar Maestros</li></Link>
            <Link to="/listarcalificaciones"><li>Listar Calificaciones</li></Link>
            <Link to="/listarfaltas"><li>Listar Faltas</li></Link>
            <Link to="/solicitarjustificante"><li>Solicitar Justificante</li></Link>
            <Link to="/verificarjustificante"><li>Verificar Justificante</li></Link>
        </ul>
    </div>
);
}

export default MenuAlumno;