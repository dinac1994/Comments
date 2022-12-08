import placeholder1 from './placeholder1.jpeg';
import './App.css';

function Reply() {
    return (
        <div className="reply-comment">
            <div className="comment-image-container">
                <img src={placeholder1} />
            </div>
            <div className="comment-right-part">
                <div className="comment-cloud">
                    <div className="comment-author">Zmaj Sipovski</div>
                    <div className="comment-text">Hey Ivana! Have you tried Googling that?</div>
                </div>
                <div className="comment-bottom">
                    <div className="comment-time">11:23 AM </div>
                    <div className="dot">⋅</div>
                    <div className="reply-placeholder">Reply</div>
                </div>
            </div>
        </div>
    );
}

export default Reply;