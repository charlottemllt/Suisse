function feedDetailedPage(i, dateObj){
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
                <a href=${step["parking"]["target"]} target="_blank" class="step-parking"><div class="icon-parking">P</div> ${step["parking"]["text"]}</a>
            `
        }
        if (step["point_de_depart"] != ""){
            step_div.innerHTML += `
                <div class="step-point_de_depart">${step["point_de_depart"]}</div>
            `
        }
        div.appendChild(step_div)
    })

    let previous_btn = document.getElementById("previous")
    let next_btn = document.getElementById("next")
    console.log(`i: ${i}`)
    console.log(`nb_dates: ${nb_dates}`)
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
            feedDetailedPage(i, PLANNING[date])
            let return_btn = document.getElementById("retour")
            return_btn.classList.toggle("hide")
            let nav_pages = document.getElementById("navigation_pages")
            nav_pages.classList.toggle("hide")
            content_planning.classList.toggle("hide")
            let details_div = document.getElementById("details")
            details_div.classList.toggle("hide")
            day_selected = i + 1
            console.log(`day_selected: ${day_selected}`)
        })
    })
}

function customizePages(){

}

function main() {
    day_selected = -1
    list_dates = Object.keys(PLANNING)
    nb_dates = list_dates.length
    console.log(`nb_dates : ${nb_dates}`)
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
        console.log("next_btn event")
        console.log(`day_selected: ${day_selected}`)
        let next_date = list_dates[day_selected]
        feedDetailedPage(day_selected, PLANNING[next_date])
        day_selected = day_selected + 1
        console.log(`day_selected: ${day_selected}`)
    })
    let previous_btn = document.getElementById("previous")
    previous_btn.addEventListener("click", () => {
        console.log("previous_btn event")
        console.log(`day_selected: ${day_selected}`)
        let previous_date = list_dates[day_selected - 2]
        feedDetailedPage(day_selected - 2, PLANNING[previous_date])
        day_selected = day_selected - 1
        console.log(`day_selected: ${day_selected}`)
    })
}