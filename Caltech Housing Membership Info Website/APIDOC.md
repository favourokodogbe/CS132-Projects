# Favour Okodogbe API Documentation
*
The API gives the house name, president name, full 
membership fee, and social membership fee for each 
house at Caltech. 

If there is an error in getting the data, it returns
the error 500 with the text returned being "Error in
fetching data".
*

## *Fill in Endpoint 1 (GET text/plain Example)*
**Request Type:** */info*

**Returned Data Format**: Plain Text

**Description:** *It takes the user to the Caltech Housing 
website for more information on the houses*

**Supported Parameters** *(req, res)*

**Example Request:** * There is no request *

**Example Response:**
```
"For more information on Caltech Houses, 
click here to visit the Caltech Housing website."
```

**Error Handling:**
*If there is an error in getting the data, it returns
the error 500 with the text returned being "Error in
fetching data".*

## *Fill in Endpoint 2 Title (GET json Example)*
**Request Format:** */data*

**Returned Data Format**: JSON

**Description:** *It gets the president name, house name, 
and membership fees for each Caltech House.*

**Supported Parameters** *No parameters*

**Example Request:** *No request*

**Example Response:**

```json
{
{
    "Lloyd": {
        "house-name": "Lloyd",
        "president-name": "Leo Williams",
        "full-fee": "100",
        "social-fee": "70"
    },

    "Fleming": {
        "house-name": "Fleming",
        "president-name": "Andrew Pasco",
        "full-fee": "80",
        "social-fee": "50"
    },

    "Venerable": {
        "house-name": "Venerable",
        "president-name": "Emily Choe",
        "full-fee": "60",
        "social-fee": "30"
    },

    "Ricketts": {
        "house-name": "Ricketts",
        "president-name": "Megan Robertson",
        "full-fee": "40",
        "social-fee": "10"
    },

    "Page": {
        "house-name": "Page",
        "president-name": "Rik Bose",
        "full-fee": "150",
        "social-fee": "75"
        
    },

    "Dabney": {
        "house-name": "Dabney",
        "president-name": "Tomas Wexler",
        "full-fee": "33",
        "social-fee": "20"
    },

    "Avery": {
        "house-name": "Avery",
        "president-name": "Parul Singh",
        "full-fee": "95",
        "social-fee": "45"
    },

    "Blacker": {
        "house-name": "Blacker",
        "president-name": "Aditee Prabhutendolkar",
        "full-fee": "75",
        "social-fee": "25"
    }
}
}
```

**Error Handling:**
*If there is an error in getting the data, it returns
the error 400 with the text returned being "Error in
fetching data".*

