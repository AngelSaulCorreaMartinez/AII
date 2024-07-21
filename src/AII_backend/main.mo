import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Map "mo:map/Map";
import { thash; phash } "mo:map/Map";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";
import Set "mo:map/Set";
import Debug "mo:base/Debug"; // Import Debug for logging
import Types "./types";
import Manifiesto "manifiesto";

shared ({ caller }) actor class _Plataforma() {

    stable let deployer = caller;

    public type Usuario = Types.Usuario;
    public type Alumno = Types.Alumno;
    public type Administrativo = Types.Administrativo;
    public type Docente = Types.Docente;
    public type Uid = Types.Uid; // Usuario id
    public type Aid = Types.Aid; // Alumno id
    public type Pid = Types.Pid; // Proyecto id

    public type RegistroAlumnoForm = Types.RegistroAlumnoForm;
    public type FinanciamientoForm = Types.FinanciamientoForm;
    public type Proyecto = Types.Proyecto;

    stable var actualUid : Nat = 0;
    stable var actualAid : Nat = 0;
    stable var actualPid : Nat = 0;

    func generarUid() : Text {
        actualUid += 1;
        "U" # Nat.toText(actualUid);
    };

    func generarAid() : Text {
        actualAid += 1;
        "A" # Nat.toText(actualAid);
    };

    func generarPid() : Text {
        actualPid += 1;
        "P" # Nat.toText(actualPid);
    };

    stable let usuarios = Map.new<Principal, Usuario>();
    stable let alumnos = Map.new<Principal, Alumno>();
    stable let admins = Set.new<Principal>();

    stable let administrativos = Map.new<Principal, Administrativo>();
    stable let docentes = Map.new<Principal, Docente>();
    ignore Set.put<Principal>(admins, phash, deployer);
    ignore Set.put<Principal>(admins,phash,deployer);


    stable let alumnosIngresantes = Map.new<Principal, RegistroAlumnoForm>();
    stable let proyectosIngresantes = Map.new<Principal, FinanciamientoForm>();

    stable let proyectosAprobados = Map.new<Pid, Proyecto>();

    func esUsuario(p : Principal) : Bool {
        return switch (Map.get<Principal, Usuario>(usuarios, Map.phash, p)) {
            case null { false };
            case _ { true };
        };
    };

    func esAlumno(p : Principal) : Bool {
        return switch (Map.get<Principal, Alumno>(alumnos, Map.phash, p)) {
            case null { false };
            case _ { true };
        };
    };

    func esAdmin(p : Principal) : Bool {
        Debug.print("Checking if principal is admin: " # Principal.toText(p));
        let result = Set.has<Principal>(admins, Map.phash, p);
        Debug.print("Is admin: " # (if result { "true" } else { "false" }));
        result;

    };

    func esAdministrativo(p : Principal) : Bool {
        return switch (Map.get<Principal, Administrativo>(administrativos, Map.phash, p)) {
            case null { false };
            case _ { true };
        };
    };

    func esDocente(p : Principal) : Bool {
        return switch (Map.get<Principal, Docente>(docentes, Map.phash, p)) {
            case null { false };
            case _ { true };
        };

    };

    public shared ({ caller }) func agregarAdmin(p : Principal) : async Bool {
        assert esAdmin(caller) and esUsuario(p);
        ignore Set.put<Principal>(admins, Map.phash, p);
        true;
    };

    public shared ({ caller }) func removerAdmin(p : Principal) : async Bool {
        assert (deployer == caller and p != caller);
        ignore Set.remove<Principal>(admins, Map.phash, p);
        true;
    };

    public shared ({ caller }) func registrarse(nick : Text, email : Text) : async Text {
        Debug.print("Registering user: " # Principal.toText(caller));
        Debug.print("Nickname: " # nick # ", Email: " # email);
        if (Principal.isAnonymous(caller)) {
            Debug.print("Caller cannot be anonymous");
            return "Error: Caller cannot be anonymous";
        };
        if (esUsuario(caller)) {
            Debug.print("Caller is already registered as a user");
            return "Error: Caller is already registered as a user";
        };
        let nuevoUsuario : Usuario = {
            principal = caller;
            uid = generarUid();
            nick;
            email;
            foto = null;
            proyectosVotados = [];
            rol = #Usuario;
        };
        ignore Map.put<Principal, Usuario>(usuarios, Map.phash, caller, nuevoUsuario);
        "U" # Nat.toText(actualUid);
    };

    public shared ({ caller }) func registrarseComoAlumno(_init : RegistroAlumnoForm) : async Text {
        assert not Principal.isAnonymous(caller);
        let usuario = Map.get<Principal, Usuario>(usuarios, Map.phash, caller);
        switch usuario {
            case null { return "Debe registrarse como usuario previamente"; };
            case (?usuario) {
                if (Map.has<Principal, RegistroAlumnoForm>(alumnosIngresantes, Map.phash, caller)) {
                    return "Usted ya tiene pendiente de aprobación una solicitud de registro como alumno";
                };
                ignore Map.put<Principal, RegistroAlumnoForm>(alumnosIngresantes, Map.phash, caller, _init);
                return "Solicitud de registro como alumno ingresada exitosamente";
            };
        };
    };

    public shared ({ caller }) func registrarseComoAdministrativo(_init : Administrativo) : async Text {
        assert not Principal.isAnonymous(caller);
        let usuario = Map.get<Principal, Usuario>(usuarios, Map.phash, caller);
        switch usuario {
            case null { return "Debe registrarse como usuario previamente"; };
            case (?usuario) {
                if (Map.has<Principal, Administrativo>(administrativos, Map.phash, caller)) {
                    return "Usted ya está registrado como administrativo";
                };
                ignore Map.put<Principal, Administrativo>(administrativos, Map.phash, caller, { _init with principalID = caller });
                ignore Map.put<Principal, Usuario>(usuarios, Map.phash, caller, {usuario with rol = #Administrativo});
                return "Registro como administrativo ingresado exitosamente";
            };
        };
    };


    public shared ({ caller }) func registrarseComoDocente(_init : Docente) : async Text {
        assert not Principal.isAnonymous(caller);
        let usuario = Map.get<Principal, Usuario>(usuarios, Map.phash, caller);
        switch usuario {
            case null { return "Debe registrarse como usuario previamente"; };
            case (?usuario) {
                if (Map.has<Principal, Docente>(docentes, Map.phash, caller)) {
                    return "Usted ya está registrado como docente";
                };
                ignore Map.put<Principal, Docente>(docentes, Map.phash, caller, { _init with principalID = caller });
                ignore Map.put<Principal, Usuario>(usuarios, Map.phash, caller, {usuario with rol = #Profesor});
                return "Registro como docente ingresado exitosamente";
            };
        };
    };


    public shared query ({ caller }) func verAlumnosIngresantes() : async [(Principal, RegistroAlumnoForm)] {
        assert esAdmin(caller);
        Iter.toArray(Map.entries<Principal, RegistroAlumnoForm>(alumnosIngresantes));
    };

    public shared ({ caller }) func aprobarRegistroDeAlumno(solicitante : Principal) : async Text {
        Debug.print("Approving student registration for: " # Principal.toText(solicitante));
        assert esAdmin(caller);
        let usuario = Map.get<Principal, Usuario>(usuarios, Map.phash, solicitante);
        switch usuario {
            case null { return "El usuario no está registrado"; };
            case (?usuario) {
                let solicitud = Map.remove<Principal, RegistroAlumnoForm>(alumnosIngresantes, Map.phash, solicitante);
                switch (solicitud) {
                    case null { return "No hay solicitud de registro de alumno para este usuario"; };
                    case (?solicitud) {
                        let nuevoAlumno : Alumno = {
                            solicitud with
                            principal = solicitante;
                            aid = generarAid();
                            proyectos = [];
                        };
                        ignore Map.put<Principal, Alumno>(alumnos, Map.phash, solicitante, nuevoAlumno);
                        ignore Map.put<Principal, Usuario>(usuarios, Map.phash, solicitante, {usuario with rol = #Alumno});
                        return "A" # Nat.toText(actualAid);
                    };
                };
            };
        };
    };

    public query func verAlumnos() : async [Alumno] {
        Iter.toArray(Map.vals<Principal, Alumno>(alumnos));
    };

    public shared query ({ caller }) func verAdministrativos() : async [Administrativo] {
        assert esAdmin(caller);
        Iter.toArray(Map.vals<Principal, Administrativo>(administrativos));
    };

    public shared query ({ caller }) func verDocentes() : async [Docente] {
        assert esAdmin(caller);
        Iter.toArray(Map.vals<Principal, Docente>(docentes));
    };

    func enArray<T>(a : [T], e : T, equal : (T, T) -> Bool) : Bool {
        for (i in a.vals()) { if (equal(i, e)) { return true } };
        return false;
    };

    public shared ({ caller }) func solicitudDeFinanciamiento(_init : FinanciamientoForm) : async Text {
        assert esAlumno(caller);
        switch (Map.get<Principal, FinanciamientoForm>(proyectosIngresantes, phash, caller)) {
            case (?solicitudPrevia) {
                return "Usted tiene pendiente una solicitud para el proyecto " # solicitudPrevia.nombreProyecto;
            };
            case null {
                ignore Map.put<Principal, FinanciamientoForm>(proyectosIngresantes, phash, caller, _init);
                return "Su solicitud fue ingresada con éxito. En los próximos días será contactado via email";
            };
        };
    };

    public shared query ({ caller }) func verSolicitudesFinanciamiento() : async [(Principal, FinanciamientoForm)] {
        assert esAdmin(caller);
        let iterEntries = Map.entries<Principal, FinanciamientoForm>(proyectosIngresantes);
        Iter.toArray<(Principal, FinanciamientoForm)>(iterEntries);
    };

    public shared ({ caller }) func aprobarFinanciamiento(p : Principal) : async Pid {
        assert esAdmin(caller);
        let solicitud = Map.remove<Principal, FinanciamientoForm>(proyectosIngresantes, phash, p);
        switch (solicitud) {
            case null { assert false; "" };
            case (?solicitud) {
                let alumno = Map.get<Principal, Alumno>(alumnos, phash, p);
                switch alumno {
                    case null { assert false; "" };
                    case (?alumno) {
                        let proyecto : Proyecto = {
                            solicitud with
                            fechaAprobacion = Time.now();
                            fondosObtenidos = 0;
                            votos = 0;
                            estado = #Aprobado;
                        };
                        let id = generarPid();
                        ignore Map.put<Pid, Proyecto>(proyectosAprobados, thash, id, proyecto);
                        let setProyectos = Set.fromIter<Pid>(alumno.proyectos.vals(), thash);
                        ignore Set.put<Pid>(setProyectos, thash, id);
                        let proyectos = Set.toArray<Pid>(setProyectos);
                        ignore Map.put<Principal, Alumno>(alumnos, phash, p, { alumno with proyectos });
                        id;
                    };
                };
            };
        };
    };

    public shared ({ caller }) func rechazarFinanciamiento(p : Principal) : async () {
        assert esAdmin(caller);
        ignore Map.remove<Principal, FinanciamientoForm>(proyectosIngresantes, phash, p);
    };

    public query func verProyectos() : async [(Pid, Proyecto)] {
        Iter.toArray<(Pid, Proyecto)>(Map.entries<Pid, Proyecto>(proyectosAprobados));
    };

    public query func verProyectosDe(alumnoP : Principal) : async [Proyecto] {
        switch (Map.get<Principal, Alumno>(alumnos, phash, alumnoP)) {
            case null { return [] };
            case (?alumno) {
                let proyectosDe = Buffer.fromArray<Proyecto>([]);
                for (pId in alumno.proyectos.vals()) {
                    switch (Map.get<Pid, Proyecto>(proyectosAprobados, thash, pId)) {
                        case (?pr) {
                            proyectosDe.add(pr);
                        };
                        case _ {};
                    };
                };
                return Buffer.toArray<Proyecto>(proyectosDe);
            };
        };
    };

    public query func verProyectoPorID(id : Pid) : async ?Proyecto {
        Map.get<Pid, Proyecto>(proyectosAprobados, thash, id);
    };

    public shared ({ caller }) func votarProyecto(id : Pid) : async () {
        let usuario = Map.get<Principal, Usuario>(usuarios, phash, caller);
        switch usuario {
            case null { return };
            case (?usuario) {
                let proyecto = Map.get<Pid, Proyecto>(proyectosAprobados, thash, id);
                switch proyecto {
                    case null { return };
                    case (?proyecto) {
                        if (not enArray<Pid>(usuario.proyectosVotados, id, Text.equal)) {
                            let proyectoActualizado = {
                                proyecto with
                                votos = proyecto.votos + 1;
                            };
                            ignore Map.put<Pid, Proyecto>(proyectosAprobados, thash, id, proyectoActualizado);
                            // TODO agregar Pid a lista de proyectos votados del usuario
                        };
                    };
                };
            };
        };
    };

    public shared ({ caller }) func comprarTokens() : async () {
        // TODO
    };

    public query func verNombreProyecto(): async Text {
        "Donate to artists ICP\n" #
        "Hackathon On line ICP Hub México ";
    };

    public query func verTeam(): async Text {
        "Manuel Niño\nAriel Robotti";
    };

    public query func verManifiesto(): async [Text] {
        Manifiesto.manifiesto;
    };

    public query func statusPlatform(): async [{key: Text; value: Text}] {
        [
            {key = "Users"; value = Nat.toText(Map.size(usuarios))},
            {key = "Alumnos"; value = Nat.toText(Map.size(alumnos))},
            {key = "Projects"; value = Nat.toText(Map.size(proyectosAprobados))}
        ]
    };

};
