const socket = io()

const chatForm = document.getElementById('chat-form')

socket.on('message', message => {
    outputMessage(message)
})

socket.on('systemMessage', msg => {
    console.log(msg)
})

chatForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value

    socket.emit('chatMessage', message)

    e.target.elements.message.value = ""
    e.target.elements.message.focus()
})

function outputMessage({ message, id }) {
    const div = document.createElement('div')
    div.classList.add('chat-bubble')

    console.log(typeof id)

    //add random horizontal placement
    div.style.right = (Math.random() * 80) + 'vw' //TODO improve this

    //add calculated bg colour from id
    console.log(id)
    console.log(cyrb53(id)%360)
    const hue = cyrb53(id)%360
    div.style.backgroundColor = `hsl(${hue} 50% 70%)`

    div.innerHTML = `
        <p>${message}</p>
    `

    setTimeout(() => {
        div.remove()
    }, 10000)

    document.getElementById('bubble-container').appendChild(div)
}


//https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };
