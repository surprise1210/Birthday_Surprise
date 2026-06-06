let currentStep = 1;
const totalSteps = 7;
let userName = "Suhani"; 
let photoUploaded = false;
let messageStarted = false;
let scrollOpened = false;
let scrollTypingStarted = false; 
let fanIsOn = false;
let diwaliLightsInterval;
let windInterval;
let fireworksInterval;
let bgGradientInterval; 
let watermarkInterval; 

const diwaliColors = ['#ff0055', '#00ff66', '#00ffff', '#ffff00', '#ff00ff', '#ff6600', '#9900ff', '#fffa00'];
const bulbsArray = [];

// 🚀 Website load hote hi saare main functions ko initialize karne ke liye
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  startFloatingHearts(); // Background me dil udane ke liye
  setupPhotoUpload(); // Photo upload system configure karne ke liye
  setupHeart(); // Step 3 ke heart click custom messages ke liye
  buildDiwaliWireLights(); // Border par Diwali lights lagane ke liye
  formatRoyalScrollParagraphs(); // Shahi scroll ke text ko set karne ke liye
  setupPolaroidInteractions(); // Photos par hover effect daalne ke liye
  startAmbientBgShift(); // Background color dheere-dheere badalne ke liye       
  startPremiumWatermarkEngine(); // Screen par automatic name watermarks ke liye
  
  const intro = document.getElementById("introScreen");
  if (intro) {
    intro.addEventListener("click", startExperience, { once: true });
    intro.addEventListener("touchstart", startExperience, { once: true });
  }
});

// 🎨 Background gradient ko har 5 second me smoothly change karne ke liye
function startAmbientBgShift() {
  const gradients = [
    "linear-gradient(135deg, #0f0c1b, #201335, #0f0c1b)",
    "linear-gradient(135deg, #0b132b, #1c2541, #0b132b)",
    "linear-gradient(135deg, #1a0f1a, #331433, #1a0f1a)",
    "linear-gradient(135deg, #0d1b2a, #1b263b, #0d1b2a)"
  ];
  let gIndex = 0;
  document.body.style.transition = "background 4s ease-in-out";
  
  bgGradientInterval = setInterval(() => {
    gIndex = (gIndex + 1) % gradients.length;
    document.body.style.background = gradients[gIndex];
  }, 5000);
}

// 👑 Screen par alag-alag jagah halka sa floating text watermark dikhane ke liye
function startPremiumWatermarkEngine() {
  const customGreetings = [
    `${userName}🎂`,
    "Happy Birthday ✨",
    "Stay Blessed🌸 Dear",
    "Surprise Dear👑",
    `${userName} ji🎉`
  ];

  watermarkInterval = setInterval(() => {
    if (document.hidden) return; // Agar user dusre tab me ho toh pause rakho

    const watermark = document.createElement("div");
    watermark.innerText = customGreetings[Math.floor(Math.random() * customGreetings.length)];
    
    // Random position aur rotation set karne ke liye
    watermark.style.position = "fixed";
    watermark.style.left = (10 + Math.random() * 70) + "%";
    watermark.style.top = (15 + Math.random() * 65) + "%";
    watermark.style.transform = `translate(-50%, -50%) scale(0.6) rotate(${Math.random() * 30 - 15}deg)`;
    watermark.style.opacity = "0";
    watermark.style.color = "#ffffff";
    watermark.style.fontFamily = "'Dancing Script', cursive, sans-serif";
    watermark.style.fontSize = (28 + Math.random() * 24) + "px";
    watermark.style.letterSpacing = "2px";
    watermark.style.pointerEvents = "none";
    watermark.style.zIndex = "1"; 
    watermark.style.userSelect = "none";
    watermark.style.whiteSpace = "nowrap";
    watermark.style.transition = "opacity 2s ease, transform 6s cubic-bezier(0.1, 0.8, 0.2, 1)";
    
    document.body.appendChild(watermark);

    // Fade in aur scale up effect trigger karne ke liye
    requestAnimationFrame(() => {
      watermark.style.opacity = Math.random() * 0.05 + 0.04; 
      watermark.style.transform = watermark.style.transform.replace("scale(0.6)", "scale(1.15)");
    });

    // Kuch der baad watermark ko safely remove karne ke liye
    setTimeout(() => {
      watermark.style.opacity = "0";
      setTimeout(() => watermark.remove(), 2100);
    }, 3800);
  }, 2500);
}

// 🎵 Intro screen par click karte hi music play karne aur countdown shuru karne ke liye
function startExperience() {
  const audio = document.getElementById("bgMusic");
  const hint = document.querySelector(".audio-trigger-hint");
  if (audio) {
    audio.volume = 0.4;
    audio.play()
      .then(() => { if (hint) hint.style.opacity = "0"; })
      .catch(e => console.log("Audio unblocked fallback", e));
  }
  startCountdown();
}

