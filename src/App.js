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
  constructor (props) { // is calling parent compoment (React.Component) constructor
    super(props);

    this.state = {
      pets: []
    };
  }
  componentDidMount() {  // mounted for the first time
    petfinder.pet.find({ output: "full", location: "San Francisco, CA"})
      .then(data => {
        let pets;

        if(data.petfinder.pets && data.petfinder.pets.pet) {  // extra checking because it's xml
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet]; // found one so wrap in array
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
        <h1>Adopt fur babies!</h1>
        {/* <pre><code>{JSON.stringify(this.state, null, 4)}</code></pre> */}
        <div>
          {this.state.pets.map(pet => {
            let breed;

            if(Array.isArray(pet.breeds.breed)) {
              breed = pet.breeds.breed.join(", ");
            } else {
              breed = pet.breeds.breed;
            }
            return (
              <Pet 
                key={pet.id} // for updating in react purposes unique identifier
                animal={pet.animal}
                name={pet.name}
                breed={breed}
                media={pet.media}
                location={`${pet.contact.city}, ${pet.contact.state}`}
              />
            )
          })}
        </div>
      </div>
    )
  }

}

render(React.createElement(App), document.getElementById("root"));
