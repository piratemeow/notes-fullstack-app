import { useState } from "react";
import "./Box.css";
import api from "./api";
function Box({ title, description, comparrayr, setcomparray }) {
  const [titlee, setTitle] = useState(title);
  const [descriptione, setDescription] = useState(description);

  const deleteRecord = async function (title, description) {
    if (description == null) {
      return;
    }
    try {
      const message = await api.delete(`/delete/${title}/${description}`);
    } catch (error) {
      console.error(error);
    }
  };

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };

  function save() {
    if (descriptione == null) {
      return;
    }

    if (
      (title !== titlee || description !== descriptione) &&
      (title != null || description != null)
    ) {
      console.log(title, description);
      deleteRecord();
      return;
    }

   

    const save_notes = async function () {
      try {
        const response = await api.post("/notes", {
          title: titlee,
          description: descriptione,
        });
        
      } catch (error) {
        console.log(error);
      }
    };

    save_notes();
  }

  function delete_note() {
    deleteRecord(title, description);
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
      <button id="button2" onClick={delete_note}>
        Delete
      </button>
      <hr></hr>
    </div>
  );
}

export default Box;
