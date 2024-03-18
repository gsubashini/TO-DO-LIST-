const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('listContainer');

function addTask() {
    if (inputBox.value === "") {
        alert("Enter some task");
    } else {
        const li = document.createElement('li');
        let p = document.createElement("p");
        li.appendChild(p);
        p.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement('span');
        span.innerHTML = `
            <i class="fa-solid fa-pencil edit "></i>
            <i class="fa-regular fa-clipboard copy"></i>
            <i class="fa-solid fa-xmark xmark"></i>
        `;
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName == "P") {
        e.target.classList.toggle("checked");
        e.target.closest("li").classList.toggle("checked");
        saveData();
    } else if (e.target.tagName == "LI") {
        console.log(e.target);
        e.target.classList.toggle("checked");
        e.target.closest("P").classList.toggle("checked");
        saveData();
    } 
    else if (e.target.classList.contains("copy")) {
        let text = e.target.closest("li").textContent;
        copyText(text);
    } else if (e.target.classList.contains("xmark")) {
        e.target.closest("li").remove();
        saveData();
    }else if (e.target.classList.contains("edit")) {
        let edit = e.target.closest("li");
        let newText = prompt("Edit the task:", e.target.textContent.trim());
        if (newText !== null) {
            edit.textContent = newText;
            edit.appendChild(e.target.closest("span"));
        saveData();
    }
}
});
function copyText(li) {
    const textToCopy = li.trim();
    navigator.clipboard.writeText(textToCopy).then(function () {
        alert("Text copied to clipboard: " + textToCopy);
    }).catch(function (err) {
        console.error('Unable to copy text', err);
    });
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function getData() {
    listContainer.innerHTML = localStorage.getItem("data");
}

getData();