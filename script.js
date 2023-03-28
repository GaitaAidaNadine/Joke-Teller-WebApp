const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '3da91aea660a41d88470c5cdbe2a798c',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    }); 
}

// Get Jokes from Joke API
async function getJokes() {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    let joke = '';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup}...${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke);
    } catch (error) {
        console.log(error);
    }
}

function toggleButton() {
    button.disabled = !button.disabled;
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('play', toggleButton)
audioElement.addEventListener('ended', toggleButton)