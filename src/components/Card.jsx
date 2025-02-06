export default function Card({ currentPost }) {
  return (
    <li>
      <div className="card">
        <h3>{currentPost.title}:</h3>
        <div id="postContent">{currentPost.content}</div>

        <img
          className="imgPost"
          src={currentPost.image}
          alt={currentPost.title}
        />

        <div>{currentPost.category}</div>
        <div>
          {currentPost.available ? (
            <p>
              &#x2705; <u>Disponibile</u>
            </p>
          ) : (
            <p>
              &#x274C; <u className="notAvaible">Non Disponibile</u>
            </p>
          )}
        </div>

        <div className="prodTags">
          {currentPost.tags ? <p>#{currentPost.tags.join(" #")} </p> : <p></p>}
        </div>
      </div>
    </li>
  );
}
