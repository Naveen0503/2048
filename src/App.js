
import cloneDeep from "lodash.clonedeep";
import React, { useEffect } from "react";
import { useState } from 'react';
import { getColors, useEvent } from "./util";


function App() {

  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  const[data,setdata]=useState([
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
  ]);

  const initialize = () => {

    let newGrid = cloneDeep(data);
    console.log(newGrid);

    addNumber(newGrid);
    console.table(newGrid);

    addNumber(newGrid);
    console.table(newGrid);

    setdata(newGrid);
  }

  const addNumber = (newGrid) => {
     let added = false;
     let gridFull = false;
     let attempts = 0 ;
     while(!added){
      if(gridFull){
        break;
      }

      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      attempts++;
      if(newGrid[rand1][rand2]===0){
       newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4
       added = true ;

      }
     }           

  }
  const swipeLeft = () => {
    
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
    
      setdata(newArray);
    
  };

  const swipeRight = () => {
    console.log("swipe right");
    let oldData = data;
    let newArray = cloneDeep(data);

    for (let i = 3; i >= 0; i--) {
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray);
    }
    
      setdata(newArray);
    
  };

  const swipeDown = () => {
    console.log("swipe down");
    console.log(data);
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 3; i >= 0; i--) {
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(b) !== JSON.stringify(oldData)) {
      addNumber(b);
    }
    
      setdata(b);
    
  };

  const swipeUp = () => {
    console.log("swipe up");
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addNumber(b);
    }
   
      setdata(b);
    
  };

 const handleKeyDown = (event) => {
  switch(event.keyCode){
    case UP_ARROW:
      // alert("up");
      // console.table(data);
      swipeUp();
      // console.table(data);
      break;
    case DOWN_ARROW:
      // console.table(data);
      swipeDown();
      // console.table(data);
      break;
    case LEFT_ARROW:
      // console.table(data);
      swipeLeft();
      // console.table(data);
      break;
    case RIGHT_ARROW:
      // console.table(data);
      swipeRight();
      // console.table(data);
      break;
    default:
      break;
  }
 }

  useEffect(() =>{
    initialize();
  },[])
  
  useEvent("keydown",handleKeyDown);

  return(
    <div
     style={{
      background : "#57407c",
      width : "max-content",
      margin : "auto",
      padding : 5,
      borderRadius : 5,
      marginTop : 10
     }}>
      {data.map((row,oneIndex)=>{
        return(
          <div style={{display : "flex"}} key={oneIndex}>
            {row.map((digit,index) =>(
              <Block num={digit} key={index}/>
            ))}
          </div>
        )
      })}
    </div>
  )
}

const Block = ({num}) => {

  const {blockStyle} = style;

  return <div
  style={{
    ...blockStyle,
    position: "relative",
    backgroundImage: getColors(num),
    backgroundColor:
      num === 0 ? "#3d2963" : getColors(num),
      
  }}
>
  {num !== 0 ? num : ""}
</div>
};

const style = {
  blockStyle : {
   height : 80,
   width : 80,
   background : "#3d2963",
   margin : 3,
   display : "flex",
   justifyContent : "center",
   alignItems : "center" ,
   fontSize : 45,
   fontWeight : "800",
   color : "white",
  },
}
export default App;
