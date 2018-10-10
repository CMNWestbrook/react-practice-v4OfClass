import React from "react";
import { render } from "react-dom";
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
  key: process.env.API_KEY, // parcel does the find and replace frpm .env file
  secret: process.env.API_SECRET // these api keys not meant for client side development
}); // actual api client

// class more flexible ans state
class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      pets: []
    };
  }
  componentDidMount() {  // mounted for the first time
    petfinder.pet.find({ output: "full", location: "San Francisco, CA"})
      .then(data => {
        let pets;

        if(data.petfinder.pets && data.petfinder.pets.pet) {  // checking extra because it's xml
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({
          pets: pets
        });

      });
  //   const promise = petfinder.breed.list({ animal: "dog" }); // returns a promise(JS type), future value that will be coming
  //   promise.then(console.log, console.error); // as soon as this comes back run function
  // }
  // handleTitleClick() {
  //   alert("Clicked the title you have, exciting it is");
  }
  render() {
    // return React.createElement("div", {}, [
    //   React.createElement(
    //     "h1",
    //     { onClick: this.handleTitleClick },
    //     "Name of the h1z"
    //   ),
    //   React.createElement(Pet, {
    //     name: "Luna",
    //     animal: "doggo",
    //     breed: "somefancyname"
    //   }),
    //   React.createElement(Pet, {
    //     name: "Star",
    //     animal: "cat",
    //     breed: "alien/unknown"
    //   })
    // ]);
    return (
      <div>
        <h1>Adopt fur babies</h1> 
        <pre><code>{JSON.stringify(this.state, null, 4)}</code></pre>
        <Pet name="Luna" animal="doggo" breed="someFancyName" />
        <Pet name="Star" animal="cat" breed="alien/unknown" />
      </div>
    )
  }

}

render(React.createElement(App), document.getElementById("root"));
