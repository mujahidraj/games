const cardGrid = document.getElementById("cardGrid");
const timerElement = document.getElementById("time");
const matchCountElement = document.getElementById("matchCount");
const totalPairsElement = document.getElementById("totalPairs");
const roundElement = document.getElementById("round");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalWhat = document.getElementById("modalWhat");
const modalWhere = document.getElementById("modalWhere");
const modalHow = document.getElementById("modalHow");
const closeModal = document.getElementById("closeModal");

const matchSound = document.getElementById("matchSound");


const components = [
  {
    image: "cpu.png",
    name: "CPU",
    what: "The Central Processing Unit (CPU) is the primary component of a computer that performs most of the processing inside the computer.",
    where: "Used in all types of computers, from desktops to laptops to servers.",
    how: "Install it on the motherboard and connect it to the power supply and cooling system."
  },
  {
    image: "gpu.jpg",
    name: "GPU",
    what: "The Graphics Processing Unit (GPU) is a specialized processor designed to handle graphics rendering.",
    where: "Used in gaming PCs, workstations, and servers for rendering images and videos.",
    how: "Install it on the motherboard and connect it to the power supply and monitor."
  },
  {
    image: "keyboard.png",
    name: "Keyboard",
    what: "A keyboard is an input device used to type text and commands into a computer.",
    where: "Used in all types of computers and devices that require text input.",
    how: "Connect it to the computer via USB or Bluetooth."
  },
  {
    image: "mouse.png",
    name: "Mouse",
    what: "A mouse is an input device used to control the cursor on a computer screen.",
    where: "Used in all types of computers and devices that require cursor control.",
    how: "Connect it to the computer via USB or Bluetooth."
  },
  {
    image: "monitor.jpg",
    name: "Monitor",
    what: "A monitor is an output device that displays visual information from the computer.",
    where: "Used in all types of computers and devices that require visual output.",
    how: "Connect it to the computer via HDMI, DisplayPort, or VGA."
  },
  {
    image: "printer.png",
    name: "Printer",
    what: "A printer is an output device that produces a hard copy of digital documents.",
    where: "Used in offices, homes, and businesses for printing documents and images.",
    how: "Connect it to the computer via USB or Wi-Fi and install the necessary drivers."
  },
  {
    image: "router.png",
    name: "Router",
    what: "A router is a networking device that forwards data packets between computer networks.",
    where: "Used in homes, offices, and data centers to connect devices to the internet.",
    how: "Connect it to the modem and configure it using a web interface."
  },
  {
    image: "server.jpg",
    name: "Server",
    what: "A server is a computer or device that provides resources or services to other computers.",
    where: "Used in data centers, businesses, and cloud computing environments.",
    how: "Install it in a rack, connect it to the network, and configure it for specific services."
  },
  {
    image: "hdd.png",
    name: "Hard Drive",
    what: "A hard drive is a storage device used to store and retrieve digital data.",
    where: "Used in all types of computers and devices that require data storage.",
    how: "Install it in the computer case and connect it to the motherboard and power supply."
  },
  {
    image: "ssd.png",
    name: "SSD",
    what: "A Solid State Drive (SSD) is a storage device that uses flash memory to store data.",
    where: "Used in all types of computers and devices that require fast data storage.",
    how: "Install it in the computer case and connect it to the motherboard and power supply."
  },
  {
    image: "ethernet.png",
    name: "Ethernet Cable",
    what: "An Ethernet cable is used to connect devices to a local area network (LAN).",
    where: "Used in homes, offices, and data centers for wired internet connections.",
    how: "Connect one end to the device and the other end to a router or modem."
  },
  {
    image: "hdmi.png",
    name: "HDMI Cable",
    what: "An HDMI cable is used to transmit high-definition audio and video signals.",
    where: "Used in TVs, monitors, and gaming consoles for connecting to displays.",
    how: "Connect one end to the device and the other end to a display or monitor."
  },
  {
    image: "headphone.png",
    name: "Headphone",
    what: "A headphone is an output device used to listen to audio privately.",
    where: "Used in computers, smartphones, and music players for personal audio.",
    how: "Connect it to the audio jack or via Bluetooth."
  },
  {
    image: "speaker.png",
    name: "Speaker",
    what: "A speaker is an output device used to play audio.",
    where: "Used in computers, TVs, and home theater systems for audio output.",
    how: "Connect it to the audio output port or via Bluetooth."
  },
  {
    image: "microphone.png",
    name: "Microphone",
    what: "A microphone is an input device used to capture audio.",
    where: "Used in computers, smartphones, and recording studios for audio input.",
    how: "Connect it to the audio input port or via Bluetooth."
  },
  {
    image: "joystick.png",
    name: "Joystick",
    what: "A joystick is an input device used to control movement in games and simulations.",
    where: "Used in gaming PCs and flight simulators for precise control.",
    how: "Connect it to the computer via USB or Bluetooth."
  },
  {
    image: "motherboard.png",
    name: "Motherboard",
    what: "The motherboard is the main circuit board of a computer that connects all components.",
    where: "Used in all types of computers to connect and power components.",
    how: "Install it in the computer case and connect all components to it."
  },
  {
    image: "ram.png",
    name: "RAM",
    what: "Random Access Memory (RAM) is a type of volatile memory used for temporary data storage.",
    where: "Used in all types of computers to store data temporarily for quick access.",
    how: "Install it on the motherboard in the RAM slots."
  },
  {
    image: "usb.png",
    name: "USB Drive",
    what: "A USB drive is a portable storage device used to store and transfer data.",
    where: "Used in all types of computers and devices for data storage and transfer.",
    how: "Insert it into a USB port on the computer."
  }
];

