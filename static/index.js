await fetch('http://localhost:8000/')
.then(response => response.text())
.then(console.log)
.catch(console.error);
