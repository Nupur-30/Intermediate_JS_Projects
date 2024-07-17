//logic for facts

const fact= document.querySelector('.fact');
const fact_api_url='https://uselessfacts.jsph.pl/api/v2/facts/random';

async function getfact(url){
    const response= await fetch(url);
    var data = await response.json();
    console.log(data);
    fact.innerHTML=data.text;
}

var count=0;
getfact(fact_api_url);

const newfact= document.querySelector('.new-fact-btn');
newfact.addEventListener("click", function() {
    getfact(fact_api_url);
    console.log(count=count+1);
})

function shareOntweet() {
    const factText = fact.innerHTML;
    const tweetUrl = `https://twitter.com/intent/tweet?text=FACT OF THE DAY!%0A%0A"${factText}" %0A%0A%23NewPost %23factoftheDay %23Funfacts`;
    window.open(tweetUrl, "Tweet Window", "width=600,height=300");
}

function shareOnEmail() {
    const email = ""; 
    const subject = "FACT OF THE DAY!";
    const factText = `${fact.innerText}`;
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(factText)}`;
    
    const windowFeatures = "width=800,height=600,left=20,top=100";
    window.open(mailtoUrl, '_blank','GmailWindow', windowFeatures);
}

function shareOnLinkedIn() {
    var title = "FACT OF THE DAY!";
    const factText = fact.innerText;
    var linkedinurl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(title)}%0A%0A${encodeURIComponent(factText)}%0A%0A %23NewPost %23factoftheDay %23Funfacts`;
    window.open(linkedinurl, "_blank", "width=600,height=400");
}