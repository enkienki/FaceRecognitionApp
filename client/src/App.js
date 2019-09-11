import React from "react";

import "tachyons";
import "./App.css";

import Nav from "./Components/Navigation/Nav";
import Logo from "./Components/Logo/Logo";
import Rank from "./Components/Rank/Rank";
import Form from "./Components/Form/Form";
import Picture from "./Components/Picture/Picture";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
import Footer from "./Components/Footer/Footer";
import Error from "./Components/Error/Error";

class App extends React.Component {
  state = {
    searchfield: "",
    imageUrl: "",
    box: [],
    error: "",
    route: "signin",
    isSignedIn: true,
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: ""
    }
  };

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  // loop through API response to store each faces in an array
  calculateFacelocation = data => {
    const boxsLocation = [];
    // get image dimensions (in px) to calculate faces position
    const image = document.querySelector("#img");
    const width = Number(image.width);
    const height = Number(image.height);

    for (let i = 0; i < data.outputs[0].data.regions.length; i++) {
      const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      // store each of the position (in px) points given by the API
      boxsLocation.push({
        topRow: clarifaiFace.top_row * height,
        leftCol: clarifaiFace.left_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
        rightCol: width - clarifaiFace.right_col * width
      });
    }
    return boxsLocation;
  };

  displayError = () => {
    this.setState({ error: "Sorry, no faces were detected, try again" });
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };

  handleChange = e => {
    this.setState({ searchfield: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const url = this.state.searchfield;
    // eslint-disable-next-line no-useless-escape
    const regex = /^(http: \/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (url && regex.test(url)) {
      this.setState({
        imageUrl: url,
        error: "",
        searchfield: ""
      });
      fetch("http://localhost:3001/imageUrl", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response) {
            fetch("http://localhost:3001/image", {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(
                  Object.assign(this.state.user, { entries: count })
                );
              })
              .catch(err => console.log(err));
          }
          this.displayFaceBox(this.calculateFacelocation(response));
        })
        .catch(err => this.displayError(err));
    } else {
      this.setState({ error: "Please enter a valid URL" });
    }
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState({
        isSignedIn: false,
        imageUrl: ""
      });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { imageUrl, box, error, route, isSignedIn, user } = this.state;

    return (
      <div className="App">
        {route === "home" ? (
          <div>
            <Nav isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <Form
              onSubmit={this.handleSubmit}
              inputValue={this.state.searchfield}
              onChange={this.handleChange}
            />
            <Error error={error} size={50} />
            <Picture url={imageUrl}>
              {box.map((_, index) => {
                return (
                  <div
                    key={index}
                    className="bounding-box"
                    style={{
                      inset: `${box[index].topRow}px ${box[index].rightCol}px ${box[index].bottomRow}px ${box[index].leftCol}px`
                    }}
                  ></div>
                );
              })}
            </Picture>
          </div>
        ) : route === "signin" ? (
          <div className="pt5">
            <Logo />
            <SignIn
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        ) : (
          <div className="pt5">
            <Logo />
            <Register
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default App;
