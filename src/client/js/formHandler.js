import { json } from "body-parser";

async function handleSubmit(event) {
    event.preventDefault();
    let formText = document.getElementById("input").value;
    let error = document.getElementById("error");
    let results = document.getElementById("resultText");
    
    //Analyzes text/link
    await Client.analyze(formText);
    
    //Shows analysis on screen
    if (formText === "") {
        error.hidden = false;
        results.hidden = true;
    } else {
        error.hidden = true;
        results.hidden = false;
        fetch ("/getdata")
        .then (res => res.json())
        .then(function(data) {
            //makes "score" more understandable
            if(data.score_tag == "NONE"){
            document.getElementById("results").innerHTML = 
                `<div> <p>Sentiment: NOT DETECTABLE </br>
                Agreement: ${data.agreement}</br>
                Subjectivity: ${data.subjectivity}</br>
                Confidence: ${data.confidence}</br>
                Irony: ${data.irony}<p><div>`
            } else if(data.score_tag == "P+"){
                document.getElementById("results").innerHTML =
                `<div> <p>Sentiment: STRONG POSITIVE</br>
                Agreement: ${data.agreement}</br>
                Subjectivity: ${data.subjectivity}</br>
                Confidence: ${data.confidence}</br>
                Irony: ${data.irony}<p><div>`
            } else if(data.score_tag == "P"){
                document.getElementById("results").innerHTML =
                `<div> <p>Sentiment: POSITIVE</br>
                Agreement: ${data.agreement}</br>
                Subjectivity: ${data.subjectivity}</br>
                Confidence: ${data.confidence}</br>
                Irony: ${data.irony}<p><div>`
            } else if(data.score_tag == "NEU"){
                document.getElementById("results").innerHTML =
                `<div> <p>Sentiment: NEUTRAL</br>
                Agreement: ${data.agreement}</br>
                Subjectivity: ${data.subjectivity}</br>
                Confidence: ${data.confidence}</br>
                Irony: ${data.irony}<p><div>`
            } else if(data.score_tag == "N"){
                document.getElementById("results").innerHTML =
                `<div> <p>Sentiment: NEGATIVE</br>
                Agreement: ${data.agreement}</br>
                Subjectivity: ${data.subjectivity}</br>
                Confidence: ${data.confidence}</br>
                Irony: ${data.irony}<p><div>`
            } else if(data.score_tag == "N+"){
                document.getElementById("results").innerHTML =
                `<div> <p>Sentiment: STRONG NEGATIVE</br>
                Agreement: ${data.agreement}</br>
                Subjectivity: ${data.subjectivity}</br>
                Confidence: ${data.confidence}</br>
                Irony: ${data.irony}<p><div>`
            }
            
            
        })
        .catch(err => {
            console.error(err);
        })
    }
}
    
    

export { handleSubmit }