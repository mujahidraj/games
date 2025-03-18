const wordDisplay = document.getElementById("wordDisplay");
const inputBox = document.getElementById("inputBox");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const progressBar = document.getElementById("progressBar");
const definitionDisplay = document.getElementById("definitionDisplay");
const correctSound = document.getElementById("correctSound");
const gameOverSound = document.getElementById("gameOverSound");
const pauseButton = document.getElementById("pauseButton");
const exitButton = document.getElementById("exitButton");

let score = 0;
let time = 0;
let gameOver = false;
let isPaused = false;
let currentWord = "";
let wordSpeed = 2; 
let wordX = 0;

const words = [
    { word: "algorithm", definition: "A step-by-step procedure to solve a problem.", bonus: false },
    { word: "array", definition: "A collection of elements stored at contiguous memory locations.", bonus: false },
    { word: "stack", definition: "A linear data structure following Last In First Out (LIFO).", bonus: false },
    { word: "queue", definition: "A linear data structure following First In First Out (FIFO).", bonus: false },
    { word: "tree", definition: "A hierarchical data structure with a root value and subtrees.", bonus: false },
    { word: "graph", definition: "A non-linear data structure consisting of nodes and edges.", bonus: false },
    { word: "hashtable", definition: "A data structure that maps keys to values for efficient lookup.", bonus: false },
    { word: "heap", definition: "A specialized tree-based data structure that satisfies the heap property.", bonus: false },
    { word: "sorting", definition: "Arranging data in a particular order (ascending or descending).", bonus: false },
    { word: "searching", definition: "Finding an element in a data structure.", bonus: false },
    { word: "recursion", definition: "A function calling itself to solve a problem.", bonus: true }, // Bonus word
    { word: "greedy", definition: "An algorithmic paradigm that builds up a solution piece by piece.", bonus: false },
    { word: "backtracking", definition: "A technique to solve problems recursively by trying to build a solution incrementally.", bonus: false },
    { word: "abstraction", definition: "Hiding complex details and showing only essential features.", bonus: false },
    { word: "encapsulation", definition: "Bundling data and methods that operate on that data.", bonus: false },
    { word: "inheritance", definition: "A mechanism to create a new class from an existing class.", bonus: false },
    { word: "polymorphism", definition: "The ability of an object to take on many forms.", bonus: false },
    { word: "compiler", definition: "A program that translates code from one language to another.", bonus: false },
    { word: "interpreter", definition: "A program that executes code directly without compilation.", bonus: false },
    { word: "syntax", definition: "The set of rules that define the structure of a program.", bonus: false },
    { word: "semantics", definition: "The meaning of the syntax in a programming language.", bonus: false },
    { word: "parsing", definition: "Analyzing a string of symbols according to the rules of a formal grammar.", bonus: false },
    { word: "optimization", definition: "The process of making something as effective as possible.", bonus: false },
    { word: "debugging", definition: "Finding and fixing errors in code.", bonus: false },
    { word: "testing", definition: "Evaluating a system or its components to ensure it meets requirements.", bonus: false },
    { word: "git", definition: "A distributed version control system.", bonus: false },
    { word: "repository", definition: "A storage location for software packages.", bonus: false },
    { word: "branch", definition: "A parallel version of a repository.", bonus: false },
    { word: "merge", definition: "Combining multiple sequences of code into one.", bonus: false },
    { word: "conflict", definition: "A disagreement between two parties in code.", bonus: false },
    { word: "commit", definition: "Saving changes to a repository.", bonus: false },
    { word: "push", definition: "Uploading local repository content to a remote repository.", bonus: false },
    { word: "pull", definition: "Downloading content from a remote repository.", bonus: false },
    { word: "clone", definition: "Creating a copy of a repository.", bonus: false },
    { word: "fork", definition: "Creating a personal copy of someone else's project.", bonus: false },
    { word: "agile", definition: "A methodology for iterative and incremental development.", bonus: false },
    { word: "scrum", definition: "A framework for managing complex projects.", bonus: false },
    { word: "kanban", definition: "A visual system for managing work as it moves through a process.", bonus: false },
    { word: "sprint", definition: "A set period during which specific work is completed.", bonus: false },
    { word: "waterfall", definition: "A linear and sequential approach to project management.", bonus: false },
    { word: "devops", definition: "A set of practices that combines software development and IT operations.", bonus: false },
    { word: "automation", definition: "Using technology to perform tasks with minimal human intervention.", bonus: false },
    { word: "virtualization", definition: "Creating a virtual version of something, such as hardware.", bonus: false },
    { word: "containerization", definition: "Packaging software code with all its dependencies.", bonus: false },
    { word: "docker", definition: "A platform for developing, shipping, and running applications in containers.", bonus: false },
    { word: "kubernetes", definition: "An open-source system for automating deployment, scaling, and management of containerized applications.", bonus: false },
    { word: "microservices", definition: "An architectural style that structures an application as a collection of loosely coupled services.", bonus: false },
    { word: "api", definition: "A set of rules that allow programs to communicate with each other.", bonus: false },
    { word: "rest", definition: "An architectural style for designing networked applications.", bonus: false },
    { word: "graphql", definition: "A query language for APIs and a runtime for executing those queries.", bonus: false },
    { word: "websocket", definition: "A communication protocol providing full-duplex communication channels over a single TCP connection.", bonus: false },
    { word: "http", definition: "A protocol used for transmitting hypertext over the internet.", bonus: false },
    { word: "https", definition: "A secure version of HTTP.", bonus: false },
    { word: "ssl", definition: "A protocol for securing communication over the internet.", bonus: false },
    { word: "tls", definition: "A cryptographic protocol designed to provide communications security over a computer network.", bonus: false },
    { word: "encryption", definition: "The process of converting information into a secret code.", bonus: false },
    { word: "firewall", definition: "A network security system that monitors and controls incoming and outgoing network traffic.", bonus: false },
    { word: "gateway", definition: "A node in a network that serves as an entrance to another network.", bonus: false },
    { word: "hash", definition: "A function that converts an input into a fixed-size string of bytes.", bonus: false },
    { word: "iterator", definition: "An object that enables traversal of a container, particularly lists.", bonus: false },
    { word: "javascript", definition: "A programming language used to create interactive web pages.", bonus: true }, // Bonus word
    { word: "kernel", definition: "The core part of an operating system that manages system resources.", bonus: false },
    { word: "loop", definition: "A sequence of instructions that is continually repeated until a certain condition is reached.", bonus: false },
    { word: "network", definition: "A group of interconnected computers and devices.", bonus: false },
    { word: "object", definition: "An instance of a class in object-oriented programming.", bonus: false },
    { word: "protocol", definition: "A set of rules governing the exchange of data between devices.", bonus: false },
    { word: "query", definition: "A request for data or information from a database.", bonus: false },
    { word: "recursion", definition: "A function calling itself to solve a problem.", bonus: true }, // Bonus word
    { word: "server", definition: "A computer or system that provides resources or services to other computers.", bonus: false },
    { word: "terminal", definition: "A text-based interface for interacting with a computer.", bonus: false },
    { word: "unicode", definition: "A computing industry standard for consistent encoding of text.", bonus: false },
    { word: "virtualization", definition: "Creating a virtual version of something, such as hardware.", bonus: false },
    { word: "webhook", definition: "A method of augmenting or altering the behavior of a web page with custom callbacks.", bonus: false },
    { word: "xml", definition: "A markup language designed to store and transport data.", bonus: false },
    { word: "yaml", definition: "A human-readable data serialization format.", bonus: false },
    { word: "zip", definition: "A file format used for data compression and archiving.", bonus: false },
    { word: "binary", definition: "A number system that uses only two digits: 0 and 1.", bonus: false },
    { word: "cache", definition: "A hardware or software component that stores data for future requests.", bonus: false },
    { word: "debug", definition: "The process of finding and fixing errors in code.", bonus: false },
    { word: "ethernet", definition: "A system for connecting computers within a local area network.", bonus: false },
    { word: "framework", definition: "A platform for developing software applications.", bonus: false },
    { word: "gpu", definition: "A specialized processor designed to handle graphics rendering.", bonus: false },
    { word: "interface", definition: "A shared boundary across which two systems exchange information.", bonus: false },
    { word: "java", definition: "A high-level, class-based, object-oriented programming language.", bonus: false },
    { word: "keyboard", definition: "An input device used to type text and commands into a computer.", bonus: false },
    { word: "latency", definition: "The time delay between a stimulus and the response to it.", bonus: false },
    { word: "metadata", definition: "Data that provides information about other data.", bonus: false },
    { word: "node", definition: "A basic unit of a data structure, such as a linked list or tree.", bonus: false },
    { word: "opensource", definition: "Software with source code that anyone can inspect, modify, and enhance.", bonus: false },
    { word: "python", definition: "A high-level, interpreted programming language.", bonus: true }, // Bonus word
    { word: "queue", definition: "A collection of entities maintained in a sequence.", bonus: false },
    { word: "router", definition: "A device that forwards data packets between computer networks.", bonus: false },
    { word: "script", definition: "A program or sequence of instructions interpreted or carried out by another program.", bonus: false },
    { word: "token", definition: "A single element of a programming language.", bonus: false },
    { word: "upload", definition: "The process of sending data to a remote system.", bonus: false },
    { word: "virus", definition: "A type of malicious software that replicates itself by modifying other programs.", bonus: false },
    { word: "workflow", definition: "A sequence of processes through which work passes from initiation to completion.", bonus: false },
    { word: "ajax", definition: "A technique for creating fast and dynamic web pages.", bonus: false },
    { word: "bigdata", definition: "Extremely large data sets that may be analyzed computationally.", bonus: false },
    { word: "blockchain", definition: "A decentralized digital ledger used to record transactions.", bonus: true }, // Bonus word
    { word: "cloud", definition: "A network of remote servers used to store and process data.", bonus: false },
    { word: "cyber security", definition: "The practice of protecting systems and networks from digital attacks.", bonus: true },
    { word: "data mining", definition: "The process of discovering patterns in large data sets.", bonus: false },
    { word: "deep learning", definition: "A subset of machine learning using neural networks.", bonus: true }, // Bonus word
    { word: "devops", definition: "A set of practices combining software development and IT operations.", bonus: false },
    { word: "machine learning", definition: "A method of data analysis that automates analytical model building.", bonus: true }, // Bonus word
    { word: "neural network", definition: "A series of algorithms that mimic the human brain.", bonus: true }, // Bonus word
    { word: "quantum computing", definition: "Computing using quantum-mechanical phenomena.", bonus: true }, // Bonus word
    { word: "reinforcement learning", definition: "A type of machine learning based on reward and punishment.", bonus: true }, // Bonus word
    { word: "supervised learning", definition: "A machine learning technique using labeled data.", bonus: true }, // Bonus word
    { word: "unsupervised learning", definition: "A machine learning technique using unlabeled data.", bonus: true }, // Bonus word
    { word: "virtual reality", definition: "A simulated experience using computer technology.", bonus: false },
    { word: "augmented reality", definition: "An enhanced version of reality using digital elements.", bonus: false },
    { word: "artificial intelligence", definition: "The simulation of human intelligence by machines.", bonus: true }, // Bonus word
    { word: "internet of things", definition: "A network of interconnected devices.", bonus: false },
    { word: "natural language", definition: "A field of AI focused on interactions between computers and humans.", bonus: true }, // Bonus word
    { word: "computer vision", definition: "A field of AI enabling computers to interpret visual data.", bonus: true }, // Bonus word
    { word: "robotics", definition: "The branch of technology dealing with robots.", bonus: false },
    
  ];

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function startNewWord() {
    const { word, definition, bonus } = getRandomWord();
    currentWord = word;
    
    if (bonus) {
      wordDisplay.innerHTML = `${word} <span style="color: #27ae60; font-size: 2rem;">+2</span>`;
    } else {
      wordDisplay.textContent = word;
    }
  
    definitionDisplay.textContent = definition;
    wordX = 0;
    wordDisplay.style.left = `${wordX}px`;
    return bonus;
  }


