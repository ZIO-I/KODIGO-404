// Chapter and scenario data
const chapters = [
    {
      title: "Chapter 1: Exam Day",
      unlocked: true,
      scenarios: [
        {
          text: "It's the day of your big exam. What do you do?",
          choices: [
            { text: "Study last-minute", outcome: "You feel prepared but stressed.", nextScenario: 1 },
            { text: "Go to the exam hall early", outcome: "You feel calm and confident.", nextScenario: 1 },
          ]
        },
        {
          text: "During the exam, you face a tough question. What's your move?",
          choices: [
            { text: "Answer with your best guess", outcome: "You manage to move on and focus on other questions.", nextScenario: 2 },
            { text: "Ask for help", outcome: "You get scolded by the teacher.", nextScenario: 2 },
          ]
        },
        {
          text: "You've completed the exam. What do you do now?",
          choices: [
            { text: "Celebrate with friends", outcome: "You relax and have fun.", nextScenario: null },
            { text: "Start preparing for the next exam", outcome: "You're ahead for the next challenge.", nextScenario: null },
          ]
        },
      ]
    },
    {
      title: "Chapter 2: The First Shortcut",
      unlocked: false,
      scenarios: [
        {
          text: "You overhear students discussing a shortcut to pass exams. What do you do?",
          choices: [
            { text: "Ignore them", outcome: "You stick to your principles.", nextScenario: 1 },
            { text: "Listen closely", outcome: "You get intrigued by their plan.", nextScenario: 1 },
          ]
        },
        {
          text: "They ask you to join their plan. What's your decision?",
          choices: [
            { text: "Decline and report them", outcome: "You maintain integrity but become a target for bullying.", nextScenario: null },
            { text: "Agree to join", outcome: "You risk your reputation and get involved in trouble.", nextScenario: null },
          ]
        },
      ]
    },
    {
      title: "Chapter 3: Group Pressure",
      unlocked: false,
      scenarios: [
        {
          text: "A group invites you to skip class for an 'important' meeting. Do you agree?",
          choices: [
            { text: "Go with them", outcome: "You miss a key lecture and regret it later.", nextScenario: 1 },
            { text: "Stay in class", outcome: "You gain valuable insights from the lecture.", nextScenario: 1 },
          ]
        },
        {
          text: "The group confronts you for not joining. What's your response?",
          choices: [
            { text: "Apologize and explain", outcome: "They grudgingly accept your reasoning.", nextScenario: null },
            { text: "Stand your ground", outcome: "You gain respect but lose their trust.", nextScenario: null },
          ]
        },
      ]
    },
    {
      title: "Chapter 4: The Mentor's Advice",
      unlocked: false,
      scenarios: [
        {
          text: "A mentor offers advice about navigating challenges. Do you listen?",
          choices: [
            { text: "Listen attentively", outcome: "You gain valuable wisdom.", nextScenario: 1 },
            { text: "Ignore and walk away", outcome: "You miss out on crucial guidance.", nextScenario: 1 },
          ]
        },
        {
          text: "The mentor shares a strategy for exam preparation. Do you follow it?",
          choices: [
            { text: "Apply the advice", outcome: "You achieve excellent results in your next test.", nextScenario: null },
            { text: "Stick to your own methods", outcome: "You perform adequately but not spectacularly.", nextScenario: null },
          ]
        },
      ]
    },
    {
      title: "Chapter 5: The Final Challenge",
      unlocked: false,
      scenarios: [
        {
          text: "The final exam approaches, and you feel the pressure. What's your focus?",
          choices: [
            { text: "Stay honest and study hard", outcome: "You feel proud of your achievements.", nextScenario: 1 },
            { text: "Take a shortcut and cheat", outcome: "You face severe consequences when caught.", nextScenario: 1 },
          ]
        },
        {
          text: "You finish the exam and reflect on your journey. What's your takeaway?",
          choices: [
            { text: "Hard work pays off", outcome: "You leave with a sense of accomplishment.", nextScenario: null },
            { text: "Shortcuts aren't worth it", outcome: "You learn a hard but valuable lesson.", nextScenario: null },
          ]
        },
      ]
    },
  ];
  

  
  let currentChapter = 0;
  let currentScenario = 0;
  let history = [];
  let saveSlots = [null, null, null];
  
  // Main menu buttons
  document.getElementById("new-game-btn").addEventListener("click", startGame);
  document.getElementById("load-game-btn").addEventListener("click", () => showSaveLoadSlots(false));
  document.getElementById("chapter-select-btn").addEventListener("click", () => alert("Chapter selection not implemented yet."));
  document.getElementById("settings-btn").addEventListener("click", () => alert("Settings not implemented yet."));
  document.getElementById("quit-btn").addEventListener("click", () => alert("Thanks for playing!"));
  
  // Gameplay controls
  document.getElementById("save-btn").addEventListener("click", () => showSaveLoadSlots(true));
  document.getElementById("load-btn").addEventListener("click", () => showSaveLoadSlots(false));
  document.getElementById("back-btn").addEventListener("click", goBack);
  
  // Start game
  function startGame() {
    document.getElementById("main-menu").classList.add("hidden");
    document.getElementById("gameplay").classList.remove("hidden");
    showTextAnimation("Welcome to Kodigo 404: Playbook of Shortcuts", () => {
      setTimeout(() => {
        showTextAnimation("Where decisions matter the most", () => {
          loadChapter(currentChapter);
        });
      }, 1500);
    });
  }
  
  function loadChapter(chapterIndex) {
    const chapter = chapters[chapterIndex];
    showTextAnimation(chapter.title, () => loadScenario(0));
  }
  
  function loadScenario(scenarioIndex) {
    history.push({ currentChapter, currentScenario });
    const scenario = chapters[currentChapter].scenarios[scenarioIndex];
    currentScenario = scenarioIndex;
  
    const storyText = document.getElementById("story-text");
    storyText.textContent = scenario.text;
  
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";
  
    scenario.choices.forEach(choice => {
      const button = document.createElement("button");
      button.textContent = choice.text;
      button.addEventListener("click", () => {
        alert(choice.outcome);
        if (choice.nextScenario !== undefined) {
          loadScenario(choice.nextScenario);
        }
      });
      choicesContainer.appendChild(button);
    });
  }
  
  function goBack() {
    if (history.length > 0) {
      const prevState = history.pop();
      currentChapter = prevState.currentChapter;
      currentScenario = prevState.currentScenario;
      loadScenario(currentScenario);
    } else {
      alert("No previous decision to go back to!");
    }
  }
  
  function showTextAnimation(text, callback) {
    const storyText = document.getElementById("story-text");
    storyText.textContent = "";
    let i = 0;
  
    const interval = setInterval(() => {
      storyText.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(callback, 1500);
      }
    }, 100);
  }
  
  function showSaveLoadSlots(isSave) {
    const slotsContainer = document.getElementById("slots-container");
    slotsContainer.innerHTML = "";
    for (let i = 0; i < saveSlots.length; i++) {
      const button = document.createElement("button");
      button.textContent = isSave ? `Save Slot ${i + 1}` : `Load Slot ${i + 1}`;
      button.addEventListener("click", () => {
        if (isSave) saveGame(i);
        else loadGame(i);
      });
      slotsContainer.appendChild(button);
    }
    slotsContainer.classList.remove("hidden");
  }
  
  function saveGame(slotIndex) {
    saveSlots[slotIndex] = { currentChapter, currentScenario };
    alert(`Game saved in slot ${slotIndex + 1}`);
  }
  
  function loadGame(slotIndex) {
    const saveData = saveSlots[slotIndex];
    if (saveData) {
      currentChapter = saveData.currentChapter;
      currentScenario = saveData.currentScenario;
      loadScenario(currentScenario);
      document.getElementById("main-menu").classList.add("hidden");
      document.getElementById("gameplay").classList.remove("hidden");
    } else {
      alert("No save data in this slot!");
    }
  }
  