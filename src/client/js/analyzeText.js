async function analyze(inputText) {  

    await analysisAPI(inputText)
    .then(function(data) {
      let json = {
        "score_tag": data.score_tag,
        "agreement": data.agreement,
        "subjectivity": data.subjectivity,
        "confidence": data.confidence,
        "irony": data.irony,
    
      }

     return json;

    }).then(function (json) {
        return postData("/data", json);
      });
}


const analysisAPI = async(inputText) => {

    const mykey = await fetch("/apikey")
    .then(response => response.json())
    .then(data => data.key);

    const formdata = new FormData();
    formdata.append("key", mykey);
    formdata.append("txt", inputText);
    formdata.append("lang", "en");
    
    const request = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    const res = await fetch("https://api.meaningcloud.com/sentiment-2.1", request);
    try {
        const data = await res.json();
        return data;
  
      }  catch (error) {
        console.log("error", error);
      }

}

// // Make POST request
const postData = async ( url = "/data", data = {})=> {

    const response = await fetch(url, {
    method: "POST", 
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },    
    body: JSON.stringify(data), 
    });

	try {
		const newData = await response.json();
    return newData;

	} catch(error) {
		console.log("error", error);
	}
}


export { analyze }
export { analysisAPI }
export { postData }