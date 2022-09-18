export const rolesData = [
    {
        nombre: "Rol test 1"
    },
    {
        nombre: "Rol test 2"
    }
]

export const rolTesting = {
    nombre: "Rol Testing login",
    descripcion: "Rol para crear un usuario en aquellas pruebas de testing que requieren estar logueado."
}

export const usuariosData =[
    {
        rut: "11.111.111-1",
        nombres: "Juan",
        apellido1: "Pérez",
        apellido2: "Pereira",
        direccion: "12 Norte 5 Sur N°000",
        rolId: 1,
        email: "juan@ejemplo.cl",
        password: "123456",
        fono: "+569987123746"
    },
    {
        rut: "22.222.222-2",
        nombres: "Carla",
        apellido1: "Contreras",
        apellido2: "Pacheco",
        direccion: "5 Oriente 6 Poniente, Calle ficticia S/N",
        rolId: 2,
        email: "carla@ejemplo.cl",
        password: "123321",
        fono: "+569123456789"
    }
]

export const usuarioTesting =
    {
        rut: "33.333.333-3",
        nombres: "Marcelo",
        apellido1: "Bravo",
        apellido2: "Castillo",
        direccion: "1 Sur 2 Norte N°456",
        rolId: 1,
        email: "marcelo@ejemplo.cl",
        password: "1234567",
        fono: "+5690193847566"
    }


export const credentials = {
    "email": usuarioTesting.email,
    "password": usuarioTesting.password,
    "remember": false,  //No genera token de refresco para extender la sessión "refresh_token"
    "host": "127.0.0.1"
}