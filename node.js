
let postsContainer = document.querySelector(".posts-container");

function createPost(coin,number){
    let post = document.createElement("div");
    post.setAttribute('id',`coin: ${number}`)
    post.setAttribute('class',"coin")
    let coinName = document.createElement("p");
    coinName.innerText = `Coin: ${coin.name}`;
    let minimumSize = document.createElement("p");
    minimumSize.innerText = `Minimum Size: ${coin.min_size}`;
    post.append(coinName);
    post.append(minimumSize);
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'delete';
    post.append(deleteButton);
    deleteButton.addEventListener('click',(e)=>{e.preventDefault(); post.remove()});
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
    coins.map((index,key)=>createPost(index,key));
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
    coins.map((index,key)=>createPost(index,key));
};

async function showCoinsHighToLow(){
    clearCoins();
    let coins = await retrieveData();
    coins.sort(function compareNumbers(a, b) {
        return b.min_size - a.min_size;
    });
    coins.map((index,key)=>createPost(index,key));
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

let counterButton = document.querySelector("#counter");
let countValue = document.querySelector('#count-value');

let count = 0
function increment(e){
    count++;
    countValue.innerText = count;
    console.log(count);
}

