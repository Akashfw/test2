// fill in javascript code here

document.querySelector("form").addEventListener("submit",myfun)
function myfun(event){
    event.preventDefault();
    let dname = document.querySelector("#name").value;
    let id= document.querySelector("#employeeID").value;
    let sp= document.querySelector("#department").value;
    let ex= document.querySelector("#exp").value;
    let em= document.querySelector("#email").value;
    let mob= document.querySelector("#mbl").value;
    let obj={
        dname,
        id,
        sp,
        ex,
        em,
        mob
    }
    mylist(obj);
}

function mylist(obj){
    let row=document.createElement("tr");
    let td1=document.createElement("td");
    td1.innerText=obj.dname;
    let td2=document.createElement("td");
    td2.innerText=obj.id;
    let td3=document.createElement("td");
    td3.innerText=obj.sp;
    let td4=document.createElement("td");
    td4.innerText=obj.ex;
    let td5=document.createElement("td");
    td5.innerText=obj.em;
    let td6=document.createElement("td");
    td6.innerText=obj.mob;
    let td7=document.createElement("td");
    if(obj.ex>5){
        td7.innerText="Senior";
    }else if(obj.ex<=5 && obj.ex>2){
        td7.innerText="Junior"; 
    }else if(obj.ex<=1){
        td7.innerText="Trainee";
    }
    let td8=document.createElement("td");
    td8.innerText="Delete"
    td8.style.backgroundColor="red"
    td8.setAttribute("class","del")
    row.append(td1,td2,td3,td4,td5,td6,td7,td8)
    document.querySelector("tbody").append(row);

}

document.querySelector("tbody").addEventListener("click",mydel);

function mydel(e){
    let input=e.target.innerText;
    if(input=="Delete"){
        e.target.closest('tr').remove();
    }
}