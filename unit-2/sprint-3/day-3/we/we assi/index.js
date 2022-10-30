
document.querySelector("form").addEventListener("submit",myfun)
function myfun(event){
    event.preventDefault();
    let tas = document.querySelector("#task").value;
    let ass = document.querySelector("#priority").value;
   let  obj={
        tas,
        ass
    }

    displaytable(obj);
}

function displaytable(obj){
    let row=document.createElement("tr")
    let td1=document.createElement("td")
    td1.innerText=obj.tas;
    let td2=document.createElement("td")
    td2.innerText=obj.ass;
    if(obj.ass=="High"){
        td2.style.backgroundColor= "red";
    }else{
        td2.style.backgroundColor= "green"; 
    }
    let td3=document.createElement("td")
    td3.innerText="Add as Fav"
    row.append(td1,td2,td3);
    document.querySelector("tbody").append(row);
}