let flippedCards = [];
let matchedCards = [];
let time = 60;
let timer;
let isGameStarted = false;
let matchCount = 0;
let currentRound = 1;
let totalPairs = 2;

const rounds = [
  { pairs: 2, timeLimit: 60 },   // Round 1
  { pairs: 4, timeLimit: 90 },  // Round 2
  { pairs: 8, timeLimit: 120 },  // Round 3
  { pairs: 12, timeLimit: 180 }  // Final Round
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCardGrid() {
  const selectedComponents = components.slice(0, totalPairs);
  const cards = [...selectedComponents, ...selectedComponents];
  const shuffledCards = shuffle(cards);

  cardGrid.innerHTML = "";
  cardGrid.style.gridTemplateColumns = `repeat(${Math.min(totalPairs, 4)}, 1fr)`;

  shuffledCards.forEach((component, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.innerHTML = `<img src="images/${component.image}" alt="${component.name}">`;
    card.addEventListener("click", flipCard);
    cardGrid.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkForMatch();
    }

   
    if (!isGameStarted) {
      isGameStarted = true;
      startTimer();
    }
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  const img1 = card1.querySelector("img").src;
  const img2 = card2.querySelector("img").src;

  if (img1 === img2) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards.push(card1, card2);
    matchCount++;
    matchCountElement.textContent = matchCount;

        matchSound.play();


    const componentName = card1.querySelector("img").alt;
    const component = components.find(c => c.name === componentName);
    showComponentDetails(component);

    if (matchedCards.length === totalPairs * 2) {
      endRound(true);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }, 1000);
  }

  flippedCards = [];
}

function showComponentDetails(component) {
  modalTitle.textContent = component.name;
  modalWhat.textContent = component.what;
  modalWhere.textContent = component.where;
  modalHow.textContent = component.how;
  modal.style.display = "block";
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

function startTimer() {
  timer = setInterval(() => {
    time--;
    timerElement.textContent = time;

    if (time <= 0) {
      endRound(false);
    }
  }, 1000);
}


function endRound(isWin) {
  clearInterval(timer);

  if (isWin) {
    if (currentRound < rounds.length) {
      alert(`Congratulations! You completed Round ${currentRound}.`);
      currentRound++;
      startRound();
    } else {
      alert("Congratulations! You completed all rounds!");
      resetGame();
    }
  } else {
    alert(`Time's up! You lost Round ${currentRound}.`);
    resetGame();
  }
}


function startRound() {
  const roundConfig = rounds[currentRound - 1];
  totalPairs = roundConfig.pairs;
  time = roundConfig.timeLimit;

  matchCount = 0;
  matchedCards = [];
  flippedCards = [];
  isGameStarted = false;

  roundElement.textContent = currentRound;
  totalPairsElement.textContent = totalPairs;
  matchCountElement.textContent = matchCount;
  timerElement.textContent = time;

  createCardGrid();
}


function resetGame() {
  currentRound = 1;
  startRound();
}

startRound();