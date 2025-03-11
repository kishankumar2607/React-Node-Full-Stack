// import React, { Component } from "react";

// class Counter extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { counter: 0, user: "John" };
//   }

//   addCounter() {
//     const cnt = this.state.counter;
//     this.setState({ counter: cnt + 1 });
//   }

//     subCounter() {
//         const cnt = this.state.counter;
//         this.setState({ counter: cnt - 1 });
//     }

//   state = {};

//   render() {
//     return (
//       <div>
//         <h2>Welcome, {this.state.user}!</h2>
//         <p>Counter: {this.state.counter}</p>
//         <button
//           onClick={() => this.addCounter()}
//         >
//           Increment
//         </button>
//         <button
//           onClick={() => this.subCounter()}
//         >
//           Decrement
//         </button>
//       </div>
//     );
//   }
// }

// export default Counter;

import React, { useEffect, useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState("User");
  const [newUser, setNewUser] = useState("");

  const addCounter = () => {
    setCounter(counter + 1);
  };

  const subCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    } else {
      alert("Counter cannot be negative");
    }
  };

  const changeUser = () => {
    setUser(newUser);
    setNewUser("");
  };

  useEffect(() => {
    document.title = `Counter App - ${counter}`;
  }, [counter]);

  return (
    <div>
      <h2>Welcome, {user}!</h2>
      <p>Counter: {counter}</p>
      <button onClick={addCounter}>Increment</button>&nbsp; &nbsp;
      <button onClick={subCounter}>Decrement</button>
      <div>
        <h4>Want to change the user name:</h4>
        <input
          type="text"
          onChange={(e) => setNewUser(e.target.value)}
          value={newUser}
          placeholder="Enter new name"
        />
        &nbsp; &nbsp;
        <button onClick={changeUser}>Click Here</button>
      </div>
    </div>
  );
};

export default Counter;
