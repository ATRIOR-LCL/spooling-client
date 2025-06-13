import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import Banner from "./components/ui/Banner";
import Footer from "./components/ui/Footetr";

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
        <>
          <Banner />
          <HomePage />
          <Footer />
        </>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root" as string) || document.createElement("div")
)