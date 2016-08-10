const Title = React.createClass({
  render: function(){
    return(
     <div>
      <h1>Welcome to React</h1>
     </div>
   );
 }
})

const Counter = React.createClass({
  render: function(){
    let {counter, addCount, minusCount} = this.props;
    return (
      <div>
        <h3>Counter: {counter}</h3>
        <button onClick={addCount}>+</button>
        <button onClick={minusCount}>-</button>
      </div>
    )
  }
})

const NewMessageForm = React.createClass({
  getInitialState: function(){
    return {
      text: ''
    }
  },
  addMessage: function(){
    this.props.addMsg(this.state.text)
    this.setState({text: ""})
  },
  onInputChange: function(event){ 
    this.setState({text: event.target.value})
  },
  render: function(){
    return(
      <div>
      <input type="text" value={this.state.text} onChange={this.onInputChange}/>
      <button onClick={this.addMessage}>Add</button>
      </div>
    )
  }
})

const Message = React.createClass({
  getInitialState: function(){
    return {
      edit: false,
      text: this.props.text
    }
  },
  changeMessage: function(){
    this.setState({edit: false})
  },
  editMsg: function(){
    this.setState({edit: true})
  },
  onInputChange: function(event){
    this.setState({text: event.target.value})
  },
  deleteChild: function(event){
    this.props.deleteMsg(this.props.id)
  },
  render: function(){
    if(this.state.edit){
      return(
      <div>
      <input type="text" value={this.state.text} onChange={this.onInputChange}/>
      <button onClick={this.changeMessage}>Edit</button>
      </div>
    )
    } else {
      return(
        <li key={this.props.id} onDoubleClick={this.editMsg}>{this.state.text}&nbsp;
        <button onClick={this.deleteChild}>Delete</button>
        </li>
        )
      }
  }
})

const MessageList = React.createClass({
  render: function(){
    let messages = this.props.messages.map(message =>{
      return <Message text={message.text} deleteMsg={this.props.deleteMsg} id={message.id} key={message.id} />
    })
    return(
      <ul>
        {messages}
      </ul>
    )
  }
})

const MessageBoard = React.createClass({
  getInitialState: function(){
    return { messages: []
    }
  },
  addMessage: function(text){
    let message = {
      text,
      id: uuid()
    }
    this.setState({
      messages: this.state.messages.concat(message)
    })
  },
  deleteMsg: function(id){
    this.setState({messages: this.state.messages.filter(msg => {if(msg.id !== id){return msg}})});
  },
  render: function(){
    return(
      <div>
        <h1>MessageBoard</h1>
        <NewMessageForm addMsg={this.addMessage}/>
        <MessageList messages={this.state.messages} deleteMsg={this.deleteMsg}/>
      </div>
    )
  }
})

const Root = React.createClass({
  getInitialState: function(){
    return {
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
      <div>
        <Title />
        <Counter {...counterProps} />
        <hr/>
        <MessageBoard />
      </div>
   );
  }
});

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