// ⏱️ 10 se 1 tak ka premium circular countdown chalane ke liye
function startCountdown() {
  const numEl = document.getElementById("countdownNumber");
  const circle = document.querySelector(".progress-ring__circle");
  if (!numEl || !circle) return;

  let timeLeft = 10;
  const circumference = 2 * Math.PI * 90;
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = 0;
  numEl.classList.add("smooth-pulse");

  const timer = setInterval(() => {
    timeLeft--;
    const offset = circumference - (timeLeft / 10) * circumference;
    circle.style.strokeDashoffset = offset;
    
    if (timeLeft > 0) {
      numEl.classList.remove("smooth-pulse");
      void numEl.offsetWidth; // Animation reset mechanism
      numEl.innerText = timeLeft;
      numEl.classList.add("smooth-pulse");
    } else {
      clearInterval(timer);
      numEl.classList.remove("smooth-pulse");
      void numEl.offsetWidth;     
      numEl.innerText = "✨";
      numEl.classList.add("smooth-pulse");
      
      // Countdown khatam hote hi main screen open hogi
      setTimeout(() => {
        executeCinematicReveal();
      }, 700);
    }
  }, 1000);
}

// 🎬 Intro screen ko dheere se fade-out karke main content dikhane ke liye
function executeCinematicReveal() {
  const intro = document.getElementById("introScreen");
  const main = document.getElementById("mainContainer");
  const audio = document.getElementById("bgMusic");
  if (audio && audio.paused) {
    audio.play().catch(e => console.log("Final reveal backup strategy invoked"));
  }
  if (intro) {
    intro.style.transition = "all 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
    intro.style.opacity = "0";
    intro.style.backdropFilter = "blur(0px)";
    intro.style.transform = "scale(1.15)"; 
    setTimeout(() => {
      intro.style.display = "none";
      if (main) {
        main.classList.remove("hidden");
        main.style.opacity = "0";
        main.style.transition = "opacity 0.8s ease";
        requestAnimationFrame(() => {
           main.style.opacity = "1";
        });
      }
      injectDynamicNames(); // HTML me naam fill karne ke liye
      showStep(1); 
    }, 1200);
  }
}

// 📝 Name placeholders me target text input karne ke liye
function injectDynamicNames() {
  const welcomeText = document.getElementById("welcomeText");
  const finalName = document.getElementById("finalName");
  
  if (welcomeText) welcomeText.innerHTML = `💖 For ${userName} ✨`;
  if (finalName) finalName.innerText = userName;
}

// 🔄 Ek step se dusre step par bina page reload kiye transitions handle karne ke liye
function showStep(step) {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  const active = document.getElementById(`step${step}`);
  if (!active) return;
  
  active.classList.add("active");
  currentStep = step;
  updateProgress(); // Top bar update karne ke liye

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Agar step 4 hai aur typing shuru nahi hui, toh auto-type start karo
  if (step === 4 && !messageStarted) {
    messageStarted = true;
    typeMessage();
  }
  // Aakhiri step par aate hi patakhe fodna shuru karo
  if (step === 7) {
    finalFireworks();
  }
}

// 🛡️ Safe checks aur next button ki restriction logic
function nextStep() {
  if (currentStep === 1 && !fanIsOn) {
    showHint("Pehle fan ka switch ON karke candles blow kijiye! 🔌");
    return;
  }
  if (currentStep === 6 && !scrollOpened) {
    showHint("Pehle click karke Royal Scroll ko unfold kijiye! 📜");
    return;
  }
  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
  }
}

// 📊 Top horizontal progress bar ka width calculate karne ke liye
function updateProgress() {
  const bar = document.getElementById("progressBar");
  const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
  if (bar) bar.style.width = percent + "%";
}

// 💡 Border frame ke charo taraf diwali bulbs layer generate karne ke liye
function buildDiwaliWireLights() {
  const frame = document.getElementById("diwaliWireFrame");
  if (!frame) return;
  const totalBulbs = 28;

  for (let i = 0; i < totalBulbs; i++) {
    const bulb = document.createElement('div');
    bulb.classList.add('diwali-bulb');
    frame.appendChild(bulb);
    bulbsArray.push(bulb);
    
    // Bulbs ko border ke mutabik distribute karne ke liye
    let segment = i / totalBulbs;
    if (segment < 0.25) {
      bulb.style.top = '-8px'; bulb.style.left = (segment * 4 * 100) + '%';
    } else if (segment < 0.5) {
      bulb.style.right = '-8px'; bulb.style.top = ((segment - 0.25) * 4 * 100) + '%';
    } else if (segment < 0.75) {
      bulb.style.bottom = '-8px'; bulb.style.right = ((segment - 0.5) * 4 * 100) + '%';
    } else {
      bulb.style.left = '-8px'; bulb.style.bottom = ((segment - 0.75) * 4 * 100) + '%';
    }
  }
}

// 🌈 Bulbs me random multi-color flashing glow lane ke liye
function triggerMulticolorBlink() {
  bulbsArray.forEach(bulb => {
    const pickColor = diwaliColors[Math.floor(Math.random() * diwaliColors.length)];
    bulb.style.backgroundColor = pickColor;
    bulb.style.boxShadow = `0 0 12px 4px ${pickColor}`;
  });
}

// 💨 Fan chalne par realistic air stroke streaks generate karne ke liye
function startWindEffect() {
  const windContainer = document.getElementById("windContainer");
  if (!windContainer) return;
  windInterval = setInterval(() => {
    const streak = document.createElement("div");
    streak.classList.add("wind-streak");
    streak.style.top = Math.random() * 100 + "%";
    streak.style.animationDuration = (0.4 + Math.random() * 0.4) + "s";
    streak.style.width = (40 + Math.random() * 60) + "px";
    windContainer.appendChild(streak);
    setTimeout(() => streak.remove(), 800);
  }, 60);
}

// 🚬 Candles bujhte hi realistic dhuwan (smoke particles) chhodne ke liye
function triggerRealisticSmoke(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const p = document.createElement("div");
      p.classList.add("smoke-particle");
      const size = (8 + Math.random() * 14) + "px";
      p.style.width = size; p.style.height = size; p.style.left = (Math.random() * 10 - 5) + "px";
      container.appendChild(p);
      setTimeout(() => p.remove(), 1600);
    }, i * 70); 
  }
}

// 🔌 Main trigger: Switch daba kar Fan on karne aur candles blow karne ke liye
function turnOnFanSystem() {
  if (fanIsOn) return; 
  const toggle = document.getElementById("fanSwitch");
  const fan = document.getElementById("tableFan");
  const hintText = document.getElementById("fanHint");
  const label = document.querySelector(".switch-label");
  const btn = document.getElementById("startBtn");

  fanIsOn = true;
  if (toggle) toggle.classList.add("on");
  if (label) label.innerText = "POWER ON";
  
  triggerMulticolorBlink();
  diwaliLightsInterval = setInterval(triggerMulticolorBlink, 250); // Lights blink shuru
  if (fan) fan.classList.add("spinning");
  startWindEffect(); // Hawa ka effect shuru
  if (hintText) hintText.innerHTML = "⚡Power Active! Fan is blowing dynamic air waves...";

  // 2.2 second ke hawa ke jhonke ke baad mombatti bujhegi
  setTimeout(() => {
    clearInterval(windInterval);
    document.querySelectorAll(".flame-wrapper").forEach(f => f.classList.add("off")); // Flames off
    triggerRealisticSmoke("smoke2"); // Candle 2 ka dhuwan
    triggerRealisticSmoke("smoke0"); // Candle 0 ka dhuwan
    
    premiumCelebrationBlast(); // Balloons aur stars ka explosion
    
    // Huge floating title wish screen par pop up karne ke liye
    const magicalWish = document.createElement("div");
    magicalWish.innerHTML = `Happy Birthday<br><span style="font-size: clamp(38px, 9vw, 65px); font-weight: 700; color: #f85a33; text-shadow: 0 0 20px rgba(228, 226, 214, 0.71);">${userName}💓</span>`;
    
    magicalWish.style.position = "fixed";
    magicalWish.style.top = "45%";
    magicalWish.style.left = "50%";
    magicalWish.style.transform = "translate(-50%, 50%) scale(0.50)";
    magicalWish.style.width = "90%";
    magicalWish.style.textAlign = "center";
    magicalWish.style.zIndex = "999999"; 
    magicalWish.style.fontFamily = "'Dancing Script', cursive, sans-serif";
    magicalWish.style.fontSize = "clamp(30px, 7vw, 48px)";
    magicalWish.style.color = "#ffffff";
    magicalWish.style.letterSpacing = "2px";
    magicalWish.style.lineHeight = "1.4";
    magicalWish.style.pointerEvents = "none";
    magicalWish.style.userSelect = "none";
    magicalWish.style.opacity = "0";
    magicalWish.style.filter = "blur(10px)";
    magicalWish.style.textShadow = "0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(255,105,180,0.5)";
    magicalWish.style.transition = "opacity 2.5s cubic-bezier(0.4, 0, 0.2, 1), filter 2.5s ease-out, transform 5s ease-out";
    
    document.body.appendChild(magicalWish);
    requestAnimationFrame(() => {
      magicalWish.style.opacity = "0.9"; 
      magicalWish.style.filter = "blur(0px)"; 
      magicalWish.style.transform = "translate(-50%, -50%) scale(2.05)"; 
    });
    
    // Message ko kuch der baad smooth fade out karne ke liye
    setTimeout(() => {
      magicalWish.style.transition = "opacity 2.5s ease, filter 2.5s ease, transform 3s ease";
      magicalWish.style.opacity = "0";
      magicalWish.style.filter = "blur(12px)"; 
      magicalWish.style.transform = "translate(-50%, -55%) scale(1.15)"; 
      setTimeout(() => magicalWish.remove(), 2600);
    }, 4500);

    if (hintText) hintText.innerHTML = "🎉 Shandaar! Saari candles successfully bujh gayi hain!";
    if (btn) btn.classList.add("visible-btn"); // Next step button unlock
  }, 2200); 
}

// 🎈 Multi-variety particles (Stars, Balloons, Dots) burst physics generator
function premiumCelebrationBlast() {
  const totalItems = 75;
  const balloonColors = ['#ff4d6d', '#7c4dff', '#00d2d3', '#fffa65', '#ff9f43', '#1dd1a1'];

  for (let i = 0; i < totalItems; i++) {
    setTimeout(() => {
      const p = document.createElement("div");
      p.style.position = "fixed";
      p.style.zIndex = "99999";
      p.style.pointerEvents = "none";
      p.style.userSelect = "none";

      const typeChoice = Math.floor(Math.random() * 3);

      if (typeChoice === 0) { // TYPE 0: Girte hue shiny stars
        p.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L14.8 8.4L24 11.2L14.8 14L12 24L9.2 14M0 11.2L9.2 8.4L12 0" fill="#ffff00" stroke="#fff" stroke-width="1"/></svg>`;
        p.style.left = (Math.random() * 100) + "%";
        p.style.top = "-5%";
        document.body.appendChild(p);
        let targetY = window.innerHeight * 0.85 + (Math.random() * 50);
        let driftX = (Math.random() - 0.5) * 120;
        let rotation = Math.random() * 720;
        setTimeout(() => {
          p.style.transition = "transform 3.2s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 3s ease";
          p.style.transform = `translate(${driftX}px, ${targetY}px) rotate(${rotation}deg) scale(0.4)`;
          p.style.opacity = "0";
        }, 50);

      } else if (typeChoice === 1) { // TYPE 1: Niche se upar udne wale balloons
        p.innerHTML = `<svg width="40" height="50" viewBox="0 0 40 50"><ellipse cx="20" cy="22" rx="16" ry="20" fill="${balloonColors[Math.floor(Math.random() * balloonColors.length)]}"/><path d="M19,42 Q20,46 18,50" stroke="#fff" fill="none" stroke-width="1.5"/><polygon points="20,40 16,44 24,44" fill="#fff"/></svg>`;
        p.style.left = (15 + Math.random() * 70) + "%";
        p.style.top = "65%";
        document.body.appendChild(p);
        let targetY = -(window.innerHeight * 0.8);
        let driftX = (Math.random() - 0.5) * 160;
        setTimeout(() => {
          p.style.transition = "transform 4.5s cubic-bezier(0.1, 0.2, 0.4, 1), opacity 4.2s ease";
          p.style.transform = `translate(${driftX}px, ${targetY}px) scale(1.3)`;
          p.style.opacity = "0";
        }, 50);

      } else { // TYPE 2: Center ring blast mini glitters
        p.style.width = (6 + Math.random() * 8) + "px";
        p.style.height = p.style.width;
        p.style.borderRadius = "50%";
        p.style.background = `radial-gradient(circle, #fff 20%, hsl(${Math.random() * 360}, 100%, 60%) 70%)`;
        p.style.boxShadow = `0 0 10px 2px hsl(${Math.random() * 360}, 100%, 60%)`;
        p.style.left = "50%";
        p.style.top = "45%";
        document.body.appendChild(p);
        let velocityX = (Math.random() - 0.5) * 480;
        let velocityY = (Math.random() - 0.6) * 420;
        setTimeout(() => {
          p.style.transition = "transform 1.8s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1.6s ease";
          p.style.transform = `translate(${velocityX}px, ${velocityY}px) scale(0)`;
          p.style.opacity = "0";
        }, 50);
      }
      setTimeout(() => p.remove(), 4800);
    }, i * 25); 
  }
}

// 📷 Local user gallery se photo select karne aur preview live feed karne ke liye
function setupPhotoUpload() {
  const input = document.getElementById("photoInput");
  const uploaded = document.getElementById("uploadedPhoto");
  const finalPhoto = document.getElementById("finalPhoto");
  const labelStatus = document.getElementById("uploadStatusText");
  const paper = document.getElementById("royalPaper");

  if (!input) return;

  input.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) {
      if (uploaded) uploaded.style.display = "none";
      if (finalPhoto) finalPhoto.style.display = "none";
      photoUploaded = false; return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      if (uploaded) { uploaded.src = ev.target.result; uploaded.style.display = "block"; }
      if (finalPhoto) { finalPhoto.src = ev.target.result; finalPhoto.style.display = "block"; }
      
      if(paper) {
        paper.style.backgroundImage = "none"; 
        paper.style.backgroundColor = "#f4ecd8";
      }

      if (labelStatus) labelStatus.innerHTML = "Image Selected!";
      photoUploaded = true;
      showHint("📸Photo successfully select ho gayi!");
    };
    reader.readAsDataURL(file);
  });
}

