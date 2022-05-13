const path = require("path")
const fs = require("fs");
const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    let DATA_LIST = [];

    // get previous data
    let Previous_Data = JSON.parse(fs.readFileSync(path.join(__dirname,"List_Log.json"),"utf-8"))["log"]
    Previous_Data.forEach(element => {
        let note = document.createElement("div")
        let template = `
            <div class="cell_contain" style="width: fit-content;overflow: hidden;margin: 10px;">
                <div style="display: flex;flex-direction: row-reverse;background-color: limegreen;border: 1px solid black;">
                    <Button class="cell_close">❌</Button>
                </div>
                <textarea name="" id="" cols="30" rows="5" style='width:calc(100vw - 3vw);border:1px solid black;border-top:0px;outline:0px;font-size:x-large;resize:vertical' spellcheck="false"></textarea>
            </div>
        `
        note.insertAdjacentHTML("afterbegin",template)

        note.querySelector("textarea").value = element

        let delbtn = note.querySelector(".cell_close")
        delbtn.addEventListener("click", () => {note.remove()})


        document.getElementById("cell_containers").appendChild(note)
    });

    // ADD Button
    document.getElementById("ADDBTN").addEventListener("click", () => {
        let note = document.createElement("div")
        let template = `
            <div class="cell_contain" style="width: fit-content;overflow: hidden;margin: 10px;">
                <div style="display: flex;flex-direction: row-reverse;background-color: limegreen;border: 1px solid black;">
                    <Button class="cell_close">❌</Button>
                </div>
                <textarea name="" id="" cols="30" rows="5" style='width:calc(100vw - 3vw);border:1px solid black;border-top:0px;outline:0px;font-size:x-large;resize:vertical' spellcheck="false"></textarea>
            </div>
        `
        note.insertAdjacentHTML("afterbegin",template)

        let delbtn = note.querySelector(".cell_close")
        delbtn.addEventListener("click", () => {note.remove()})

        document.getElementById("cell_containers").appendChild(note)
    })

    // Minimize Button
    document.getElementById("minbtn").addEventListener("click", () => {ipcRenderer.send("minaction")})

    // Maximize Button
    document.getElementById("maxbtn").addEventListener("click", () => {ipcRenderer.send("maxaction")})

    ipcRenderer.on("max_action", (e,arr) => {
        if(arr.data==true){
            document.getElementById("maxbtn").innerHTML = "❐"
        }
        if(arr.data==false){
            document.getElementById("maxbtn").innerHTML = "◻"
        }
    })

    // Save Application
    document.getElementById("SaveBTN").addEventListener("click", () => {

        // Take All the data
        let texts = document.getElementsByTagName("textarea")
        if (texts){
            for (let index = 0; index < texts.length; index++) {
                let getData = texts[index].value.trim()
                if(getData!=""){
                    DATA_LIST.push(getData)
                }
            }
            // remove data
            let datacollect = JSON.parse(fs.readFileSync(path.join(__dirname,"List_Log.json"),"utf-8"))
            datacollect["log"] = []
            datacollect["log"] = DATA_LIST
            fs.writeFileSync(path.join(__dirname,"List_Log.json"),JSON.stringify(datacollect,null,2))
        }

    })
    document.getElementById("closebtn").addEventListener("click",() => {ipcRenderer.send("close_App")})

    // Key board Add event
    document.addEventListener("keydown",(e) => {
        if(e.key == "a" && e.ctrlKey){
            document.getElementById("ADDBTN").click()
        }
    })
})