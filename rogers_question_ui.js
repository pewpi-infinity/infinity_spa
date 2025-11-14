/* -------------------------------------------------------
   CAT Q — QUESTION MARK CLICK-RESPONSE SYSTEM
   Infinity OS SPA v1.0
------------------------------------------------------- */

// Where Rogers prints long messages
const rogersFeed = document.getElementById("rogersFeed") || document.body;

window.RogersQuestions = {

    // Insert a question into the feed with a clickable "?"
    ask(questionText) {

        // Container for this question block
        const block = document.createElement("div");
        block.className = "rogers-question-block";

        // Question text
        const q = document.createElement("div");
        q.className = "rogers-question-text";
        q.innerText = questionText;

        // Clickable "?"
        const btn = document.createElement("div");
        btn.className = "rogers-question-button";
        btn.innerText = "?";

        // Hidden reply box
        const replyBox = document.createElement("textarea");
        replyBox.className = "rogers-reply-box";
        replyBox.placeholder = "Type your reply here…";
        replyBox.style.display = "none";

        // Submit button
        const submit = document.createElement("button");
        submit.className = "rogers-reply-submit";
        submit.innerText = "Send";
        submit.style.display = "none";

        // Clicking the ? opens reply field
        btn.onclick = () => {
            replyBox.style.display = "block";
            submit.style.display = "block";
        };

        // Send reply back to RogersBrain
        submit.onclick = () => {
            const text = replyBox.value.trim();
            if (!text) return;

            RogersBrain.receiveUserReply(questionText, text);

            replyBox.style.display = "none";
            submit.style.display = "none";
        };

        // Build block
        block.appendChild(q);
        block.appendChild(btn);
        block.appendChild(replyBox);
        block.appendChild(submit);

        rogersFeed.appendChild(block);
        rogersFeed.scrollTop = rogersFeed.scrollHeight;
    }
};

/* -------------------------------------------------------
   Styles injected automatically into page
------------------------------------------------------- */
const style = document.createElement("style");
style.innerHTML = `
.rogers-question-block {
    margin: 12px 0;
    padding: 10px;
    background: rgba(0,0,0,0.35);
    border-radius: 10px;
    color: white;
    position: relative;
}

.rogers-question-text {
    font-size: 15px;
    margin-bottom: 6px;
}

.rogers-question-button {
    display: inline-block;
    background: #1e90ff;
    color: white;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 6px;
}

.rogers-reply-box {
    width: 98%;
    height: 55px;
    margin-top: 6px;
    padding: 6px;
    background: rgba(255,255,255,0.1);
    border: 1px solid #1e90ff;
    color: white;
    border-radius: 6px;
}

.rogers-reply-submit {
    margin-top: 6px;
    padding: 6px 12px;
    background: #1e90ff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
`;
document.head.appendChild(style);


/* -------------------------------------------------------
   Connect into RogersBrain
------------------------------------------------------- */

if (!window.RogersBrain) window.RogersBrain = {};

window.RogersBrain.askUser = function(question) {
    RogersQuestions.ask(question);
};

window.RogersBrain.receiveUserReply = function(question, reply) {
    // Basic echo — later CAT R makes Rogers interpret meaningfully
    RogersBrain.pulseThought("You said: " + reply);
};

/* -------------------------------------------------------
   CAT Q COMPLETE — Clickable Question-Mark Engine Enabled
------------------------------------------------------- */
