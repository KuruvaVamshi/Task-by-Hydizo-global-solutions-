const baseURL = "http://localhost:3000";

// Add Option
function addOption() {
    const container = document.getElementById('optionsContainer');
    const input = document.createElement('input');
    input.className = "opt";
    input.placeholder = "Option " + (container.children.length + 1);
    container.appendChild(input);
}

// Create Poll
async function createPoll() {
    const question = document.getElementById('question').value;

    const options = [];
    document.querySelectorAll('.opt').forEach(i => {
        if (i.value.trim()) options.push(i.value);
    });

    if (options.length < 2) {
        Swal.fire("Oops!", "Enter at least 2 options", "warning");
        return;
    }

    await fetch(baseURL + '/create', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({question, options})
    });

    Swal.fire("Success 🎉", "Poll Created!", "success");

    document.getElementById('createSection').style.display = "none";

    loadPoll();
}

// Load Poll
async function loadPoll() {
    const res = await fetch(baseURL + '/poll');
    const data = await res.json();

    if (!data.question) return;

    document.getElementById('createSection').style.display = "none";

    document.getElementById('pollQ').innerText = data.question;

    let html = "";
    data.options.forEach((opt,i)=>{
        html += `<button class="option-btn" onclick="vote(${i})">${opt}</button>`;
    });

    document.getElementById('voteOptions').innerHTML = html;
}

// Vote
async function vote(index) {
    await fetch(baseURL + '/vote',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({optionIndex:index})
    });

    Swal.fire({
        title: "Vote Recorded ✅",
        timer: 1200,
        showConfirmButton: false,
        icon: "success"
    });
}

// Results
async function getResults() {
    const res = await fetch(baseURL + '/results');
    const data = await res.json();

    let html = "";

    data.results.forEach(r=>{
        html += `
        <div>
            <b>${r.option}</b>
            <div class="bar">
                <div class="fill" style="width:${r.percent}%">
                    ${r.percent}%
                </div>
            </div>
        </div>`;
    });

    document.getElementById('results').innerHTML = html;

    Swal.fire({
        title: "Results Loaded 📊",
        timer: 1200,
        showConfirmButton: false,
        icon: "info"
    });
}

// Reset
async function resetPoll() {
    const confirm = await Swal.fire({
        title: "Reset Poll?",
        text: "This will clear everything!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff5252"
    });

    if (confirm.isConfirmed) {
        await fetch(baseURL + '/reset', { method: 'POST' });

        Swal.fire({
            title: "Reset Done 🔄",
            timer: 1200,
            showConfirmButton: false,
            icon: "success"
        });

        setTimeout(()=>location.reload(),1200);
    }
}

// Auto load
loadPoll();