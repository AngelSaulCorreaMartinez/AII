module {
    public type Uid = Text; // Usuario id
    public type Aid = Text; // Alumno id
    public type Pid = Text; // Proyecto id

    public type Rol = {
        #Admin;
        #Alumno;
        #Profesor;
        #Usuario;
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

    public type RegistroAlumnoForm = {
        nombre: Text;
        apellidos: Text;
        emailInstitucional: Text;
        matricula: Text;
        carrera: Text;
        semestre: Nat;
    };

    public type Alumno = {
        principal: Principal;
        aid: Text;
        nombre: Text;
        apellidos: Text;
        emailInstitucional: Text;
        matricula: Text;
        carrera: Text;
        semestre: Nat;
        proyectos: [Pid];
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