// 🛒 Check constraint for step 2 before allowing skip path
function saveName() {
  if (!photoUploaded) { 
    showHint("📸 Apna Photo upload kijiye pehle!"); 
    return; 
  }
  nextStep();
}

// 💖 Step 3 ke interactive clicking heart element ka complex engine setup
function setupHeart() {
  const heart = document.getElementById("heart");
  const msg = document.getElementById("heartMessage");
  const btn = document.getElementById("heartBtn");
  if (!heart) return;

  let messages = []; 
  let currentMessageIndex = 0;

  const handleHeartClick = (e) => {
    e.preventDefault(); 
    
    if(messages.length === 0) {
       messages = [
          `💖 ${userName}, you're completely amazing!`,
          `Haan, aap lazy ho sakti ho.. but emotionally, you're very strong 💪`,
          `No matter kitne naye log aaye life me, some people are irreplaceable… And for me, that's you🫵🫣.`,
          `Har kisi ko chahiye hota hai jo bas present rhe.. mere liye wo aap ho 🌸`,
          `Some people become important slowly... and then suddenly they become irreplaceable, and aap waise hi ho.. ✨`,
          `Aap sirf ek achhi dost nahi ho, aap woh person ho jo har situation bina bole samajh leti hai. Never change! 💕`,
          `Aapki simplicity hi aapki sabse beautiful quality hai!! 💙`,
          `Stay happy always!`
       ];
    }
    
    if (currentMessageIndex < messages.length) {
      if (msg) msg.innerHTML = messages[currentMessageIndex];
      currentMessageIndex++;
      
      // Touch and mouse coordinate checks for accurate blast points
      let clickX = window.innerWidth / 2;
      let clickY = window.innerHeight / 2;
      if (e.touches && e.touches[0]) {
        clickX = e.touches[0].clientX;
        clickY = e.touches[0].clientY;
      } else if (e.clientX) {
        clickX = e.clientX;
        clickY = e.clientY;
      }
      
      createHeartExplosion(clickX, clickY);
      
      if (currentMessageIndex === messages.length) {
        showHint("All messages unlocked! 🎉");
        if (btn) btn.classList.add("visible-btn"); // Saare click hone par next button visible
      } else {
        showHint(`✨ ${messages.length - currentMessageIndex} clicks left!`);
      }
    }
  };

  heart.addEventListener("touchstart", handleHeartClick, { passive: false });
  heart.addEventListener("click", handleHeartClick);
}

