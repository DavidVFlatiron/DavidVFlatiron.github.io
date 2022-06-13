
let postsContainer = document.querySelector(".posts-container");

function createPost(coin){
    let post = document.createElement("div");
    post.setAttribute('class',"coin")
    let coinName = document.createElement("p");
    coinName.innerText = `Coin: ${coin.name}`;
    let minimumSize = document.createElement("p");
    minimumSize.innerText = `Minimum Size: ${coin.min_size}`;
    post.append(coinName);
    post.append(minimumSize);
    postsContainer.append(post);
}


function retrieveData() {
    let coins = fetch("https://api.coinbase.com/v2/currencies")
        .then(function (response) {
        return response.json();
        })
    .then(function (data) {
        foo = data.data;
        return foo;
        });
    return coins;
}

// need to use async await to store api response to variable 

async function showCoinsUnsorted(){
    let coins = await retrieveData();
    coins.map((index,key)=>createPost(index));
};

showCoinsUnsorted();

function clearCoins(){
    while(postsContainer.firstChild){
    postsContainer.removeChild(postsContainer.firstChild);
}
}
async function showCoinsLowToHigh(){
    clearCoins();
    let coins = await retrieveData();
    coins.sort(function compareNumbers(a, b) {
        return a.min_size - b.min_size;
    });
    coins.map((index,key)=>createPost(index));
};

async function showCoinsHighToLow(){
    clearCoins();
    let coins = await retrieveData();
    coins.sort(function compareNumbers(a, b) {
        return b.min_size - a.min_size;
    });
    coins.map((index,key)=>createPost(index));
};


let body = document.querySelector("#body");
let button = document.querySelector("#dark-mode-toggle");
function darkModeToggle(){
    let currentClass = body.getAttribute('class');
    if (currentClass === 'body-light') {
        body.setAttribute('class','body-dark');
        button.innerText="On"
        }  
    else {
        body.setAttribute('class','body-light');
        button.innerText="Off"
    }
}