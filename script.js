const image = {
    src: ["items/mud.png",
         "items/stick.png",
         "items/rock.png",
         "items/wood.png",
         "items/brick.png"
         ],
}



let intervalId;

let reaction = 0;

let startTime = 0;

let coinAmount = 0;

let itemSpawnTimeout;

let clickedTofast = false;

let upgrade = 0;

let boost = 1;



if (localStorage.getItem('upgrade') == null) {
    localStorage.setItem('upgrade', upgrade);
}
else {
    upgrade = localStorage.getItem('upgrade');
}

if (localStorage.getItem('coins') == null) {
    localStorage.setItem('coins', coinAmount);
}
else {
    coinAmount = localStorage.getItem('coins');
}

setBoost();

function setBoost() {
    if (upgrade == 1) {
        boost = 1.5;
    }
    if (upgrade == 2) {
        boost = 2;
    }
    if (upgrade == 3) {
        boost = 2.5;
    }
    if (upgrade == 4) {
        boost = 3;
    }
}

let item = document.createElement('img');
item.src = image.src[upgrade];
item.id = "itemImg";
document.getElementById('itemSpawn').appendChild(item);

document.getElementById('coinAmount').innerText = coinAmount;

function gameStart() {
    const gameTime = (Math.floor(Math.random() * 10000) + 1);

    document.getElementById('gameStartMenu').style.display = "none";
    document.getElementById('gameStartButton2').style.display = "none";
    document.getElementById('timeDisplay').innerText = "0 ms";
    document.getElementById('gameplay').style.display = "block";
    document.getElementById('timeDisplay').style.display = "none";
    document.getElementById('coinsGained').style.display = "none";
    document.getElementById('clickedToFast').style.display = "none";

    document.getElementById('countdown').innerText = "3";

    setTimeout(() => {
        document.getElementById('countdown').innerText = "2";
    }, 1000);

    setTimeout(() => {
        document.getElementById('countdown').innerText = "1";
    }, 2000);

    setTimeout(() => {
        document.getElementById('countdown').innerText = "start!";
    }, 3000);
    setTimeout(() => {
        document.getElementById('countdown').innerText = "";
        document.getElementById('toFast').style.display = "block"
    }, 3100);

    itemSpawnTimeout = setTimeout(() => {
        document.getElementById('itemSpawn').style.display = "block";
        document.getElementById('timeDisplay').style.display = "block";
        document.getElementById('toFast').style.display = "none"



        startTime = Date.now() - reaction;
        
        intervalId = setInterval(function(){
            const currentTime = Date.now();
            reaction = currentTime - startTime;
            document.getElementById('timeDisplay').innerText = reaction + " ms";
        }, 1)

    }, (3100 + gameTime));




}

function toFast() {
    clickedTofast = true;
    gameStop();
    clickedTofast = false;
    document.getElementById('clickedTofast')
    document.getElementById('toFast').style.display = "none"
    document.getElementById('coinsGainedNumber').innerText = "coins gained: 0";

    document.getElementById('clickedToFast').style.display = "block";

}

function gameStop() {

    clearTimeout(itemSpawnTimeout);

    document.getElementById('itemSpawn').style.display = "none";
    clearInterval(intervalId);
    document.getElementById('timeDisplay').innerText = "reaction time: " + reaction + " ms";

       

    document.getElementById('gameStartButton2').style.display = "block";
    document.getElementById('toFast').style.display = "none"

    let coinsGained = 0;

    if (clickedTofast == false) {
        if (reaction < 150) {
            coinsGained = ((500 - reaction) * 10) * boost;
        }
        
        else if (reaction < 200) {
            coinsGained = ((500 - reaction) * 5) * boost;
        }
        else if (reaction < 250) {
            coinsGained = ((500 - reaction) * 2) * boost;
        }
        else if (reaction < 500) {
            coinsGained = ((500 - reaction) * 1) * boost;
            }
        else if (reaction == 500 || reaction > 500) {
            coinsGained = 0;
        }

        console.log(coinsGained);

        console.log(boost);

        coinAmount = Number(coinAmount) + Number(coinsGained);

        console.log(coinAmount);
        localStorage.setItem('coins', coinAmount);
        document.getElementById('coinAmount').innerHTML = Number(coinAmount);

        
        document.getElementById('coinsGainedNumber').innerText = "coins gained: " + coinsGained; 
    }

    document.getElementById('coinsGained').style.display = "flex";

    reaction = 0;
    coinsGained = 0;
}