// 💔 Clicked coordinates par miniature floating pink hearts splash burst effect
function createHeartExplosion(startX, startY) {
  for(let i = 0; i < 12; i++) {
    let h = document.createElement("div");
    h.innerHTML = "💖"; h.style.position = "fixed"; 
    h.style.left = startX + "px"; h.style.top = startY + "px";
    h.style.transform = "translate(-50%, -50%)";
    h.style.fontSize = (16 + Math.random() * 12) + "px"; 
    h.style.zIndex = "9999"; h.style.pointerEvents = "none";
    h.style.userSelect = "none";
    document.body.appendChild(h);
    
    let x = (Math.random() - 0.5) * 180; 
    let y = (Math.random() - 0.5) * 180 - 40; 
    
    setTimeout(() => {
      h.style.transition = "0.9s cubic-bezier(0.1, 0.8, 0.3, 1)";
      h.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`; 
      h.style.opacity = "0";
    }, 30);
    setTimeout(() => h.remove(), 950);
  }
}

// ⌨️ Step 4: Big letter-by-letter live modern typewriter automation engine
function typeMessage() {
  const text = `✨Dear ${userName},\n\nHappy Birthday 🎂\nYou are not just a friend, aap meri life ka woh beautiful part ho jo har boring day ko special bana deta hai.\n\nKabhi kabhi kuch log itne special ban jaate hain ki unse baat kiye bina din complete nahi lagta… Thank you for being that person.\nYour smile = instant mood freshener😄\nAur honestly, aapki friendship meri life ki best cheezon me se ek hai.\n\nGoogle pe search kiya tha 'Good friend ever' but wahan aapka naam nahi aaya… kyunki aap toh limited edition unique piece ho! n😌✨\n\nPata hai, aapki sabse achhi baat kya hai??🫣🫣 \nAap utna perfect nahi ho... fir bhi aap special ho, kyunki aap sab karke bhi humesha available rahte ho isliye \n\nKabhi aapko nind aate rahti hai, kabhi headache hote rhta hai, kabhi padhne ka mann nahi hota or kabhi kuchh kaam karne ka mood nhi hota \nLekin uske baad bhi aap sab manage kar lete ho🫵💓\nAap unlogo me se ho jo bina show off kiye, bina fake bane, bas dil se saath dete ho\n\nAur ek baat..\nKabhi bhi apne aap ko underestimate mat kijiyega.\nAap lazy ho skte ho, thoda careless bhi kabhi kabhi lag sakte ho,\nBut your heart is genuinely beautiful💓\n\nStay happy forever… Happy Birthday! 💫\nThank you for everything 💖`;

  const el = document.getElementById("typingText");
  const container = el ? el.closest('.glass-box-full') : null;
  const continueBtn = document.getElementById("msgContinueBtn");
  if (!el || !continueBtn) return;
  
  continueBtn.disabled = true; 
  el.innerHTML = ""; 
  let index = 0;
  
  function type() {
    if (index < text.length) { 
      let char = text[index++];
      el.innerHTML += (char === '\n') ? '<br>' : char;
      
      // Text ke lambe hone par automatically glass box niche scroll hoga
      if (container && index % 4 === 0) {
        container.scrollTop = container.scrollHeight;
      }
      setTimeout(type, 35); // Fast seamless text rate loop
    } 
    else { 
      continueBtn.disabled = false; // Next active button click enable
      showHint("Message completed! Aap aage badh sakte hain 😅"); 
    }
  }
  type();
}

// 📸 Step 5 ke Polaroid cards par dynamically hover tilts implement karne ke liye
function setupPolaroidInteractions() {
  const cards = document.querySelectorAll(".polaroid");
  cards.forEach(card => {
    card.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease";
    
    card.addEventListener("mouseenter", () => {
      const randomTilt = (Math.random() * 8 - 4); // Random angle par rotate karne ke liye
      card.style.transform = `scale(1.08) rotate(${randomTilt}deg) translateY(-10px)`;
      card.style.zIndex = "100";
      card.style.boxShadow = "0 15px 35px rgba(0,0,0,0.5)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1) rotate(0deg) translateY(0)";
      card.style.zIndex = "1";
      card.style.boxShadow = "none";
    });
  });
}

// 📜 Shahi scroll ke paragraph formatting blocks prepare karne ke liye
function formatRoyalScrollParagraphs() {
  const scrollContent = document.querySelector(".scroll-content");
  if (!scrollContent) return;

  const paragraphs = scrollContent.querySelectorAll("p");
  paragraphs.forEach((p, index) => {
    p.style.opacity = "0";
    p.style.transform = "translateY(20px)";
    p.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
    p.style.marginBottom = "24px"; 
    p.style.borderBottom = "1px dashed rgba(138, 111, 39, 0.15)";
    p.style.paddingBottom = "12px";
  });
}

// 📜 Click karke Shahi फरमान (Royal Letter) niche ki taraf roll down unfold karne ke liye
function unfoldScroll() {
  const scrollContainer = document.querySelector(".royal-scroll-container");
  const scrollPaper = document.getElementById("royalPaper");
  const scrollContent = document.querySelector(".scroll-content");
  const hint = document.getElementById("scrollHint");
  
  if(!scrollContainer || !scrollPaper || !scrollContent) return;

  if(!scrollOpened) {
    scrollContainer.classList.add("unfolded");
    
    // Dynamic size mapping to open accurately based on contents height
    scrollPaper.style.height = "auto";
    scrollPaper.style.transition = "none"; 
    const fullHeight = scrollContent.scrollHeight;
    scrollPaper.style.height = "0px";
    
    void scrollPaper.offsetHeight; // Reflow reset mechanism
    scrollPaper.style.transition = "height 2.2s cubic-bezier(0.42, 0, 0.58, 1)";
    scrollPaper.style.height = (fullHeight + 20) + "px";

    if (hint) {
      hint.style.transition = "opacity 0.5s ease"; hint.style.opacity = "0";
      setTimeout(() => hint.remove(), 550);
    }
    
    scrollOpened = true;
    showHint("📜 Shahi farmaan khul chuka hai!");
    if (!scrollTypingStarted) {
      scrollTypingStarted = true;
      setTimeout(typeScrollMessage, 1500); // Roll khulne ke 1.5s baad scroll typing start
    }
  }
}

// ✍️ Royal scroll ke andar ka letter content dynamic type handle karne ke liye
function typeScrollMessage() {
  const scrollPara = document.querySelector(".scroll-content p");
  if (!scrollPara) return;

  const scrollText = `Happy Birthday 🎂✨aap officially aur ek saal or zyada pagal ho gayi😂\nLekin sach me... Thank you for being one of the sweetest people🌸\n\nMood swings, random fights, overthinking, sab tolerate karne ke liye medal milna chahiye aapko always available ke liye bhi🫣🏅\n\nAapke jaisa dost milna easy nhi hota. isliye chahte hai ki aap humesha smile karti raho, stress kam liya karo or life aapko utna hi khushi de jitna aap dusro ko happiness dete ho,\n\nKhud ka dhyaan rakha kajiye samjheeeee😤\n\npani piya karo jyada jisse body relax lagega🥤\nTime pe khana khaya karo jisse body me energy rhegi🍕\n\nStay happy always dear Mahila-Mitra💖✨`;
  
  scrollPara.innerHTML = "";
  scrollPara.style.opacity = "1";
  scrollPara.style.transform = "translateY(0)";
  
  let index = 0;
  
  function type() {
    if (index < scrollText.length) {
      let char = scrollText[index++];
      scrollPara.innerHTML += (char === '\n') ? '<br>' : char;
      setTimeout(type, 30); 
    }
  }
  type();
}

// 🚪 Main Exit Trigger: Website data, intervals safe close aur final screen reveal
function closeEntireWebsite() {
  const container = document.getElementById("mainContainer");
  const audio = document.getElementById("bgMusic");
  
  // Saare active looping loops clear karne ke liye (Performance Optimization)
  clearInterval(fireworksInterval);
  clearInterval(diwaliLightsInterval);
  clearInterval(bgGradientInterval); 
  clearInterval(watermarkInterval); 

  // Audio volume ko direct band na karke smoothly zero karne ke liye (Fade out)
  if (audio) {
    let fadeInterval = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume -= 0.05;
      } else {
        audio.pause();
        clearInterval(fadeInterval);
      }
    }, 100);
  }

  if (container) {
    container.style.opacity = "0";
    container.style.transform = "scale(0.9) translateY(-30px)";
    setTimeout(() => {
      container.innerHTML = `
        <div style="padding: 40px 20px; color: white; text-align: center;">
          <h1 style="font-family: 'Dancing Script', cursive; font-size: clamp(32px, 8vw, 48px); margin-bottom: 15px;">Thank you for being part of my life 💖</h1>
          <p style="opacity: 0.9; font-size: 16px; line-height: 1.6;">No matter how much time passes... some people always stay special.</p>
        </div>
      `;
      container.style.opacity = "1";
      container.style.transform = "scale(1) translateY(0)";
    }, 1000);
  }
}

// 🎈 Pure web layout par floating assets float down up continuous process
function startFloatingHearts() {
  const items = ["💖", "✨", "🌸", "🎈", "💕"];
  setInterval(() => {
    const container = document.getElementById("floating-hearts-container");
    if(!container) return;
    const el = document.createElement("div");
    el.className = "floating-heart";
    el.innerHTML = items[Math.floor(Math.random() * items.length)];
    el.style.left = Math.random() * 95 + "%"; 
    el.style.fontSize = (16 + Math.random() * 16) + "px";
    el.style.animationDuration = (4 + Math.random() * 5) + "s";
    container.appendChild(el);
    setTimeout(() => el.remove(), 8000); // 8 second baad elements remove
  }, 500);
}

// 📢 Screen top/bottom par custom status warnings notification popup dikhane ke liye
function showHint(text) {
  const box = document.getElementById("hintBox");
  if (!box) return;
  box.innerText = text; box.style.display = "block";
  if(window.hintTimeout) clearTimeout(window.hintTimeout);
  window.hintTimeout = setTimeout(() => { box.style.display = "none"; }, 2500);
}

// 🎆 Final step continuous high-speed background micro-firework triggers
function finalFireworks() {
  fireworksInterval = setInterval(() => {
    for (let i = 0; i < 8; i++) { 
      const f = document.createElement("div");
      f.style.position = "fixed"; f.style.width = "5px"; f.style.height = "5px"; f.style.borderRadius = "50%";
      f.style.left = (Math.random() * (window.innerWidth - 20) + 10) + "px"; 
      f.style.top = (Math.random() * (window.innerHeight - 40) + 20) + "px";
      f.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`; f.style.zIndex = "9999";
      document.body.appendChild(f);
      setTimeout(() => {
        f.style.transition = "1s ease-out"; f.style.transform = "scale(2.2)"; f.style.opacity = "0";
      }, 40);
      setTimeout(() => f.remove(), 1050);
    }
  }, 950);
}

