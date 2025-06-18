import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/HomePage";
import Banner from "./components/ui/Banner";
import Footer from "./components/ui/Footetr";


/**
 * 根组件，页面元素的最外层容器
 * @returns {React.ReactNode} 返回一个包含Banner、HomePage和Footer的JSX元素
 */
class App extends React.Component {
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