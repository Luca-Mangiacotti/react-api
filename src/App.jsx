//importiamo useEffect da React per gestire il rendering della ui
import { useState, useEffect } from "react";
//importiamo axios per effettuare chiamate ad un server
import axios from "axios";
import Card from "./components/Card";

const initialState = {
  title: "",
  content: "",
  image: "",
  tags: [""],
  category: "",
  available: false,
};

export default function App() {
  const [formData, setFormData] = useState(initialState);
  const [PostList, setPostList] = useState([]);

  //--------------------------------------------------------
  //FUNZIONI PER LA GESTIONE DELLA LISTA
  //funzione che effettua la chiamata al nostro local host che contiene i dati da visualizzare
  //salviamo i dati ottenuti nella nostra lista creata con useState
  const fetchPosts = () => {
    axios.get("http://127.0.0.1:3001/posts").then(function (res) {
      setPostList(res.data);
      // console.log(res.data);
    });
  };

  //--------------------------------------------------------
  //FUNZIONI CHE GESTISCONO L'ELIMINAZIONE DI UN POST
  //funzione per l'eliminazione di un post restituita in UI
  const handleDelete = (postToDelete) => {
    setPostList((currentPost) =>
      currentPost.filter((post) => post !== postToDelete)
    );
  };
  //funzione di fetch per eliminare un post dalla lista del nostro server
  const fetchDeletePost = (currentPost) => {
    axios
      .delete(`http://127.0.0.1:3001/posts/${currentPost.id}`)
      .then(function () {
        console.log("eliminato");
        handleDelete(currentPost);
      });
  };
  //---------------------------------------------------------
  //FUNZIONI CHE GESTISCONO IL CONTROLLO E IL SUBMIT DEL FORM
  //funzione per la raccolta dati dai campi input
  const handleFormData = (fieldName, value) => {
    setFormData((currentData) => ({ ...currentData, [fieldName]: value }));
  };
  //funzione per il controllo del submit del form
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    axios.post("http://127.0.0.1:3001/posts", formData).then((res) => {
      setPostList((currentPosts) => [...currentPosts, res.data]);
      setFormData(initialState);
      console.log(res.data);
    });
  };
  //-----------------------------------------------------------

  //utilizziamo useEffect per richiamare la funzione di restituzione dei post 1 volta all'avvio della pagina UI
  useEffect(fetchPosts, []);

  return (
    <section className="container">
      <div className="listContainer">
        <h1>Lista dei Piatti </h1>

        <ul>
          {PostList.map((currentPost) => (
            <div className="cardContainer" key={currentPost.id}>
              <Card key={currentPost.id} currentPost={currentPost} />
              <button onClick={() => fetchDeletePost(currentPost)}>
                cancella
                <strong className="btnTitle">{currentPost.title}</strong>
                &#128465;
              </button>
            </div>
          ))}
        </ul>
      </div>

      <br />

      <div className="formContainer">
        <h1>Inserisci nuovo Piatto</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            id="title"
            type="text"
            value={formData.title}
            //con l'evento onChange andiamo a richiamare una funzione che a sua volta chiamerà una funzione che si servirà
            //dell' oggetto "event" nel quale andrà a recuperare il valore del campo di input
            onChange={(event) => handleFormData("title", event.target.value)}
            placeholder="Inserisci nome Piatto"
            required
          />
          <br />
          <textarea
            id="content"
            type="text"
            rows="6"
            cols="30"
            value={formData.content}
            onChange={(event) => handleFormData("content", event.target.value)}
            placeholder="Inserisci qui una descrizione del piatto"
            required
          />
          <br />
          <input
            type="text"
            id="image"
            value={formData.image}
            onChange={(event) => handleFormData("image", event.target.value)}
            placeholder="inserisci un url per il tuo piatto "
          />
          <select
            id="category"
            value={formData.category}
            onChange={(event) => handleFormData("category", event.target.value)}
          >
            <option value="" hidden required>
              scegli categoria
            </option>
            <option value="Primi piatti">Primi piatti</option>
            <option value="Secondi piatti">Secondi piatti</option>
            <option value="Dolci">Dolci</option>
          </select>

          {/* quando vogliamo utilizzare lo stato di una checkbox accediamo al suo contenuto tramite: event.target.checked
            che restituirà un valore booleano*/}
          <label htmlFor="public">Disponibile </label>
          <input
            id="public"
            type="checkbox"
            checked={formData.available}
            onChange={(event) =>
              handleFormData("available", event.target.checked)
            }
          />
          <br />

          <textarea
            id="tags"
            type="text"
            rows="1"
            cols="30"
            value={formData.tags}
            onChange={(event) => handleFormData("tags", event.target.value)}
            placeholder="inserisci qui i tag per il piatto"
          />

          <button className="subBtn" type="submit">
            inserisci piatto
          </button>
        </form>
      </div>
    </section>
  );
}
