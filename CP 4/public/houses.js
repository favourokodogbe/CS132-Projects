(function() {
    "use strict";

    function init() {
        id("dabney-btn").addEventListener("click", houseInfo);
        id("flem-btn").addEventListener("click", houseInfo);
        id("blacker-btn").addEventListener("click", houseInfo);
        id("avery-btn").addEventListener("click", houseInfo);
        id("page-btn").addEventListener("click", houseInfo);
        id("lloyd-btn").addEventListener("click", houseInfo);
        id("ricketts-btn").addEventListener("click", houseInfo);
        id("ven-btn").addEventListener("click", houseInfo);
        id("back-btn").addEventListener("click", returnHome);
        id("alert-btn").addEventListener("click", () => window.location.href = "https://housing.caltech.edu/undergrads/undergrad-houses-and-residences");
    }

    let value = "";
    
    /**
     * This function displays the house information view.
     * It takes the id and attach a value based on the button clicked.
     * It fetches the data and info.
     * No parameters or returns
     */
    function houseInfo() {
        id("house-info").classList.remove("hidden");
        id("h2").classList.add("hidden");
        id("houses").classList.add("hidden");

        if (this.id == "dabney-btn") {
            value = "Dabney";
        } else if (this.id == "flem-btn") {
            value = "Fleming";
        } else if (this.id == "blacker-btn") {
            value = "Blacker";
        } else if (this.id == "avery-btn") {
            value = "Avery";
        } else if (this.id == "page-btn") {
            value = "Page";
        } else if (this.id == "lloyd-btn") {
            value = "Lloyd";
        } else if (this.id == "ricketts-btn") {
            value = "Ricketts";
        } else if (this.id == "ven-btn") {
            value = "Venerable";
        }
        getData();
        getInfo();
    }

    /**
     * This function takes the response 
     * from the url and returns a response
     * as a json file to be processed.
     * No parameters or returns
     */
    async function getData() {
        let url = "/data";
        try {
            let resp = await fetch(url);
            let response = checkStatus(resp);
            response = await resp.json();
            processResponse(response);
        } catch(err) {
            handleError(err);
        }
    }

    /**
     * This function takes the response 
     * from getData() and sets certain ids
     * to certain text value.
     * No parameters or returns
     */
    function processResponse(data) {
        id("house-name").textContent = "";
        id("h1").textContent += " Information";
        for (let house in data) {
            if (house === value) {
                let p = gen("span");
                p.textContent = data[house]["house-name"];
                id("house-name").appendChild(p);
                id("pres-name").textContent = data[house]["president-name"];
                id("full-fee").textContent = data[house]["full-fee"];
                id("social-fee").textContent = data[house]["social-fee"];
            }
        }
    }

    /**
     * This function takes the response 
     * from the url and returns a response
     * as a text file to be processed.
     * No parameters or returns
     */
    async function getInfo() {
        let url = "/info";
        try {
            let resp = await fetch(url);
            let response = checkStatus(resp);
            response = await resp.text();
            processInfo(response);
        } catch {
            handleError();
        }
    }

    /**
     * This function takes the response 
     * from getInfo() and puts the response
     * in the button.
     * No parameters or returns
     */
    function processInfo(response) {
        id("alert-btn").textContent = response;
    }


    /**
     * Ths function takes the user back to the home page.
     */
    function returnHome() {
        id("houses").classList.remove("hidden");
        id("h2").classList.remove("hidden");
        id("house-info").classList.add("hidden");
        id("h1").textContent = "Caltech House Membership";
    }
    /**
     * Ths function returns an error if there is an issue 
     * with the data API.
     */
    function handleError() {
        id("house-name").textContent = "An error ocurred fetching the Caltech House data. Please try again later.";
    }

    init();
})();