// ==========================================
// PURE RANDOM SPIN GAME ENGINE
// ==========================================
function triggerSuhaniSpin() {
  const pool1 = ["Lazy🥱", "Unique Piece💎", "Careless🤪", "Cute Face🐼", "Nakhrebaaz💅"];
  const pool2 = ["Sleepy Queen👑", "Beautiful Heart💓", "Overthinker🧠", "Real Person💕", "Ghumakkar🚗"];
  const pool3 = ["Mahila Mitra🎀", "Limited Edition✨", "Dramebaaz🎭", "Best Friend🤝", "Superstar🌟"];

  const slot1 = document.getElementById("trait1");
  const slot2 = document.getElementById("trait2");
  const slot3 = document.getElementById("trait3");
  const spinBtn = document.getElementById("spinActionBtn");
  const nextBtn = document.getElementById("spinNextBtn");
  
  if(!slot1 || !slot2 || !slot3 || !spinBtn) return;

  spinBtn.disabled = true;
  spinBtn.innerText = "Shuffling... 🎰";
  
  slot1.parentElement.classList.add("slot-rolling");
  slot2.parentElement.classList.add("slot-rolling");
  slot3.parentElement.classList.add("slot-rolling");

  let counter = 0;
  let spinTimer = setInterval(() => {
    slot1.innerText = pool1[Math.floor(Math.random() * pool1.length)];
    slot2.innerText = pool2[Math.floor(Math.random() * pool2.length)];
    slot3.innerText = pool3[Math.floor(Math.random() * pool3.length)];
    counter++;

    if (counter > 18) {
      clearInterval(spinTimer);
      
      slot1.parentElement.classList.remove("slot-rolling");
      slot2.parentElement.classList.remove("slot-rolling");
      slot3.parentElement.classList.remove("slot-rolling");
      
      spinBtn.disabled = false;
      spinBtn.innerText = "Try Luck Again 🔄";

      const finalW1 = slot1.innerText;
      const finalW2 = slot2.innerText;
      const finalW3 = slot3.innerText;

      const isLuckyHit = Math.random() > 0.65; 
      const hasSweetTraits = finalW1.includes("Unique Piece") || finalW2.includes("Beautiful Heart") || finalW3.includes("Limited Edition");

      if (isLuckyHit || hasSweetTraits) {
        spinBtn.style.display = "none"; 
        if(nextBtn) nextBtn.style.display = "inline-block"; 
        
        showHint("🎰 Jackpots Unlocked! Perfect personality traits found!");
      } else {
        showHint("Oops! Try spinning again to fetch a better combo! 🔄");
      }
    }
  }, 90);
}