function update() {
  if (gameOver || isPaused) return;


  wordX += wordSpeed;
  wordDisplay.style.left = `${wordX}px`;

  const progress = wordX / window.innerWidth;
  progressBar.style.transform = `scaleX(${1 - progress})`;

  if (wordX > window.innerWidth) {
    gameOver = true;
    gameOverSound.play();
    endGame();
  }

  requestAnimationFrame(update);
}

inputBox.addEventListener("input", (e) => {
  if (inputBox.value === currentWord) {
    
    score++;
    scoreElement.textContent = score;
    inputBox.value = "";
    correctSound.play();

    const bonus = startNewWord();
    if (bonus) {
      time += 2;
      
      
    }

    wordSpeed += 0.2; 
  }
});

pauseButton.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "Resume or Zero" : "Pause or Zero";
  if (!isPaused) {
    update(); 
  }
});


exitButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to exit?")) {
    document.location.reload();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "0" || e.key === "0") {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "Resume or Zero" : "Pause or Zero";
    if (!isPaused) {
      update(); 
    }
  }
});

startNewWord();
update();


setInterval(() => {
  if (!gameOver && !isPaused) {
    time++;
    timeElement.textContent = time;
  }
}, 1000);



function saveScore(score) {

    const previousScores = JSON.parse(localStorage.getItem("previousScores")) || [];
 
    previousScores.unshift(score);
  
    if (previousScores.length >3) {
      previousScores.pop();
    }

    localStorage.setItem("previousScores", JSON.stringify(previousScores));
  }
  
  function displayPreviousScores() {
    const scoreList = document.getElementById("scoreList");
    const previousScores = JSON.parse(localStorage.getItem("previousScores")) || [];

    scoreList.innerHTML = "";
 
    previousScores.forEach((score, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Game ${index + 1} : ${score}`;
      scoreList.appendChild(listItem);
    });
  }
  
  function endGame() {
    gameOver = true;
    gameOverSound.play();
    alert(`Game Over! Your score: ${score}`);
 
    saveScore(score);

    displayPreviousScores();
 
    document.location.reload();
  }

  window.onload = displayPreviousScores;