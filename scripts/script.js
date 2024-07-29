function feedDetailedPage(i, dateObj){
    let div = document.getElementById("details")
    let planning_details = dateObj["planning"]
    div.innerHTML = ""
    let title_div = document.createElement("div")
    title_div.classList = ["title"]
    // title_div.innerHTML = `Jour ${i+1}: ${dateObj["ville_de_depart"]} -> ${dateObj["ville_d_arrivee"]}`
    title_div.innerHTML = `Jour ${i+1} : ${dateObj["ville_de_depart"]}`
        if (dateObj["ville_d_arrivee"] != ""){
            title_div.innerHTML += `<i class="fa-solid fa-chevron-right"></i> ${dateObj["ville_d_arrivee"]}`
        }
    div.appendChild(title_div)
    planning_details.forEach( (step) => {
        let step_div = document.createElement("div")
        step_div.classList = ["step"]
        let span_hours = ""

        if (step["optionnel"]){
            step_div.classList.toggle("optionnal")
        }

        if (step["heure_de_debut"] && step["heure_de_fin"]){{
            span_hours = `
            <span class="step-hours">(${step["heure_de_debut"]} - ${step["heure_de_fin"]})</span>
            `
        }}
        else if (step["heure_de_debut"]){
            span_hours = `
                <span class="step-hours">(à partir de ${step["heure_de_debut"]})</span>
            `
        }
        else if (step["heure_de_fin"]){
            span_hours = `
                <span class="step-hours">(jusqu'à ${step["heure_de_fin"]})</span>
            `
        }
        
        step_div.innerHTML = `
            <div class="step-title">${step["titre"]} ${span_hours}</div>
        `
        if (step["description"] != ""){
            step_div.innerHTML += `
                <div class="step-description">${step["description"]}</div>
            `
        }
        if (Object.keys(step["lien"]).length != 0){
            step_div.innerHTML += `
                <a href=${step["lien"]["target"]} target="_blank" class="step-lien">${step["lien"]["text"]}</a>
            `
        }
        if (step["parking"] != ""){
            step_div.innerHTML += `
                <div class="step-parking">${step["parking"]}</div>
            `
        }
        if (step["point_de_depart"] != ""){
            step_div.innerHTML += `
                <div class="step-point_de_depart">${step["point_de_depart"]}</div>
            `
        }
        div.appendChild(step_div)
    })
}

function createPlanning(){
    let content_planning = document.getElementById("content_planning")
    Object.keys(PLANNING).forEach( (date, i) => {
        let day_div = document.createElement("div")
        day_div.id = `day_${i+1}`
        day_div.classList = ["day"]
        day_div.innerHTML = `Jour ${i+1} : ${PLANNING[date]["ville_de_depart"]}`
        if (PLANNING[date]["ville_d_arrivee"] != ""){
            day_div.innerHTML += `<i class="fa-solid fa-chevron-right"></i>${PLANNING[date]["ville_d_arrivee"]}`
        }
        content_planning.appendChild(day_div);

        let id_div = `day_${i+1}`
        let link_div = document.getElementById(id_div)
        link_div.addEventListener("click", () => {
            feedDetailedPage(i, PLANNING[date])
            let return_btn = document.getElementById("retour")
            return_btn.classList.toggle("hide")
            content_planning.classList.toggle("hide")
        })
    })
}

function customizePages(){

}

function main() {
    day_selected = ""
    createPlanning()
    let return_btn = document.getElementById("retour")
    return_btn.addEventListener("click", () => {
        return_btn.classList.toggle("hide")
        let div = document.getElementById("details")
        div.innerHTML = ""
        let content_planning = document.getElementById("content_planning")
        content_planning.classList.toggle("hide")
    })
}