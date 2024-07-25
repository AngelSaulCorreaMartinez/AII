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

    public type RegistroAlumnoForm = Types.RegistroAlumnoForm;
    public type RegistroAdministrativoForm = Types.RegistroAdministrativoForm;
    public type RegistroDocenteForm = Types.RegistroDocenteForm;

    stable var actualUid : Nat = 0;
    stable var actualAid : Nat = 0;

    func generarUid() : Text {
        actualUid += 1;
        "U" # Nat.toText(actualUid);
    };

    func generarAid() : Text {
        actualAid += 1;
        "A" # Nat.toText(actualAid);
    };

    stable let usuarios = Map.new<Principal, Usuario>();
    stable let alumnos = Map.new<Principal, Alumno>();
    stable let admins = Set.new<Principal>();

    stable let administrativos = Map.new<Principal, Administrativo>();
    stable let docentes = Map.new<Principal, Docente>();
    ignore Set.put<Principal>(admins, phash, deployer);
    ignore Set.put<Principal>(admins, phash, deployer);

    stable let alumnosIngresantes = Map.new<Principal, RegistroAlumnoForm>();
    stable let administrativosIngresantes = Map.new<Principal, RegistroAdministrativoForm>();
    stable let docentesIngresantes = Map.new<Principal, RegistroDocenteForm>();

    public shared ({ caller }) func getMyUser() : async ?Usuario {
        Map.get(usuarios, phash, caller);
    };

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

    public shared ({ caller }) func registrarseComoAdministrativo(_init : RegistroAdministrativoForm) : async Text {
        assert not Principal.isAnonymous(caller);
        let usuario = Map.get<Principal, Usuario>(usuarios, Map.phash, caller);
        switch usuario {
            case null { return "Debe registrarse como usuario previamente"; };
            case (?usuario) {
                if (Map.has<Principal, RegistroAdministrativoForm>(administrativosIngresantes, Map.phash, caller)) {
                    return "Usted ya tiene pendiente de aprobación una solicitud de registro como administrativo";
                };
                ignore Map.put<Principal, RegistroAdministrativoForm>(administrativosIngresantes, Map.phash, caller, _init);
                return "Solicitud de registro como administrativo ingresada exitosamente";
            };
        };
    };

    public shared ({ caller }) func registrarseComoDocente(_init : RegistroDocenteForm) : async Text {
        assert not Principal.isAnonymous(caller);
        let usuario = Map.get<Principal, Usuario>(usuarios, Map.phash, caller);
        switch usuario {
            case null { return "Debe registrarse como usuario previamente"; };
            case (?usuario) {
                if (Map.has<Principal, RegistroDocenteForm>(docentesIngresantes, Map.phash, caller)) {
                    return "Usted ya tiene pendiente de aprobación una solicitud de registro como docente";
                };
                ignore Map.put<Principal, RegistroDocenteForm>(docentesIngresantes, Map.phash, caller, _init);
                return "Solicitud de registro como docente ingresada exitosamente";
            };
        };
    };

    public shared ({ caller }) func aprobarRegistroDeAdministrativo(solicitante : Principal) : async Text {
        Debug.print("Approving administrative registration for: " # Principal.toText(solicitante));
        assert esAdmin(caller);
        let usuario = Map.get<Principal, Usuario>(usuarios, Map.phash, solicitante);
        switch usuario {
            case null { return "El usuario no está registrado"; };
            case (?usuario) {
                let solicitud = Map.remove<Principal, RegistroAdministrativoForm>(administrativosIngresantes, Map.phash, solicitante);
                switch (solicitud) {
                    case null { return "No hay solicitud de registro de administrativo para este usuario"; };
                    case (?solicitud) {
                        let nuevoAdministrativo : Administrativo = {
                            solicitud with
                            principalID = solicitante;
                        };
                        ignore Map.put<Principal, Administrativo>(administrativos, Map.phash, solicitante, nuevoAdministrativo);
                        ignore Map.put<Principal, Usuario>(usuarios, Map.phash, solicitante, {usuario with rol = #Administrativo});
                        return "Registro aprobado";
                    };
                };
            };
        };
    };

    public shared ({ caller }) func aprobarRegistroDeDocente(solicitante : Principal) : async Text {
        Debug.print("Approving docente registration for: " # Principal.toText(solicitante));
        assert esAdmin(caller);
        let usuario = Map.get<Principal, Usuario>(usuarios, Map.phash, solicitante);
        switch usuario {
            case null { return "El usuario no está registrado"; };
            case (?usuario) {
                let solicitud = Map.remove<Principal, RegistroDocenteForm>(docentesIngresantes, Map.phash, solicitante);
                switch (solicitud) {
                    case null { return "No hay solicitud de registro de docente para este usuario"; };
                    case (?solicitud) {
                        let nuevoDocente : Docente = {
                            solicitud with
                            principalID = solicitante;
                            materias = solicitud.materias; // Añadir materias
                        };
                        ignore Map.put<Principal, Docente>(docentes, Map.phash, solicitante, nuevoDocente);
                        ignore Map.put<Principal, Usuario>(usuarios, Map.phash, solicitante, {usuario with rol = #Profesor});
                        return "Registro aprobado";
                    };
                };
            };
        };
    };

    public shared query ({ caller }) func verAlumnosIngresantes() : async [(Principal, RegistroAlumnoForm)] {
        assert esAdmin(caller);
        Iter.toArray(Map.entries<Principal, RegistroAlumnoForm>(alumnosIngresantes));
    };

    public shared query ({ caller }) func verAdministrativosIngresantes() : async [(Principal, RegistroAdministrativoForm)] {
        assert esAdmin(caller);
        Iter.toArray(Map.entries<Principal, RegistroAdministrativoForm>(administrativosIngresantes));
    };

    public shared query ({ caller }) func verDocentesIngresantes() : async [(Principal, RegistroDocenteForm)] {
        assert esAdmin(caller);
        Iter.toArray(Map.entries<Principal, RegistroDocenteForm>(docentesIngresantes));
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

    public query func statusPlatform(): async [{key: Text; value: Text}] {
        [
            {key = "Users"; value = Nat.toText(Map.size(usuarios))},
            {key = "Alumnos"; value = Nat.toText(Map.size(alumnos))}
        ]
    };
};
