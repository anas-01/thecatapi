import React from "react";

const STATUS_FETCHING = "fetching";
const STATUS_FETCHED = "fetched";
const STATUS_LOADED = "loaded";

export default class extends React.Component {
  state = {
    images: [],
    loadingState: STATUS_FETCHING,
    page: 0,
    limit: 6
  };

  componentDidMount() {
    this.getRandomCat();
  }

  loadMore = () => {
    this.setState(
      (s) => ({
        page: s.page + 1
      }),
      () => {
        fetch(
          `https://api.thecatapi.com/v1/images/search?limit=${this.state.limit}&page=${this.state.page}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": "2f765529-8178-4f1d-a89d-a8ac2f889f1c"
            }
          }
        )
          .then((data) => data.json())
          .then((data) => {
            this.setState({
              images: [
                ...this.state.images,
                ...data.map((e) => ({ id: e.id, url: e.url }))
              ]
            });
          });
      }
    );
  };

  getRandomCat = () => {
    this.setState({
      loadingState: STATUS_FETCHING
    });
    fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${this.state.limit}&page=${this.state.page}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "2f765529-8178-4f1d-a89d-a8ac2f889f1c"
        }
      }
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          images: data.map((e) => ({ id: e.id, url: e.url })),
          loadingState: STATUS_FETCHED
        });
      });
  };

  render() {
    return (
      <div className="gallery">
        {this.state.loadingState !== STATUS_FETCHED && (
          <div className="loader">Loading...</div>
        )}
        {this.state.loadingState !== STATUS_FETCHING &&
          this.state.images.length > 0 &&
          this.state.images.map((image) => (
            <div className="imagePlaceholder" key={image.id}>
              <img src={image.url} alt="Cat" />
            </div>
          ))}
        {this.state.loadingState === STATUS_FETCHED && (
          <button onClick={this.loadMore}>Load More</button>
        )}
      </div>
    );
  }
}
