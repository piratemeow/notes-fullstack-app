import { useState } from "react";
import "./Box.css";
import api from "./api";
function Box({ title, description }) {
  const [titlee, setTitle] = useState(title);
  const [descriptione, setDescription] = useState(description);

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };

  function save(event) {
    const title = titlee;
    const description = descriptione;
    console.log(title);
    if (description === "") {
      return;
    }

    const save_notes = async function () {
      try {
        const response = await api.post("/notes", {
          title: title,
          description: description,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    save_notes();
  }

  return (
    <div>
      <label htmlFor="title" className="note">
        Title
      </label>

      <input
        id="title"
        type="text"
        value={titlee}
        onChange={titleChange}
      ></input>

      <label htmlFor="description" className="note">
        Description
      </label>

      <textarea
        id="description"
        type="text"
        value={descriptione}
        onChange={descriptionChange}
      ></textarea>
      <button id="button1" onClick={save}>
        Save
      </button>
      <button id="button2">Delete</button>
      <hr></hr>
    </div>
  );
}

export default Box;
