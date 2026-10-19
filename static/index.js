async function main() {
    const text = await fetch('http://127.0.0.1:8000/', {
        method: 'GET',
        headers: {
            "Accept": 'text/plain'
        }
    })
    .then(response => response.text())
    .then(text => {
        return text;
    })
    .catch(err => console.error(err));
    const p1 = document.getElementById('p1');
    p1.innerHTML = text;
}

main();
