function studentData() {
let details={
  fullName:"Vivek",
  lastname:"Agarwal",
  age:38,
  marks:[50,60,70],
  hobbies:"Singing",

  getInfo:function(){
         return `${this.fullName} ${this.lastname}'s age is ${this.age}.`
  },
  getResult:function(){
       let arr=this.marks;
       let sum=0;
       for(let i=0; i<arr.length; i++){
         sum+=arr[i];
       }
       let avg=sum/arr.length;
       if(avg>=50){
         return "Result: PASS"
       }else{
         return "Result:FAIL"
       }
  },
 

};



details.getInfo();
details.getResult();


return details;
}








export {studentData}