//importiamo useEffect da React per gestire il rendering della ui
import { useState, useEffect } from "react";
//importiamo axios per effettuare chiamate ad un server
import axios from "axios";
const initialList = [
  {
    id: 1,
    title: "Ciambellone",
    content:
      "Sarà che una volta le cose erano più semplici, ma erano anche molto buone. Come le crostate, i biscotti o il ciambellone che la nonna preparava anche all'ultimo sapendo che sareste passati per la merenda: uova, zucchero e farina. Niente di più basic ma che tra le sue mani, mescolando e infornando, diventava una delle prelibatezze per accompagnare il succo di frutta al pomeriggio o il latte e caffè al mattino. Ecco la nostra ricetta del ciambellone a quale atmosfera si ispira, quella di casa e genuinità: con una manciata di scorze di limone o di arancia e una spolverata di zucchero a velo renderete questa soffice delizia profumata e invitante. E per una volta sarà la nonna a farvi i complimenti per aver preparato un morbido ciambellone, così buono che non passa mai di moda!",
    image: "/imgs/posts/ciambellone.avif",
    tags: ["Dolci", "Torte", "Ricette vegetariane", "Ricette al forno"],
  },
];

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
  //inserimento funzione per eliminazione di un post dalla lista
  const handleDelete = (postToDelete) => {
    setPostList((currentPost) =>
      currentPost.filter((post) => post !== postToDelete)
    );
  };

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

  //utilizziamo useEffect per richiamare la funzione di restituzione dei post all'avvio della pagina UI
  useEffect(fetchPosts, []);

  return (
    // <>
    //   <ul>
    //     {PostList.map((post) => (
    //       <li key={post.id}>{post.title}</li>
    //     ))}
    //   </ul>
    // </>
    <section className="container">
      <div className="listContainer">
        <h1>Lista dei Post </h1>
        <ul>
          {PostList.map((currentPost) => (
            <li key={currentPost.id}>
              <span>
                <strong>{currentPost.title}</strong>:{currentPost.content}(
                {currentPost.category})
                {currentPost.available ? (
                  <u> Disponibile </u>
                ) : (
                  <u className="notAvaible"> Non Disponibile </u>
                )}
              </span>
              <button onClick={() => handleDelete(currentPost)}>
                &#128465;
              </button>
            </li>
          ))}
        </ul>
      </div>

      <br />

      <div className="formContainer">
        <h1>Inserisci nuovo Programmatore</h1>
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
