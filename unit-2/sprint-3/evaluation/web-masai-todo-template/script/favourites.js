// Write all the JS Code related to Favourites Page Here 

let compl=JSON.parse(localStorage.getItem("task-favorites"))|| [];

display(compl);

let fav_arr=[];
function display(compl){
    compl.forEach(function(element,i){
        let row=document.createElement("tr");
        let td1=document.createElement("td");
        td1.innerText=element.na;
        let td2=document.createElement("td");
        td2.innerText=element.ta;
        let td3=document.createElement("td");
        td3.innerText=element.da;
        let td4=document.createElement("td");
        td4.innerText=element.pri;
        row.append(td1,td2,td3,td4);
        document.querySelector("tbody").append(row);
    });
}