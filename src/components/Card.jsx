export default function Card({ currentPost }) {
  return (
    <li>
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
      <button onClick={() => fetchDeletePost(currentPost)}>&#128465;</button>
    </li>
  );
}
