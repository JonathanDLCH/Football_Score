class Partido {
    constructor(equipoLocal,equipoVisitante){
        this.equipoLocal = new Equipo(equipoLocal.teamName,equipoLocal.puntos);
        this.equipoVisitante = new Equipo(equipoVisitante.teamName,equipoVisitante.puntos);
        this.empateBandera = false;
        //this.equipoGanador = "";
    }

    asignarGanador(golesLocal,golesVisita){
        this.golesLocal = golesLocal;
        this.golesVisita = golesVisita;

        if(golesLocal >= golesVisita){
            this.equipoLocal.ganadorBandera = true;
            //this.equipoGanador = this.equipoLocal.teamName;
        }else if(golesLocal === golesVisita){
            this.empateBandera = true;
        }else{
            this.equipoVisitante.ganadorBandera = true;
            //this.equipoGanador = this.equipoVisitante.teamName;
        }
    }
};

class Equipo{
    constructor(teamName,puntos=0){
        this.teamName=teamName;
        this.puntos=puntos;
        this.ganadorBandera = false;
    }
};

const equipos = [];
let partidos = [];
document.getElementById('InputTeamName').value = "";

document.getElementById("btnAddTeam").addEventListener("click",addTeam);
document.getElementById("btnRegister").addEventListener("click",registrarPartido);



function addTeam(){    
    const team = document.getElementById("InputTeamName").value;
    const newTeam = new Equipo(team.toUpperCase());
    //debemos de agregarlos a los select con una funcion
    renderTeam(newTeam.teamName,'selectLocal');
    renderTeam(newTeam.teamName,'selectVisita');
    document.getElementById('InputTeamName').value = "";
    alert(`Se ha agregado el equipo ${newTeam.teamName} de manera correcta`);
    equipos.push(newTeam);
    renderEncabezado();
    renderFilasTabla();
}

function registrarPartido(){
    //tener los nombres de la vista y el marcador
    const teamLocalNombre = document.getElementById('selectLocal').value;
    const teamVisitanteNombre = document.getElementById('selectVisita').value;
    const golesLocal = document.getElementById('golesLocal').value;
    const golesVisita = document.getElementById('golesVisita').value;
    //buscamos esos equipos para crear un partido
    const teamLocal = busquedaEquipo(teamLocalNombre);
    const teamVisitante = busquedaEquipo(teamVisitanteNombre);
    //validamos que existan los equipos y que sean distintos, de cumplirse creamos el partido y lo
    //guardamos en el arreglo de partidos
    if(valida(teamLocal,teamVisitante) === 0){
        const partidoTmp = new Partido(teamLocal,teamVisitante);
        partidoTmp.asignarGanador(golesLocal,golesVisita);
        sumaPuntos(partidoTmp);
        partidos.push(partidoTmp);
        alert('Se ha registrado el partido y guardado');
        limpiarRegistroPartido();
        renderMarcador(golesLocal,teamLocalNombre,teamVisitanteNombre);
        renderMarcador(golesVisita,teamVisitanteNombre,teamLocalNombre);
    }else {
        alert('No se pudo registrar el partido, algo salio mal')
        limpiarRegistroPartido();
    }
}

function busquedaEquipo(nombreBuscar){
    let equipoTemp;

    if(equipos.length !== 0){ //validamos si hay equipos registrados
        equipos.map((current,index)=>{
            if(nombreBuscar === current.teamName){
                equipoTemp = current;
            }
        });
    } else { // regresamos -1 en caso de que no haya equipos registrados
        return -1
    }

    if(equipoTemp) { // validamos si se encontro el equipo, en caso de que si pues regresamos el equipo
        return equipoTemp;
    }else{
        return -1;
    }
}

function valida(equipo1,equipo2){
    if(equipo1 === -1 || equipo2 === -1){ //significa que un equipo al menos no se encontro o no esta en la lista
        return -1;
    }else if(equipo1.teamName === equipo2.teamName) { //registraron al mismo equipo como local y visitante, esta mal
        return -1;
    }else { //son distintos equipos
        return 0
    }
}

function sumaPuntos(partido){
    if(partido.empateBandera === true){
        sumaUnPunto(partido.equipoLocal,partido.equipoVisitante);
    }else if(partido.equipoLocal.ganadorBandera === true){
        sumaTresPuntos(partido.equipoLocal);
    }else {
        sumaTresPuntos(partido.equipoVisitante);
    }
}

function sumaTresPuntos(equipo){
    for(let i=0;i<equipos.length;i++){
        if(equipos[i].teamName === equipo.teamName){
            equipos[i].puntos += 3;
        }
    }
}

function sumaUnPunto(equipoLocal,equipoVisitante){
    for(let i=0;i<equipos.length;i++){
        if(equipos[i] === equipoLocal || equipos[i] === equipoVisitante){
            equipos[i].puntos += 1;
        }
    }
}

function renderTeam(nombre,idPadre){
    const padre = document.getElementById(idPadre);
    const hijoOption = document.createElement('option');
    hijoOption.textContent = nombre;
    padre.appendChild(hijoOption);
}

function renderEncabezado(){
    const numEquipos = 8;
    if (numEquipos > equipos.length && equipos.length !== 0) {
        const padre = document.getElementById('encabezadoTabla');
        const hijoOption = document.createElement('th');
        hijoOption.textContent = equipos[equipos.length - 1].teamName;
        padre.appendChild(hijoOption);
    }
}

function renderFilasTabla(){
    if(equipos.length === 1){
        for(let i=0;i<equipos.length;i++){
            crearCeldas(equipos[i].teamName);
        }
    }else {       
        for(let i=0;i<equipos.length-1;i++){
            eliminarFila();
        }
        for(let i=0;i<equipos.length;i++){
            crearCeldas(equipos[i].teamName);
        }
    }
}

function limpiarRegistroPartido(){
    document.getElementById('selectLocal').selectedIndex = 0;
    document.getElementById('selectVisita').selectedIndex = 0;
    document.getElementById('golesLocal').value = "";
    document.getElementById('golesVisita').value = "";
}

function eliminarFila(){
    const padreBody = document.getElementById('cuerpoTabla');
    if(padreBody.hasChildNodes()){
        padreBody.removeChild(padreBody.children[0]);
    }
}

function crearCeldas(nombreEquipo){
    const tBody = document.getElementById('cuerpoTabla');
    const tr = document.createElement('tr');
    tr.id = `fila-${nombreEquipo}`;
    const numEquipos = equipos.length;
    for(let i=0;i<=numEquipos;i++){
        const th = document.createElement('th');
        if(i===0){
            th.textContent = nombreEquipo;
        }else {
            th.id = `celda-${nombreEquipo}-${i}`;
        }
        tr.appendChild(th);
    }
    tBody.appendChild(tr);
}

function busquedaPosicion(equipo){
    for(let i=0;i<equipos.length;i++){
        if(equipos[i].teamName === equipo){
            return i;
        }
    }
}

function renderMarcador(golesLocal,nombreEquipoLocal,nombreEquipoVisita){
    let posicion = busquedaPosicion(nombreEquipoVisita) + 1;
    let celda = document.getElementById(`celda-${nombreEquipoLocal}-${posicion}`);
    celda.textContent = golesLocal;
}