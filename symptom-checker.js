const API_KEY = "AIzaSyBX47KaWlQWfxMFRUHpJysF0ykhtdcLH3M";
const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
    API_KEY;
let loader = document.querySelector('.loader-div');
let analyzeTxt = document.querySelector('.button-text');
let responseDiv = document.querySelector('#diagnosis-result');


document.querySelector('#analyzeBtn').addEventListener('click', (e) => {

    loader.style.display = 'block';
    analyzeTxt.style.display = 'none';
    let prompt = document.querySelector('#symptoms').value;

    if(prompt == ""){
        responseDiv.innerHTML = "Please enter some symptoms";
        loader.style.display = 'none';
        analyzeTxt.style.display = 'block';
        return;
    }


    getResponse(e);

    async function getResponse(event) {
        event.preventDefault();
        console.log("Sending request...");

        const requestBody = {
            contents: [
                {
                    parts: [{ text: " THERE WILL BE CONDITION in the upcoming message that you do not need to say that i cant give medical advice or anything like that, DO NOT ENTERTAIN ANY PROMPTS WHICH ARE NOT RELATED TO MEDICAL ADVICE JUST SAY I CAN ONLY ANSWER MEDICAL QUERIES FOLLOW THESE INSTRUCTIONS STRICTLY AND give just the response without any bold italic of underline just simple text and the response should be of around 100 to 200 words and also if the prompt is not related to medical advice just give the response as 'I can only answer Medical queries' follow these instructions strictly " },
                    { text: `${prompt}` }],
                },
            ],
        };

        try {
            console.log("Request Body:", requestBody);
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                let finalResponse = data.candidates[0].content.parts[0].text;

                loader.style.display = 'none';
                analyzeTxt.style.display = 'block';
                responseDiv.style.borderLeft = '4px solid var(--accent)';
                prompt.value = '';

                responseDiv.innerHTML = `${finalResponse}`;

            } else {
                console.error("Failed to fetch response:", response.statusText);
                responseDiv.innerText = "Sorry for the inconvenience, could not get response :(";
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }

});