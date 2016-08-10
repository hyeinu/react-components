const Title = React.createClass({
  render: function(){
    return(
     <div>
      <h1>Welcome to React</h1>
     </div>
   );
 }
})

// const Counter = React.createClass({
//   render: function(){
//     return ( //returning the JSX it knows what it is returning within the ()
//       <div>
//       <h3>Counter: {this.props.mainCounter}</h3>
//       <button onClick={this.props.addCount}>+</button>
//       <button onClick={this.props.subCount}>-</button>
//       </div>
//     )
//   }
// })

const Counter = React.createClass({
  render: function(){
    let {counter, addCount, minusCount} = this.props.allProps;
    // var counter = this.props.allprops.counter; same thing as the line above.
    //this is destructuring the allprops values and makes the variables with those names.
    return (
      <div>
        <h3>Counter: {counter}</h3>
        <button onClick={addCount}>+</button>
        <button onClick={minusCount}>-</button>
      </div>
    )
  }
})


const Root = React.createClass({ //create a new component
  getInitialState: function(){
    return { //returns the OBJECT of the inital state
      counter: 0
    }
  },
  addCounter: function(){
    return this.setState({counter: this.state.counter+1})
  },
  subCounter: function(){
    return this.setState({counter: this.state.counter-1})
  },
  render: function(){
    let counterProps = {
      addCount: this.addCounter,
      minusCount: this.subCounter,
      counter: this.state.counter
    }
    return(
      //have to have one top level element (parent)
      <div>
        <Title />
        <Counter allProps={propObj} />
        {/*Spread Operator */}
        <Counter {...counterProps} />
        {/* <Counter mainCounter={this.state.counter} addCount={this.addCounter} subCount={this.subCounter}/>
        <Counter mainCounter={this.state.counter} addCount={this.addCounter} subCount={this.subCounter}/>
        <Counter mainCounter={this.state.counter} addCount={this.addCounter} subCount={this.subCounter}/> */}
      </div>
   );
  }
});

// const Root = React.createClass({ //create a new component
//   render: function(){
//     return React.createElement('div', {},
//       React.createElement(Title, {}) //children of div created elemet
//       React.createElement(Title, {}) //vanilla javascript
//     )
//   }
// });



ReactDOM.render(
  <Root />, //means there is no children
  document.getElementById('root') //where you want to render it
);
