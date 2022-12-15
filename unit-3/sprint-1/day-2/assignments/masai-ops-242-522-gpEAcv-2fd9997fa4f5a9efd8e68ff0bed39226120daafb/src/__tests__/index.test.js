

import {logicalOne,getNumber,incrementNumber,concatStrings} from '../index';

global.score = 1


describe('logicalOne', function(){
  test('logicalOne', function(){
    expect(logicalOne()).toBe(3);
    global.score++;
  })
  
})

describe('getNumber', function(){
  test('getNumber', function(){
    expect(getNumber()).toBe(123);
    global.score++;
  }) 
  
})

describe('incrementNumber', function(){
  test('incrementNumber', function(){
    expect(incrementNumber()).toBe(6);
    global.score++;
  })
  
})

describe('concatStrings', function(){
  test('concatStrings', function(){
    expect(concatStrings()).toBe("123456");
    global.score++;
  })
  
})


afterAll(() => {
  console.log("Final Score is", global.score);
});
