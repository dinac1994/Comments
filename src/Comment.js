import './App.css';

function Comment(props) {
    function importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return images
    }

    const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));

    return (
        <div>

            <div className="comment">
                <div className="comment-image-container">
                    <img src={images[`${props.comment.author.picture.slice(4, 13)}`]} />
                </div>
                <div className="comment-right-part">
                    <div className="comment-cloud">
                        <div className="comment-author">{props.comment.author.name}</div>
                        <div className="comment-text">{props.comment.text}</div>
                    </div>
                    <div className="comment-bottom">
                        <div className="comment-time">
                            {new Date(props.comment.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="dot">⋅</div>
                        <div className="reply-placeholder">
                            Reply {props.replies.length > 0 && `(${props.replies.length})`}
                        </div>
                    </div>
                </div>
            </div>
            {props.replies.length > 0 &&
                <div className="replies">
                    {props.replies.map((reply, index) => {
                        if (index === 0) {
                            return (
                                <div className="first-reply-grid">
                                    <div className="first-reply-box"/>
                                    <Comment
                                        comment={reply}
                                        key={reply.id}
                                        replies={props.getReplies(reply.id)}
                                        getReplies={props.getReplies} />
                                </div>
                            )
                        }
                        else return (
                            <div className="reply-grid">
                                <div className="reply-box"/>
                                <Comment comment={reply} key={reply.id} replies={props.getReplies(reply.id)} getReplies={props.getReplies}/>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    );
}

export default Comment;