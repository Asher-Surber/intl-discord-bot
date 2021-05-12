const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Discord.Client();
// const time = import("./getTimeFunc.mjs");
//const handleReq = require("./handleRequests");

client.login("ODMwMTE1ODg0ODE0NTY1Mzk4.YHB_qQ.DXjgamaC9qRSv9b5ql37p3eLQHs");


client.on("ready", on_Client_Ready);
client.on("message", onMessage);


function on_Client_Ready(){
    console.log("Bot is ready");

    client.user.setActivity("the Imitation Game");
    
}

function onMessage(message) {
    if (!message.content.includes("!") || message.author.bot){
        return;
    }
    else{
        const onRequestResolved = (response) => {
            const currTime = JSON.parse(`${response}`);
            console.log(currTime);
            return message.channel.send(currTime.datetime);
        };
        const onRequestRejected = (response) => {
            console.log(`Promise rejected: ${response}`);
            message.channel.send("Unable to complete request. Please check your syntax and try again.");
        };
        const args = message.content.slice(1).trim().split(" ")
        const command = args.shift();
        console.log(args);
        console.log(command);
        
        switch(command){
            case "time":
                try{
                   getTime(args)
                        .then(onRequestResolved)
                        .catch(onRequestRejected);
                }
                catch{message.reply("Invalid arguments or no arguments provided.")}
        }

    }
}

async function getTime(argList){
    if (argList.length === 2){
            const url = `http://worldtimeapi.org/api/timezone/${argList[0]}/${argList[1]}`;
            console.log(url);
            const prom = await fetch(url);
            console.log(prom);
            return prom;
    }
    else if (argList.length === 3){
        const url = `http://worldtimeapi.org/api/timezone/${argList[0]}/${argList[1]}/${argList[2]}`;
        console.log(url);
        const prom = await fetch(url);
        console.log(prom);
        return prom;
    }
    
   // else{console.log("No arguments passed to function getTime() for HTTP request"); return;}
}


// function onRequestResolved(response){
//     const currTime = JSON.parse(response)
//     return message.channel.send(currTime[datetime]);
//}

// function onRequestRejected(){
//     console.log("Promise rejected");
//     onMessage.message.channel.send("Unable to complete request. Please check your syntax and try again.");
// }