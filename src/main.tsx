import React from "react";
import ReactDOM from "react-dom";
import Interface from "./pages/Interface";
import HomePage from "./pages/HomePage";


interface AppState {
  isLoginned: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoginned: false,
    };
  }
  private login = () => {
    this.setState({
      isLoginned: true,
    });
    console.log(this.state.isLoginned);
  }
  render() {
    return (
      <div className="app">
        {
          this.state.isLoginned ? (
            <HomePage />
          ) : (
            <Interface toLogin={() => this.login()} />
          )
        }
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root" as string) || document.createElement("div")
)