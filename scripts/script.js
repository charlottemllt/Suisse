function createPlanning() {
    let content_planning = document.getElementById("content_planning")
    Object.keys(PLANNING).forEach( (date, i) => {
        let day_div = document.createElement("div")
        day_div.id = `day_${i+1}`
        day_div.classList = ["day"]
        day_div.innerHTML = `<a href="detail_jour.html">Jour ${i+1}</a> : ${PLANNING[date]["ville_de_depart"]} -> ${PLANNING[date]["ville_d_arrivee"]}`
        content_planning.appendChild(day_div);
    })
}

function customizePages(){

}

function main() {
    createPlanning()
}