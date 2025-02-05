//importiamo useEffect da React per gestire il rendering della ui
import { useState, useEffect } from "react";
//importiamo axios per effettuare chiamate ad un server
import axios from "axios";

export default function App() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    tags: [""],
    category: "",
    available: false,
  });
  const [PostList, setPostList] = useState([]);

  //funzioni di controllo per il form
  //funzione per la raccolta dati dai campi input
  const handleFormData = (fieldName, value) => {
    setFormData((currentData) => ({ ...currentData, [fieldName]: value }));
  };
  //funzione per il controllo del submit del form
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    //creo una variabile che conterrà tutte le informazioni del nuovo autore da aggiungere alla lista
    //usiamo lenght sull'array per ricavarci il numero di id da attribuire al nuovo autore
    const newpost = {
      id: PostList[PostList.length - 1].id + 1,
      title: formData.title,
      content: formData.content,
      image: formData.image,
      tags: formData.tags,
      category: formData.category,
      available: formData.available,
    };

    console.log(newpost);

    setPostList((currentList) => [...currentList, newpost]);

    setFormData({
      title: "",
      content: "",
      image: "",
      tags: [""],
      category: "",
      available: false,
    });
    console.log(PostList);
  };

  //funzione che effettua la chiamata al nostro local host che contiene i dati da visualizzare
  //salviamo i dati ottenuti nella nostra lista creata con useState
  const fetchPosts = () => {
    axios.get("http://127.0.0.1:3001/posts").then(function (res) {
      setPostList(res.data);
      // console.log(res.data);
    });
  };

  //inserimento funzione per eliminazione di un post dalla lista
  const handleDelete = (postToDelete) => {
    setPostList((currentPost) =>
      currentPost.filter((post) => post !== postToDelete)
    );
  };

  //funzione di fetch per eliminare un post dalla lista del nostro server
  const fetchDeletePost = (post) => {
    axios.delete(`http://127.0.0.1:3001/posts/${post.id}`).then(function (res) {
      console.log(`eliminato${res.data}`);
      //richiamiamo la funzione handleDelete per sincronizzare la UI eliminando l'elemento dalla pagina
      handleDelete(post);
    });
  };

  //utilizziamo useEffect per richiamare la funzione di restituzione dei post 1 volta all'avvio della pagina UI
  useEffect(fetchPosts, []);

  return (
    <section className="container">
      <div className="listContainer">
        <h1>Lista dei Piatti </h1>
        <ul>
          {PostList.map((currentPost) => (
            <li key={currentPost.id}>
              <div className="card">
                <h3>{currentPost.title}:</h3>
                <div>{currentPost.content}</div>

                <img
                  className="imgPost"
                  src={`http://127.0.0.1:3001/${currentPost.image}`}
                  alt={currentPost.title}
                />

                <div>{currentPost.category}</div>
                <div>
                  {currentPost.available ? (
                    <u> Disponibile </u>
                  ) : (
                    <u className="notAvaible"> Non Disponibile </u>
                  )}
                </div>
                <div className="prodTags">
                  {currentPost.tags.map((tag, index) => (
                    <p key={index}>#{tag}</p>
                  ))}
                </div>
              </div>
              {/* {al click del bottone per eliminare un post richiamiamo la funzione di fetch per eliminare il post} */}
              <button onClick={() => fetchDeletePost(currentPost)}>
                &#128465;
              </button>
            </li>
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
            value={formData.post}
            //con l'evento onChange andiamo a richiamare una funzione che a sua volta chiamerà una funzione che si servirà
            //dell' oggetto "event" nel quale andrà a recuperare il valore del campo di input
            onChange={(event) => handleFormData("title", event.target.value)}
            placeholder="Inserisci nome Piatto"
          />
          <br />
          <input
            id="content"
            type="text"
            value={formData.content}
            onChange={(event) => handleFormData("content", event.target.value)}
            placeholder="Inserisci dettagli"
          />
          <br />

          <select
            id="category"
            value={formData.category}
            onChange={(event) => handleFormData("category", event.target.value)}
          >
            <option value="" hidden>
              scegli categoria
            </option>
            <option value="Primi piatti">Primi piatti</option>
            <option value="Secondi piatti">Secondi piatti</option>
            <option value="Dolci">Dolci</option>
          </select>

          {/* quando vogliamo utilizzare lo stato di una checkbox accediamo al suo contenuto tramite: event.target.checked
            che restituirà un valore booleano*/}
          <label htmlFor="public">Pubblicato </label>
          <input
            id="public"
            type="checkbox"
            checked={formData.available}
            onChange={(event) =>
              handleFormData("available", event.target.checked)
            }
          />
          <br />

          <button className="subBtn" type="submit">
            inserisci piatto
          </button>
        </form>
      </div>
    </section>
  );
}
