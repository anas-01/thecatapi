import React from "react";

const STATUS_FETCHING = "fetching";
const STATUS_FETCHED = "fetched";
const STATUS_LOADED = "loaded";

export default class extends React.Component {
  state = {
    image: null,
    loadingState: STATUS_FETCHING
  };

  componentDidMount() {
    this.fetchRandomCat();
  }

  fetchRandomCat = () => {
    this.setState({
      loadingState: STATUS_FETCHING
    });
    fetch("https://api.thecatapi.com/v1/images/search", {   // API LINK
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "2f765529-8178-4f1d-a89d-a8ac2f889f1c" // API KEY
      }
    })
      .then(data => data.json())
      .then(data => {
        const { url } = data[0];
        this.setState({ image: url, loadingState: STATUS_FETCHED });
      });
  };

  render() {
    return (
      <div className="random">
        <div>
          <button onClick={this.fetchRandomCat}>Get a random cat!</button>
        </div>
        <div>
          {this.state.loadingState !== STATUS_LOADED && (
            <div className="loader">Loading...</div>
          )}
          {this.state.loadingState !== STATUS_FETCHING && this.state.image ? (
            <img
              onLoad={() => {
                this.setState({
                  loadingState: STATUS_LOADED
                });
              }}
              style={{
                display:
                  this.state.loadingState === STATUS_LOADED ? "inline" : "none"
              }}
              key={this.state.image}
              src={this.state.image}
              alt="Random cat image"
            />
          ) : null}
        </div>
      </div>
    );
  }
}
