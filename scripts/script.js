function feedDetailedPage(i, dateObj, campingObj){
    let div = document.getElementById("details")
    let planning_details = dateObj["planning"]
    div.innerHTML = ""

    let title_div = document.createElement("div")
    title_div.classList = ["title"]
    // title_div.innerHTML = `Jour ${i+1}: ${dateObj["ville_de_depart"]} -> ${dateObj["ville_d_arrivee"]}`
    title_div.innerHTML = `<div class="title-text">Jour ${i+1} : ${dateObj["ville_de_depart"]}</div>`
    if (dateObj["ville_d_arrivee"] != ""){
        title_div.innerHTML = `
            <div class="title-text">Jour ${i+1} : ${dateObj["ville_de_depart"]}
            <i class="fa-solid fa-chevron-right"></i>
            ${dateObj["ville_d_arrivee"]}
            </div>
        `
    }
    let subtitle_div = document.createElement("div")
    subtitle_div.classList = ["subtitle"]
    subtitle_div.innerHTML = dateObj["date_text"]
    title_div.appendChild(subtitle_div)
    div.appendChild(title_div)

    let steps_div = document.createElement("div")
    steps_div.id = "steps"

    planning_details.forEach( (step) => {
        let step_div = document.createElement("div")
        step_div.classList = ["step"]
        let span_hours = ""
        step_div.innerHTML = ""

        if (step["optionnel"]){
            step_div.classList.toggle("optionnal")
        }

        if (Object.keys(step["lien"]).length != 0){
            step_div.innerHTML += `
                <a href=${step["lien"]["target"]} target="_blank" class="step-lien">${step["lien"]["text"]}</a>
            `
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
        step_div.innerHTML += `
            <div class="step-title">${step["titre"]} ${span_hours}</div>
        `

        if (step["description"] != ""){
            step_div.innerHTML += `
                <div class="step-description">${step["description"]}</div>
            `
        }
        if (Object.keys(step["parking"]).length != 0){
            step_div.innerHTML += `
                <a href=${step["parking"]["target"]} target="_blank" class="step-parking"><span class="icon-parking">P</span> <span>${step["parking"]["text"]}</span></a>
            `
        }
        if (step["point_de_depart"] != ""){
            step_div.innerHTML += `
                <div class="step-point_de_depart">${step["point_de_depart"]}</div>
            `
        }
        steps_div.appendChild(step_div)
    })
    div.appendChild(steps_div)

    if (campingObj){
        let selection_camping_div = document.createElement("div")
        selection_camping_div.classList = ["camping selection"]
        selection_camping_div.id = "camping_selection"
        selection_camping_div.innerHTML = '<i class="fa-solid fa-campground"></i>'
        div.appendChild(selection_camping_div)

        let camping_div = document.createElement("div")
        camping_div.classList = ["camping_container hide"]
        camping_div.innerHTML = `
            <div class="camping-container name">
                <i class="fa-solid fa-campground"></i>
                <span class="camping-name">${campingObj["nom"]}</span>
                <i class="fa-solid fa-campground"></i>
            </div>
        `
        if(
            campingObj["heure_arrivee_min"] !== ""
            &&
            campingObj["heure_arrivee_max"] !== ""
        ){
            camping_div.innerHTML += `
                <div class="camping-container hour">
                    <span class="camping-hour">
                        Arrivée entre ${campingObj["heure_arrivee_min"]} et ${campingObj["heure_arrivee_max"]}
                    </span>
                </div>
            `
        }
        else if (campingObj["heure_arrivee_min"] !== ""){
            camping_div.innerHTML += `
                <div class="camping-container hour">
                    <span class="camping-hour">
                        Arrivée après ${campingObj["heure_arrivee_min"]}
                    </span>
                </div>
            `
        }
        else if (campingObj["heure_arrivee_max"] !== ""){
            camping_div.innerHTML += `
                <div class="camping-container hour">
                    <span class="camping-hour">
                        Arrivée avant ${campingObj["heure_arrivee_max"]}
                    </span>
                </div>
            `
        }
        

        if (campingObj["point_gps"] !== ""){
            camping_div.innerHTML += `
                <div class="camping-container location">
                    <a href="${campingObj["point_gps"]}" class="camping-location" target="_blank">
                        <i class="fa-solid fa-location-dot"></i>
                    </a>
                </div>
            `
        }

        if (campingObj["site"] !== ""){
            camping_div.innerHTML += `
                <div class="camping-container website">
                    <a href="${campingObj["site"]}" class="camping-website" target="_blank">
                        <i class="fa-solid fa-globe"></i>
                    </a>
                </div>
            `
        }
        if (campingObj["adresse"] !== ""){
            camping_div.innerHTML += `
                <div class="camping-container address">
                    <i class="fa-solid fa-map-pin"></i>
                    <span class="camping-address">${campingObj["adresse"]}</span>
                </div>
            `
        }
        if (campingObj["telephone"] !== ""){
            camping_div.innerHTML += `
                <div class="camping-container phone">
                    <i class="fa-solid fa-phone"></i>
                    <span class="camping-phone">${campingObj["telephone"]}</span>
                </div>
            `
        }
        camping_div.innerHTML += `
                <div class="camping-container paiement">
                    <i class="fa-solid fa-coins"></i>
                    <span class="camping-paiement">
                        <div>
                            Déjà payé : ${campingObj["paye"]} ${campingObj["monnaie"]}
                        </div>
                        <div>
                            Reste à payer : ${campingObj["reste_a_payer"]} ${campingObj["monnaie"]}
                        </div>
                    </span>
                    <i class="fa-solid fa-coins"></i>
                </div>
            `
        div.appendChild(camping_div)

        let selection_itineraire_div = document.createElement("div")
        selection_itineraire_div.classList = ["itineraire selection hide"]
        selection_itineraire_div.id = "itineraire_selection"
        selection_itineraire_div.innerHTML = '<i class="fa-solid fa-route"></i>'
        div.appendChild(selection_itineraire_div)

        selection_itineraire_div.addEventListener("click", () => {
            selection_itineraire_div.classList.toggle("hide")
            selection_camping_div.classList.toggle("hide")
            steps_div.classList.toggle("hide")
            camping_div.classList.toggle("hide")
        })
        selection_camping_div.addEventListener("click", () => {
            selection_itineraire_div.classList.toggle("hide")
            selection_camping_div.classList.toggle("hide")
            steps_div.classList.toggle("hide")
            camping_div.classList.toggle("hide")
        })
    }

    let previous_btn = document.getElementById("previous")
    let next_btn = document.getElementById("next")
    if (i + 1 == nb_dates){
        // hide next button
        next_btn.classList.add('hide')
        // display previous button
        previous_btn.classList.remove('hide')
    }
    else if (i == 0){
        // display next button
        next_btn.classList.remove('hide')
        // hide previous button
        previous_btn.classList.add('hide')
    }
    else{
        // display both buttons
        next_btn.classList.remove('hide')
        previous_btn.classList.remove('hide')
    }
}

function parkingIcon(){
    let div = document.createElement('div')
    div.classList = ["step-parking"]
    div.innerHTML = "P"
    return div
}

function createPlanning(){
    let content_planning = document.getElementById("content_planning")
    Object.keys(PLANNING).forEach( (date, i) => {
        let day_div = document.createElement("div")
        day_div.id = `day_${i+1}`
        day_div.classList = ["day"]
        day_div.innerHTML = `Jour ${i+1} <span class="date">(${date})</span> : ${PLANNING[date]["ville_de_depart"]}`
        if (PLANNING[date]["ville_d_arrivee"] != ""){
            day_div.innerHTML += `<i class="fa-solid fa-chevron-right"></i>${PLANNING[date]["ville_d_arrivee"]}`
        }
        content_planning.appendChild(day_div);

        let id_div = `day_${i+1}`
        let link_div = document.getElementById(id_div)
        link_div.addEventListener("click", () => {
            feedDetailedPage(i, PLANNING[date], CAMPING[date])
            let return_btn = document.getElementById("retour")
            return_btn.classList.toggle("hide")
            let nav_pages = document.getElementById("navigation_pages")
            nav_pages.classList.toggle("hide")
            content_planning.classList.toggle("hide")
            let details_div = document.getElementById("details")
            details_div.classList.toggle("hide")
            day_selected = i + 1
        })
    })
}

function customizePages(){

}

function main() {
    day_selected = -1
    list_dates = Object.keys(PLANNING)
    nb_dates = list_dates.length
    createPlanning()
    let return_btn = document.getElementById("retour")
    return_btn.addEventListener("click", () => {
        return_btn.classList.toggle("hide")
        let nav_pages = document.getElementById("navigation_pages")
        nav_pages.classList.toggle("hide")
        let div = document.getElementById("details")
        div.innerHTML = ""
        let content_planning = document.getElementById("content_planning")
        content_planning.classList.toggle("hide")
        let details_div = document.getElementById("details")
        details_div.classList.toggle("hide")
        day_selected = -1
    })

    let next_btn = document.getElementById("next")
    next_btn.addEventListener("click", () => {
        let next_date = list_dates[day_selected]
        feedDetailedPage(day_selected, PLANNING[next_date], CAMPING[next_date])
        day_selected = day_selected + 1
    })
    let previous_btn = document.getElementById("previous")
    previous_btn.addEventListener("click", () => {
        let previous_date = list_dates[day_selected - 2]
        feedDetailedPage(day_selected - 2, PLANNING[previous_date], CAMPING[previous_date])
        day_selected = day_selected - 1
    })
}