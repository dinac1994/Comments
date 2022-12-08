import './App.css';
import Comment from './Comment';
import plane from './plane.png';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [comments, setComments] = useState([])
  const API_URL = "https://637b6f2f10a6f23f7fa8a22f.mockapi.io/api/v1/test"
  const rootComments = comments.filter(comment => comment.parent_id === null)
  const [message, setMessage] = useState("")
  let lastDate = null

  function getComments() {
    axios.get(API_URL)
      .then(res => {
        setComments(res.data)
      }).catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getComments()
  }, 2000)

  function getReplies(commentId) {
    return comments.filter((comment) => comment.parent_id === commentId)
  }

  function submitMessage(event) {
    event.preventDefault();
    const postMessage = {
      id: comments.length.toString(),
      parent_id: null,
      author: {
        name: "John Doe",
        picture: "img/john.jpg"
      },
      text: message,
      timestamp: Date.now()
    }
    axios.post("https://637b6f2f10a6f23f7fa8a22f.mockapi.io/api/v1/test", postMessage)
      .then(res => console.log(res))
    setMessage("")
  }

  return (
    <div className="App">
      <div className="sub-app">
        {rootComments.map((rootComment) => {
          if (lastDate !== new Date(rootComment.timestamp).toLocaleDateString("en-GB")) {
            lastDate = new Date(rootComment.timestamp).toLocaleDateString("en-GB")
            return <>
              <div className="date">
                {(new Date().toLocaleDateString("en-GB") === new Date(rootComment.timestamp).toLocaleDateString("en-GB")) ?
                  "Today" : new Date(rootComment.timestamp).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "numeric", year: "numeric" }).replace(/\//g, ".") + "."}
              </div>
              <Comment
                key={rootComment.id}
                comment={rootComment}
                replies={getReplies(rootComment.id)}
                getReplies={getReplies}
              />
            </>
          }
          else return (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            getReplies={getReplies}
          />)
        })}
        <div className="input-message-box">
          <button className="add-file" type="button">+</button>
          <input className="write-message"
            type="text"
            placeholder="Write a message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            />
          <button className="send-message"
            type="button"
            onClick={submitMessage}>
            <img src={plane} />
            <div className="send-message-text">Send message</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
