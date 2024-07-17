//logic for jokes

const setup= document.querySelector('.setup');
const punch= document.querySelector('.punchline');
const joke_api_url='https://official-joke-api.appspot.com/random_joke';

async function getJoke(url){
    const response= await fetch(url);
    var data = await response.json();
    console.log(data);
    setup.innerHTML=data.setup;
    punch.innerHTML=data.punchline;
}

var count=0;
getJoke(joke_api_url);

const newJoke= document.querySelector('.new-joke-btn');
newJoke.addEventListener("click", function() {
    getJoke(joke_api_url);
    console.log(count=count+1);
})

function shareOntweet() {
    const setupText = setup.innerHTML;
    const punchText = punch.innerHTML;
    const tweetUrl = `https://twitter.com/intent/tweet?text=JOKE OF THE DAY!%0A%0A"${setupText}" - %0A${punchText}`;
    window.open(tweetUrl, "Tweet Window", "width=600,height=300");
}

function shareOnEmail() {
    const email = ""; 
    const subject = "JOKE OF THE DAY!";
    const joketext = `${setup.innerText}-${punch.innerText}`;
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(joketext)}`;
    
    const windowFeatures = "width=800,height=600,left=20,top=100";
    window.open(mailtoUrl, '_blank','GmailWindow', windowFeatures);
}

function shareOnLinkedIn() {
    var title = "JOKE OF THE DAY!";
    var summary = `"${setup.innerText.trim()}" - ${punch.textContent.trim()}`;
    var linkedinurl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(title)}%0A%0A${encodeURIComponent(summary)}%0A%0A %23NewPost %23JokeoftheDay %23FunJokes`;
    window.open(linkedinurl, "_blank", "width=600,height=400");
}