function shopOpen() {
    document.getElementById('shopIcon').style.display = "none";
    document.getElementById('closeShopIcon').style.display = "block";
    document.getElementById('gameStartMenu').style.display = "none";
    document.getElementById('gameplay').style.display = "none";
    document.getElementById('shop').style.display = "flex";

    if (coinAmount >= 10000) {
        document.getElementById('cantAfford1').style.display = "none"
        document.getElementById('buyButton1').style.display = "block"
    }
    if (coinAmount >= 25000) {
        document.getElementById('cantAfford2').style.display = "none"
        document.getElementById('buyButton2').style.display = "block"
    }
    if (coinAmount >= 50000) {
        document.getElementById('cantAfford3').style.display = "none"
        document.getElementById('buyButton3').style.display = "block"
    }
    if (coinAmount >= 100000) {
        document.getElementById('cantAfford4').style.display = "none"
        document.getElementById('buyButton4').style.display = "block"
    }

    if (upgrade >= 1) {
        document.getElementById('cantAfford1').style.display = "none"
        document.getElementById('buyButton1').style.display = "none"
        document.getElementById('boughtButton1').style.display = "block"
    }
    if (upgrade >= 2) {
        document.getElementById('cantAfford2').style.display = "none"
        document.getElementById('buyButton2').style.display = "none"
        document.getElementById('boughtButton2').style.display = "block"
    }
    if (upgrade >= 3) {
        document.getElementById('cantAfford3').style.display = "none"
        document.getElementById('buyButton3').style.display = "none"
        document.getElementById('boughtButton3').style.display = "block"
    }
    if (upgrade >= 4) {
        document.getElementById('cantAfford4').style.display = "none"
        document.getElementById('buyButton4').style.display = "none"
        document.getElementById('boughtButton4').style.display = "block"
    }

}

function shopClose() {
    document.getElementById('shopIcon').style.display = "block";
    document.getElementById('closeShopIcon').style.display = "none";
    document.getElementById('gameStartMenu').style.display = "block";
    document.getElementById('shop').style.display = "none";
}

function buyUpgrade1() {
    if (upgrade == 0) {
        upgrade = 1;
        localStorage.setItem('upgrade', upgrade);
        setBoost();

        coinAmount -= 10000;
        localStorage.setItem('coins', coinAmount);

        document.getElementById('coinAmount').innerText = coinAmount;

        shopOpen()
        item.src = image.src[upgrade];
    }
}

function buyUpgrade2() {
    if (upgrade == 1) {
        upgrade = 2;
        localStorage.setItem('upgrade', upgrade);
        setBoost();

        coinAmount -= 25000;
        localStorage.setItem('coins', coinAmount);

        document.getElementById('coinAmount').innerText = coinAmount;

        shopOpen()
        item.src = image.src[upgrade];
    }
}

function buyUpgrade3() {
    if (upgrade == 2) {
        upgrade = 3;
        localStorage.setItem('upgrade', upgrade);
        setBoost();

        coinAmount -= 50000;
        localStorage.setItem('coins', coinAmount);

        document.getElementById('coinAmount').innerText = coinAmount;

        shopOpen()
        item.src = image.src[upgrade];
    }
}

function buyUpgrade4() {
    if (upgrade == 3) {
        upgrade = 4;
        localStorage.setItem('upgrade', upgrade);
        setBoost();

        coinAmount -= 100000;
        localStorage.setItem('coins', coinAmount);

        document.getElementById('coinAmount').innerText = coinAmount;

        shopOpen()
        item.src = image.src[upgrade];
    }
}