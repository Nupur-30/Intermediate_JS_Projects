//logic for quotes

const quote= document.querySelector('.quote');
const author= document.querySelector('.author');
const api_url='https://dummyjson.com/quotes/random';

async function getQuote(url){
    const response= await fetch(url);
    var data = await response.json();
    console.log(data);
    quote.innerHTML=data.quote;
    author.innerHTML=`by ${data.author}`;
}

var count=0;
getQuote(api_url);

const newQuote= document.querySelector('.new-quote-btn');
newQuote.addEventListener("click", function() {
    getQuote(api_url);
    console.log(count=count+1);
})

function shareOntweet() {
    const quoteText = quote.innerHTML;
    const authorText = author.innerHTML;
    const tweetUrl = `https://twitter.com/intent/tweet?text=QUOTE OF THE DAY!%0A%0A"${quoteText}" - %0A${authorText}`;
    window.open(tweetUrl, "Tweet Window", "width=600,height=300");
}

function shareOnEmail() {
    const email = ""; //set this to an empty string if you don't want to prefill the recipient
    const subject = "QUOTE OF THE DAY!";
    const quotetext = `"${quote.innerText}"- by ${author.innerText}`;
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(quotetext)}`;
    
    const windowFeatures = "width=800,height=600,left=20,top=100";
    window.open(mailtoUrl, '_blank','GmailWindow', windowFeatures);
}

function shareOnLinkedIn() {
    var title = "QUOTE OF THE DAY!";
    var summary = `"${quote.innerText.trim()}" - ${author.textContent.trim()}`;
    var linkedinurl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(title)}%0A%0A${encodeURIComponent(summary)}%0A%0A %23NewPost %23QuoteoftheDay %23goodquotes`;
    window.open(linkedinurl, "_blank", "width=600,height=400");
}