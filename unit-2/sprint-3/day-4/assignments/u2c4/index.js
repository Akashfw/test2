// All the JS Code for the Add Students Page Goes Here

document.querySelector("form").addEventListener("submit",myfun);
let arr= JSON.parse(localStorage.getItem("admission"));
display(arr);
function myfun(event){
    event.preventDefault();
    let na= document.querySelector("#name").value;
    let em= document.querySelector("#email").value;
    let pho= document.querySelector("#phone").value;
    let ge= document.querySelector("#gender").value;
    let co= document.querySelector("#course").value;
    let obj={
        na,
        em,
        pho,
        ge,
        co
    }
    arr.push(obj);
    localStorage.setItem("admission",JSON.stringify(arr));
    display(arr);
}
