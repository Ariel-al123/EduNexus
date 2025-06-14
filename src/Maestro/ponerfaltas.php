<?php
session_start();
$maestro = isset($_SESSION['id']) ? $_SESSION['id'] : ''; // Obtener id del maestro

if(isset($_POST["mostrar"])){

    require_once("contacto.php");

    $obj2 = new contacto();
    $resultado = $obj2->consultaralumnomatriculado($_POST["idmostrar"]);

    // Verifica si hay alumnos 
    if($resultado->num_rows > 0) {

        echo "<h2>Selecciona un alumno y su falta de asistencia:</h2>";
        echo "<form action='' method='POST'>";
        echo "<input type='hidden' name='idmostrar' value='" . $_POST["idmostrar"] . "'>";
        echo "Alumno: ";
        echo "<select name='idalumno'>";
        while ($registro = $resultado->fetch_assoc()) {
            echo "<option value='" . $registro["id_alumno"] . "'>" . $registro["nombre_alumno"] . " " . $registro["apellido_paterno"] . " " . $registro["apellido_materno"] . "</option>";
        }
        echo "</select>";
        echo "<br><br>";

        echo "<label for='fecha'>Fecha de la falta: </label>";
        echo "<input type='date' id='fecha' name='fecha' required max='" . date('Y-m-d') . "' min='" . date('Y-01-01') . "' request>";


        // validación fecha para que no sea futura
        echo "<script>";
        echo "document.getElementById('fecha').setAttribute('max', new Date().toISOString().split('T')[0]);";
        echo "</script>";

        echo "<br><br>";
        echo "<input type='submit' name='colocarfalta' value='Aceptar'>";
        echo "</form>";

    } else {
        echo "No hay alumnos matriculados en esta asignatura.";
    }

} elseif (isset($_POST["colocarfalta"])) {

    $idasignatura = $_POST["idmostrar"];
    $idalumno = $_POST["idalumno"];
    $fecha = $_POST["fecha"]; // Recuperar la fecha de la falta de asistencia

        require_once("contacto.php");
        $obj3 = new contacto();

        $resultado = $obj3->consultarsolounalumnomatriculado($idalumno, $idasignatura);
        while ($registro = $resultado->fetch_assoc()) {
            $nombreasignatura = $registro["nombre_asignatura"];
            $nombrealumno = $registro["nombre_alumno"];
            $apellidopaterno = $registro["apellido_paterno"];
            $apellidomaterno = $registro["apellido_materno"];
            $falta = $_POST["fecha"];

            $obj4 = new contacto();
            $obj4->ponerfalta($idasignatura,$nombreasignatura,$idalumno,$nombrealumno,
                $apellidopaterno,$apellidomaterno,$falta);
            echo "Falta de Asistencia Colocada";
        }

} else {
    require_once("contacto.php");
    $obj = new contacto();
    $resultado = $obj->consultarasignaturaimpartida($maestro);

    // Verifica si hay asignaturas disponibles
    if($resultado->num_rows > 0) {
?>
<h1>Selecciona una asignatura: </h1>
<form action="" method="POST">
    <select name="idmostrar">
        <?php
            while ($registro = $resultado->fetch_assoc()) {
                echo "<option value='" . $registro["id_asignatura"] . "'>" . $registro["nombre_asignatura"] . "</option>";
            }
        ?>
    </select>
    <input type="submit" name="mostrar" value="Seleccionar Asignatura">
</form>
<?php
    } else {
        echo "<p>No se encontraron asignaturas impartidas.</p>";
    }
}
?>
