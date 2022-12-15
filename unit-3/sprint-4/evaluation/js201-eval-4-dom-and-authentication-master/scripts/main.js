// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${
  import.meta.env.REACT_APP_JSON_SERVER_PORT
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

const recipeIngredientURL = `${baseServerURL}/recipeIngredients`;
const employeeURL = `${baseServerURL}/employees`;
const userRegisterURL = `${baseServerURL}/user/register`;
const userLoginURL = `${baseServerURL}/user/login`;
let paginationWrapper = document.getElementById("pagination-wrapper");

let loginUserUsername = document.getElementById("login-user-username");
let loginUserPassword = document.getElementById("login-user-passowrd");

let loginUserButton = document.getElementById("login-user");
let getTodoButton = document.getElementById("fetch-todos");

let mainSection = document.getElementById("data-list-wrapper");
let notificationWrapper = document.getElementById("notifications-wrapper");

let userAuthToken = localStorage.getItem("localAccessToken") || null;
let userId = +localStorage.getItem("userId") || null;
const urlAllTodosOfUser = `${baseServerURL}/todos?userId=${userId}`;
const urlTodosBase = `${baseServerURL}/todos/`;






document.querySelector("#login-user").addEventListener("click",login_fun);
async function login_fun(){
  try {
    let  login_data = document.querySelectorAll("#sidebar-one input");
    let obj={
      ["username"] : login_data[0].value,
      ["password"] : login_data[1].value
    };
  let login_req = await fetch(`${baseServerURL}/user/login`,{
    method : "POST",
    body : JSON.stringify(obj),
    headers : {
      "Content-Type" : "application/json",
    }
  });
  if(login_req.ok){
    
    let name_show= document.querySelector("#notifications-wrapper");
    name_show.innerHTML= `<h5 class="notification info">
    hey ${obj.username}, welcome back!
      </h5>`;

      let data= await login_req.json();
      let userAuthToken=data.accessToken;
      let userId = data.user.id;
      localStorage.setItem("localAccessToken",userAuthToken);
      localStorage.setItem("userId",userId);
      
  }else{
    alert("bad request");
  }  
  } catch (error) {
    alert("something wrong")
  }
};

document.querySelector("#fetch-todos").addEventListener("click",fetch_todo);

async function fetch_todo(){
  try {
    let fetch_todo_data= await fetch(`${baseServerURL}/todos?userId=${userId}`,{
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${localStorage.getItem("localAccessToken")}` 
      }
    });
    if(fetch_todo_data.ok){
      let real_data= await fetch_todo_data.json();
      showdata(real_data);
      console.log(real_data);
    }else{
      alert("bad request")
    }
  } catch (error) {
    alert("something wrong")
  }
};



function showdata(real_data){
  let container= document.querySelector("#todo-list-wrapper");
  container.innerHTML="";
  let new_data= real_data.map((item)=>{
    if(item.completed==false){
      return `<label><input class="todo-item-checkbox" data-id="${item.id}" type="checkbox">${item.title}</label>`
    }else{
      return `<label><input class="todo-item-checkbox" data-id="${item.id}" type="checkbox" checked="">${item.title}</label>`
    }
  });
  
  container.innerHTML= new_data.join(" ");
  console.log(container);

  let all_lable= document.querySelectorAll(".todo-item-checkbox");
  for(let all of all_lable){
    all.addEventListener("click",(event)=>{
      let item_id = event.target.dataset.id;
      let item_status= event.target.dataset.completed === "true" ? false : true;
      toggeldata(item_id,item_status);
    })
  }
};


async function toggeldata(id,status){
  try {
    let toggel_req = await fetch(`${baseServerURL}/todos/${id}`,{
      method : "PATCH",
      headers : {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${localStorage.getItem("localAccessToken")}`
      },
      body : JSON.stringify({["completed"] : status})
    });
    
  } catch (error) {
    
  }
}
