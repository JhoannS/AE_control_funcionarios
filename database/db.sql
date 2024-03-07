CREATE DATABASE Ae

USE Ae

-- CREACION DE TABLAS

CREATE TABLE Funcionario (
    documento_id INT PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    telefono INT,
    correo VARCHAR(255) NOT NULL,
    contraseña VARCHAR(100) NOT NULL,
    equipo_trabajo_id INT,
    instrumento_archivistico_id INT,
    FOREIGN KEY (equipo_trabajo_id) REFERENCES EquipoTrabajo(equipo_trabajo_id),
    FOREIGN KEY (instrumento_archivistico_id) REFERENCES InstrumentoArchivistico(instrumento_archivistico_id)
)

CREATE TABLE EquipoTrabajo (
    equipo_trabajo_id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
)

CREATE TABLE InstrumentoArchivistico (
    instrumento_archivistico_id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
)

CREATE TABLE EvidenciaTrabajo (
    evidencia_trabajo_id INT PRIMARY KEY,
    equipo_trabajo_id INT,
    funcionario_id INT,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_entrega DATE,
    archivo BLOB,
    creado timestamp NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (equipo_trabajo_id) REFERENCES EquipoTrabajo(equipo_trabajo_id),
    FOREIGN KEY (funcionario_id) REFERENCES Funcionario(documento_id)
)

CREATE TABLE Rol (
    rol_id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
)

CREATE TABLE RolPermiso (
    rol_id INT,
    permiso VARCHAR(255),
    FOREIGN KEY (rol_id) REFERENCES Rol(rol_id)
)

CREATE TABLE UsuarioRol (
    usuario_id INT,
    rol_id INT,
    FOREIGN KEY (usuario_id) REFERENCES funcionario(funcionario_id),
    FOREIGN KEY (rol_id) REFERENCES Rol(rol_id)
);

-- INSERT INTO Rol (nombre) VALUES ('administrador'), ('funcionario');

-- INSERT INTO RolPermiso (rol_id, permiso) VALUES
-- (1, 'SELECT Funcionario'),
-- (1, 'INSERT Funcionario'),
-- (1, 'UPDATE Funcionario'),
-- (1, 'DELETE Funcionario'),
-- (1, 'SELECT EvidenciaTrabajo'),
-- (1, 'INSERT EvidenciaTrabajo'),
-- (1, 'UPDATE EvidenciaTrabajo'),
-- (1, 'DELETE EvidenciaTrabajo'),
-- (1, 'SELECT EquipoTrabajo'),
-- (1, 'SELECT InstrumentoArchivistico'),
-- (2, 'SELECT Funcionario'),
-- (2, 'UPDATE Funcionario'),
-- (2, 'SELECT EvidenciaTrabajo'),
-- (2, 'INSERT EvidenciaTrabajo'),
-- (2, 'SELECT EquipoTrabajo'),
-- (2, 'SELECT InstrumentoArchivistico');
