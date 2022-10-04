class Equipo{
    constructor(teamName){
        this.teamName=teamName;
        this.puntos=0;
        this.partidos=[]; //guardamos los marcadores
    }
}

const equipos = [];

document.getElementById("btnAddTeam").addEventListener("click",addTeam);
document.getElementById("btnRegister").addEventListener("click",addPoints);

function addTeam(){    
    const team = document.getElementById("InputTeamName").value;
    const newTeam = new Equipo(team.toUpperCase());
    console.log(newTeam);
    equipos.push(newTeam);
}

function addPoints(){
    console.log("agregamos al equipo");
    const team = document.getElementById("InputTeamName").value;
    console.log(team);
}