// COUPLING FUNCTION: Typewriter se fresh layout me Spin screen load karne ke liye
function activateSpinScreenOnly() {
  const step4 = document.getElementById("step4"); 
  if(step4) {
    step4.classList.remove("active");
    step4.style.display = "none";
  }

  const spinStep = document.getElementById("suhaniSpinStep");
  if(spinStep) {
    spinStep.classList.remove("hidden-step");
    spinStep.style.display = "block";
  }
}

// Clean Navigation: Spin Screen to Wishlist Capsule
function goToNextScreenAfterSpin() {
  const spinStepContainer = document.getElementById("suhaniSpinStep");
  if(spinStepContainer) {
    spinStepContainer.style.display = "none"; 
    spinStepContainer.classList.add("hidden-step");
  }
  
  const wishStep = document.getElementById("friendshipWishStep");
  if(wishStep) {
    wishStep.classList.remove("hidden-step");
    wishStep.style.display = "block";
  }
}

// ==========================================
// FRIENDSHIP WISHLIST CAPSULE LOGIC
// ==========================================
function toggleWishMessage(boxNumber) {
  const board = document.getElementById("wishBoardText");
  if(!board) return;

  const cb2 = document.getElementById("wish2");
  const cb3 = document.getElementById("wish3");

  if(boxNumber === 2) {
    if(cb2 && cb2.checked) {
      board.innerText = "🚗 Planning mode activated! Chaahe kitni baar bhi cancel ho jaye, ek trip toh banti hai boss!";
    } else {
      board.innerText = "Check the boxes above to lock our future goals! ✨";
    }
  } 
  else if(boxNumber === 3) {
    if(cb3 && cb3.checked) {
      board.innerText = "🍕 Treat Locked! Iska hisab rakh liya gaya hai website me, ab party deni hi padegi!";
    } else {
      board.innerText = "Check the boxes above to lock our future goals! ✨";
    }
  }
}

function triggerPinkyPromise() {
  const btn = document.getElementById("promiseBtn");
  const txt = document.getElementById("promiseStatusText");
  
  if(btn && txt) {
    txt.style.display = "block";
    btn.innerText = "🤝 Promise Locked Forever";
    btn.style.opacity = "0.7";
    btn.disabled = true;
    
    showHint("❤️ Promise registered in the database!");
  }
}

// Wishlist capsule ke button click karne par real memories trigger karne ke liye
function goToMemoriesFromWishlist() {
  const wishStep = document.getElementById("friendshipWishStep");
  if(wishStep) {
    wishStep.style.display = "none";
    wishStep.classList.add("hidden-step");
  }
  
  if(typeof nextStep === "function") {
    nextStep();
  }
}