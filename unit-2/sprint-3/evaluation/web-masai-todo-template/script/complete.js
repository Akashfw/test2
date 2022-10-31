// Write all the JS Code related to Completed Page Here

let compl=JSON.parse(localStorage.getItem("task-completed"))|| [];

display(compl);

let fav_arr=JSON.parse(localStorage.getItem("task-favorites")) || [];
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
        let td5=document.createElement("td");
        td5.innerText="Add"
        td5.addEventListener("click",function(){
           fav_arr.push(element);
           localStorage.setItem("task-favorites",JSON.stringify(fav_arr));
           deletefav(element,i);
           
        });
        row.append(td1,td2,td3,td4,td5);
        document.querySelector("tbody").append(row);
    });
}
function deletefav(element,i){
    compl.splice(i,1);
    document.querySelector("tbody").innerHTML="";
    display(compl);
    localStorage.setItem("task-completed",JSON.stringify(compl));
}
