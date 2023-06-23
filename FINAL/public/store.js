(function() {
    "use strict";

    function init() {
        getData();
        id("search-btn1").addEventListener("click", genderResults);
        id("search-btn2").addEventListener("click", clothResults);
        id("cart-btn").addEventListener("click", getCart);
        id("submit-btn").addEventListener("click", addReviews);
        id("review-btn").addEventListener("click", getReviews);
        id("contact-btn").addEventListener("click", addContact);
        id("leavecontact-btn").addEventListener("click", viewContact);
        id("leavereview-btn").addEventListener("click", leaveReview);
    }
    
    /**
     * This function fetches the data from 
     * data.json which is all the information 
     * about the clothes.
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
     * This function populates the main page
     * with all the items with their names, prices,
     * descriptions, and images using the data 
     * received from data.json.
     * @param {Object} data 
     */
    function processResponse(data) {
        for (let i = 0; i < data.length; i++)  {
            let article = gen("article");
            let h3 = gen("h3");
            let img = gen("img");
            let hr = gen("hr");
            let p1 = gen("p");
            let p2 = gen("span");
            h3.textContent = data[i]["name"];
            img.src = data[i]["image"];
            p1.textContent = data[i]["description"];
            p2.textContent = data[i]["price"];
            article.appendChild(h3);
            article.appendChild(img);
            article.appendChild(hr);
            article.appendChild(p1);
            article.appendChild(p2);
            article.addEventListener("click", () => {
                showProduct(h3, img, p1, p2)
            });
            id("item-container").appendChild(article);
        }
    }

    /**
     * This function displays the product information
     * and customizations for the user to add the item
     * to their cart or leave a review.
     * @param {DOM element} h3 
     * @param {DOM element} img 
     * @param {DOM element} p1 
     * @param {DOM elemenr} p2 
     */
    function showProduct(h3, img, p1, p2) {
        id("main-point").textContent = "Click the store name to return back to the home page!"
        id("filter-view").classList.add("hidden");
        id("main-view").classList.add("hidden");
        id("product-view").classList.remove("hidden");
        id("review-view").classList.add("hidden");
        id("review-page").classList.add("hidden");
        id("contact-page").classList.add("hidden");
        id("cart-view").classList.add("hidden");
        id("item-name").textContent = h3.textContent;
        id("product-img").src = img.src;
        id("item-desc").textContent = p1.textContent;
        id("price-value").textContent = p2.textContent;
        let button = gen("button");
        button.textContent = "Add to Cart";
        id("product-view").appendChild(button);
        button.addEventListener("click", () => addCart(h3, img, p2));
    }
    
    /**
     * This function adds all other pages to hidden display 
     * and displays the review page for the viewer to leave reviews
     * on the clothes.
     */
    function leaveReview() {
        id("review-page").classList.remove("hidden");
        id("review-view").classList.add("hidden");
        id("filter-view").classList.add("hidden");
        id("main-view").classList.add("hidden");
        id("contact-page").classList.add("hidden");
        id("product-view").classList.add("hidden");
        id("cart-view").classList.add("hidden");
    }

    /**
     * This function adds all other pages to hidden display 
     * and displays the contact page for the viewer to leave comments.
     */
    function viewContact() {
        id("contact-page").classList.remove("hidden");
        id("review-page").classList.add("hidden");
        id("review-view").classList.add("hidden");
        id("filter-view").classList.add("hidden");
        id("main-view").classList.add("hidden");
        id("product-view").classList.add("hidden");
        id("cart-view").classList.add("hidden");
    }

    /**
     * This function adds the person's name, the date, 
     * and the information they wrote into contact.json
     */
    async function addContact() {
        let params = new FormData();
        let name = id("contact-name").value;
        let date = id("date").value;
        let information = id("information").value;
        params.append("name", name);
        params.append("date", date);
        params.append("info", information);
        try {
            let resp = await fetch("/addToContact", {method : "POST", body : params});
            checkStatus(resp);
        } catch(err) {
            handleError(err);
        }
    }

    /**
     * This function adds the review using the person's name, 
     * clothing name, and review words to the review.json. 
     */
    async function addReviews() {
        let params = new FormData();
        let name = id("name").value;
        let clothing = id("clothing").value;
        let review = id("review-words").value;
        params.append("name", name);
        params.append("clothing", clothing);
        params.append("review", review);
        try {
            let resp = await fetch("/addToReviews", {method : "POST", body : params});
            checkStatus(resp);
        } catch(err) {
            handleError(err);
        }
    }

    /**
     * This function fetches the reviews from review.json
     */
    async function getReviews() {
        let url = "/review";
        try {
            let resp = await fetch(url);
            let response = checkStatus(resp);
            response = await resp.json();
            viewReviews(response);
        } catch(err) {
            handleError(err);
        }
    }

    /**
     * This function allows for the client to
     * view all the reviews of all the products so far.
     * @param {Object} response 
     */
    function viewReviews(response) {
        while (id("review-view").firstChild) {
            id("review-view").removeChild(id("review-view").firstChild);
        }
        id("review-view").classList.remove("hidden");
        id("review-page").classList.add("hidden");
        id("main-view").classList.add("hidden");
        id("filter-view").classList.add("hidden");
        id("product-view").classList.add("hidden");
        id("contact-page").classList.add("hidden");
        id("cart-view").classList.add("hidden");
        for (let i = 0; i < response.length; i++) {
            let h2 = gen("h2");
            let h3 = gen("h3");
            let p = gen("p");
            let article = gen("article");
            h2.textContent = response[i]["name"];
            h3.textContent = response[i]["clothing"];
            p.textContent = response[i]["review"];
            article.appendChild(h2);
            article.appendChild(h3);
            article.appendChild(p);
            id("review-view").appendChild(article);
        }
    }

    /**
     * The function adds the selected item's name, image
     * src, and price vcalue to cart.json 
     * @param {DOM element} h3 
     * @param {DOM element} img 
     * @param {DOM element} price 
     */
    async function addCart(h3, img, price) {
        if (id("product-color").value === "Choose-color" && id("product-size").value === "Choose-size") {
            id("product-p").textContent = "You must select a color and size for the item to be added to your cart!";
        } else {
            let params = new FormData();
            let color = id("product-color").value;
            let size = id("product-size").value;
            params.append("name", h3.textContent);
            params.append("size", size);
            params.append("color", color);
            params.append("image", img.src);
            params.append("price", price.textContent);
            try {
                let resp = await fetch("/addToCart", {method : "POST", body : params});
                checkStatus(resp);
                id("product-p").textContent = "Your item has been added to the cart!";
                id("product-color").value = "Choose-color";
                id("product-size").value = "Choose-size";
            } catch(err) {
                handleError(err);
            }
        }
        
    }

    /**
     * This function fetches the cart information from 
     * the cart.json file.
     */
    async function getCart() {
        let url = "/cart";
        try {
            let resp = await fetch(url);
            let response = checkStatus(resp);
            response = await resp.json();
            viewCart(response);
        } catch(err) {
            handleError(err);
        }
    }

    /**
     * This function allows for the client to view the items in the 
     * cart.
     * @param {Object} response 
     */
    function viewCart(response) {
        while (id("cart-view").firstChild) {
            id("cart-view").removeChild(id("cart-view").firstChild);
        }
        id("product-view").classList.add("hidden");
        id("main-view").classList.add("hidden");
        id("review-page").classList.add("hidden");
        id("filter-view").classList.add("hidden");
        id("contact-page").classList.add("hidden");
        id("review-view").classList.add("hidden");
        id("cart-view").classList.remove("hidden");
        for (let i = 0; i < response.length; i++) {
            let img = gen("img");
            let section = gen("section");
            let h4 = gen("h4");
            let p1 = gen("p");
            let p2 = gen("p");
            let article = gen("article");
            let p3 = gen("p");
            let span1 = gen("span");
            let span2 = gen("span");
            let span3 = gen("span");
            let button = gen("button");
            img.src = response[i]["image"];
            h4.textContent = response[i]["name"];
            p1.textContent = "Color: ";
            p2.textContent = "Size: ";
            p3.textContent = "Price: $";
            button.textContent = "Click to remove.";
            span1.textContent = response[i]["color"];
            span2.textContent = response[i]["size"];
            span3.textContent = response[i]["price"];
            p1.appendChild(span1);
            p2.appendChild(span2);
            p3.appendChild(span3);
            section.appendChild(h4);
            section.appendChild(p1);
            section.appendChild(p2);
            section.appendChild(p3);
            article.appendChild(img);
            article.appendChild(section);
            article.appendChild(button);
            id("cart-view").appendChild(article);
            button.addEventListener("click", () => {
                removeCart(h4, span1, span2)
            });
        }
    }
    async function removeCart(h4, span1, span2) {
        let params = new FormData();
        let name = h4.textContent;
        let color = span1.textContent;
        let size = span2.textContent;
        params.append("name", name);
        params.append("size", size);
        params.append("color", color);  
        try {
            let resp = await fetch("/removeCart", {method : "POST", body : params});
            checkStatus(resp);
        } catch(err) {
            handleError(err);
        }
        getCart();
    }

    function genderResults() {
        id("review-view").classList.add("hidden");
        id("main-view").classList.add("hidden");
        id("review-page").classList.add("hidden");
        id("cart-view").classList.add("hidden");
        id("contact-page").classList.add("hidden");
        id("product-view").classList.add("hidden");
        id("filter-view").classList.remove("hidden");
        while (id("filter-container").firstChild) {
            id("filter-container").removeChild(id("filter-container").firstChild);
        }
        if (id("gender-options").value === "female") {
            for (let i = 0; i < clothes.length; i++) {
                if (clothes[i]["gender-type"] === "female") {
                    let article = gen("article");
                let h3 = gen("h3");
                let img = gen("img");
                let hr = gen("hr");
                let p1 = gen("p");
                let p2 = gen("span");
                h3.textContent = clothes[i]["name"];
                img.src = clothes[i]["image"];
                p1.textContent = clothes[i]["description"];
                p2.textContent = clothes[i]["price"];
                article.appendChild(h3);
                article.appendChild(img);
                article.appendChild(hr);
                article.appendChild(p1);
                article.appendChild(p2);
                id("filter-container").appendChild(article);
                article.addEventListener("click", () => {
                    showProduct(h3, img, p1, p2)
                });
                }
            }
        } else if (id("gender-options").value === "male") {
            for (let i = 0; i < clothes.length; i++) {
                if (clothes[i]["gender-type"] === "male") {
                    let article = gen("article");
                let h3 = gen("h3");
                let img = gen("img");
                let hr = gen("hr");
                let p1 = gen("p");
                let p2 = gen("span");
                h3.textContent = clothes[i]["name"];
                img.src = clothes[i]["image"];
                p1.textContent = clothes[i]["description"];
                p2.textContent = clothes[i]["price"];
                article.appendChild(h3);
                article.appendChild(img);
                article.appendChild(hr);
                article.appendChild(p1);
                article.appendChild(p2);
                id("filter-container").appendChild(article);
                article.addEventListener("click", () => {
                    showProduct(h3, img, p1, p2)
                });
                }
            }
        }
        id("gender-options").value = "Choose-gender";
    }

    function clothResults() {
        id("cart-view").classList.add("hidden");
        id("product-view").classList.add("hidden");
        id("review-page").classList.add("hidden");
        id("contact-page").classList.add("hidden");
        id("review-view").classList.add("hidden");
        id("main-view").classList.add("hidden");
        id("filter-view").classList.remove("hidden");
        while (id("filter-container").firstChild) {
            id("filter-container").removeChild(id("filter-container").firstChild);
        }
        if (id("cloth-options").value === "tops") {
            for (let i = 0; i < clothes.length; i++) {
                if (clothes[i]["clothing-type"] === "tops") {
                    let article = gen("article");
                let h3 = gen("h3");
                let img = gen("img");
                let hr = gen("hr");
                let p1 = gen("p");
                let p2 = gen("span");
                h3.textContent = clothes[i]["name"];
                img.src = clothes[i]["image"];
                p1.textContent = clothes[i]["description"];
                p2.textContent = clothes[i]["price"];
                article.appendChild(h3);
                article.appendChild(img);
                article.appendChild(hr);
                article.appendChild(p1);
                article.appendChild(p2);
                id("filter-container").appendChild(article);
                article.addEventListener("click", () => {
                    showProduct(h3, img, p1, p2)
                });
                }
            }
        } else if (id("cloth-options").value === "bottoms") {
            for (let i = 0; i < clothes.length; i++) {
                if (clothes[i]["clothing-type"] === "bottoms") {
                    let article = gen("article");
                let h3 = gen("h3");
                let img = gen("img");
                let hr = gen("hr");
                let p1 = gen("p");
                let p2 = gen("span");
                h3.textContent = clothes[i]["name"];
                img.src = clothes[i]["image"];
                p1.textContent = clothes[i]["description"];
                p2.textContent = clothes[i]["price"];
                article.appendChild(h3);
                article.appendChild(img);
                article.appendChild(hr);
                article.appendChild(p1);
                article.appendChild(p2);
                id("filter-container").appendChild(article);
                article.addEventListener("click", () => {
                    showProduct(h3, img, p1, p2)
                });
                }
            }
        } else if (id("cloth-options").value === "bottoms") {
            for (let i = 0; i < clothes.length; i++) {
                if (clothes[i]["clothing-type"] === "bottoms") {
                    let article = gen("article");
                let h3 = gen("h3");
                let img = gen("img");
                let hr = gen("hr");
                let p1 = gen("p");
                let p2 = gen("span");
                h3.textContent = clothes[i]["name"];
                img.src = clothes[i]["image"];
                p1.textContent = clothes[i]["description"];
                p2.textContent = clothes[i]["price"];
                article.appendChild(h3);
                article.appendChild(img);
                article.appendChild(hr);
                article.appendChild(p1);
                article.appendChild(p2);
                id("filter-container").appendChild(article);
                article.addEventListener("click", () => {
                    showProduct(h3, img, p1, p2)
                });
                }
            }
        } else if (id("cloth-options").value === "accessories") {
            for (let i = 0; i < clothes.length; i++) {
                if (clothes[i]["clothing-type"] === "accessories") {
                    let article = gen("article");
                let h3 = gen("h3");
                let img = gen("img");
                let hr = gen("hr");
                let p1 = gen("p");
                let p2 = gen("span");
                h3.textContent = clothes[i]["name"];
                img.src = clothes[i]["image"];
                p1.textContent = clothes[i]["description"];
                p2.textContent = clothes[i]["price"];
                article.appendChild(h3);
                article.appendChild(img);
                article.appendChild(hr);
                article.appendChild(p1);
                article.appendChild(p2);
                id("filter-container").appendChild(article);
                article.addEventListener("click", () => {
                    showProduct(h3, img, p1, p2)
                });
                }
            }
        } else if (id("cloth-options").value === "shoes") {
            for (let i = 0; i < clothes.length; i++) {
                if (clothes[i]["clothing-type"] === "shoesware") {
                    let article = gen("article");
                let h3 = gen("h3");
                let img = gen("img");
                let hr = gen("hr");
                let p1 = gen("p");
                let p2 = gen("span");
                h3.textContent = clothes[i]["name"];
                img.src = clothes[i]["image"];
                p1.textContent = clothes[i]["description"];
                p2.textContent = clothes[i]["price"];
                article.appendChild(h3);
                article.appendChild(img);
                article.appendChild(hr);
                article.appendChild(p1);
                article.appendChild(p2);
                id("filter-container").appendChild(article);
                article.addEventListener("click", () => {
                    showProduct(h3, img, p1, p2)
                });
                }
            }
        } 
        id("cloth-options").value = "Choose-clothing";
    }

    function handleError() {
        console.log("An error ocurred fetching the store data. Please try again later.");
    }

    init();
})();
