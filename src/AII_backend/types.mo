module {
    public type Uid = Text; // Usuario id
    public type Aid = Text; // Alumno id
    public type Pid = Text; // Proyecto id

    public type Rol = {
        #Admin;
        #Alumno;
        #Profesor;
        #Usuario;
        #Administrativo;
    };

    public type Usuario = {
        principal: Principal;
        uid: Text;
        nick: Text;
        email: Text;
        foto: ?Blob;
        proyectosVotados: [Pid];
        rol: Rol;
    };

    public type Direccion = {
        calle: Text;
        numero: Text;
        colonia: Text;
        ciudad: Text;
        estado: Text;
        codigoPostal: Text;
    };

    public type Telefono = {
        tipo: Text;
        numero: Text;
    };

    public type DetalleMedico = {
        alergias: [Text];
        medicamentos: [Text];
    };

    public type RegistroAlumnoForm = {
        nombre: Text;
        apellidoPaterno: Text;
        apellidoMaterno: Text;
        tipoSanguineo: Text;
        fechaNacimiento: Text;
        curp: Text;
        genero: Text;
        lugarNacimiento: Text;
        estadoCivil: Text;
        emailPersonal: Text;
        direcciones: [Text];
        telefonos: [Text];
        detallesMedicos: Text;
        numeroSeguroSocial: Text;
        escuelasProcedencia: [Text];
        ocupaciones: [Text];
        tutorJefeFamilia: Text;
        familiares: [Text];
        pertenenciaEtniaIndigena: Bool;
        hablaLenguaIndigena: Bool;
        viveComunidadIndigena: Bool;
        folioCeneval: Text;
        emailInstitucional: Text;
        matricula: Text;
        carrera: Text;
        semestre: Nat;
    };

    public type Alumno = {
        principal: Principal;
        aid: Text;
        nombre: Text;
        apellidoPaterno: Text;
        apellidoMaterno: Text;
        tipoSanguineo: Text;
        fechaNacimiento: Text;
        curp: Text;
        genero: Text;
        lugarNacimiento: Text;
        estadoCivil: Text;
        emailPersonal: Text;
        direcciones: [Text];
        telefonos: [Text];
        detallesMedicos: Text;
        numeroSeguroSocial: Text;
        escuelasProcedencia: [Text];
        ocupaciones: [Text];
        tutorJefeFamilia: Text;
        familiares: [Text];
        pertenenciaEtniaIndigena: Bool;
        hablaLenguaIndigena: Bool;
        viveComunidadIndigena: Bool;
        folioCeneval: Text;
        emailInstitucional: Text;
        matricula: Text;
        carrera: Text;
        semestre: Nat;
        proyectos: [Pid];
    };

    public type Administrativo = {
        principalID: Principal;
        nombre: Text;
        apellidoPaterno: Text;
        apellidoMaterno: Text;
        tipoSanguineo: Text;
        fechaNacimiento: Text;
        curp: Text;
        genero: Text;
        lugarNacimiento: Text;
        estadoCivil: Text;
        emailPersonal: Text;
        direcciones: [Text];
        telefonos: [Text];
        detallesMedicos: Text;
        numeroSeguroSocial: Text;
        cedulaProfesional: Text;
    };


    public type Docente = {
        principalID: Principal;
        nombre: Text;
        apellidoPaterno: Text;
        apellidoMaterno: Text;
        tipoSanguineo: Text;
        fechaNacimiento: Text;
        curp: Text;
        genero: Text;
        lugarNacimiento: Text;
        estadoCivil: Text;
        emailPersonal: Text;
        direcciones: [Text];
        telefonos: [Text];
        detallesMedicos: Text;
        numeroSeguroSocial: Text;
        cedulaProfesional: Text;
    };


    public type Item = {
        item: Text;
        porcentaje: Nat;
    };

    public type FinanciamientoForm = {
        owner: Principal;
        nombreProyecto: Text;
        descripcionCorta: Text;
        genero: Text;
        linkDemo: Text;
        fondosRequeridos: Nat;
        distribucionDeLosFondos: [Item];
        plasoEstimadoEnMeses: Nat;
    };

    public type Estado = {
        #Aprobado;
        #Tokenizado;
        #ProduccionIniciada;
        #ProduccionALaEsperaDeFondos;
        #ProduccionConcluida;
        #Finalizado;
    };

    public type Proyecto = {
        owner: Principal;
        nombreProyecto: Text;
        descripcionCorta: Text;
        genero: Text;
        linkDemo: Text;
        fondosRequeridos: Nat;
        distribucionDeLosFondos: [Item];
        plasoEstimadoEnMeses: Nat;
        fechaAprobacion: Int;
        fondosObtenidos: Nat;
        votos: Nat;
        estado: Estado;
    };
};
