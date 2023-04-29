class Countdown {
    constructor(el){
      this.el = el;
      this.targetDate = new Date(el.getAttribute("date-time"));
      this.createCountDownParts()
      this.countdownFunction();
      this.countdownLoopId = setInterval(this.countdownFunction.bind(this), 1000)
    }
    createCountDownParts(){
      ["days", "hours", "minutes", "seconds"].forEach(part => {
        const partEl = document.createElement("div");
        partEl.classList.add("part", part);
        const textEl = document.createElement("div");
        textEl.classList.add("text");
        textEl.innerText = part;
        const numberEl = document.createElement("div");
        numberEl.classList.add("number");
        numberEl.innerText = 0;
        partEl.append(numberEl, textEl);
        this.el.append(partEl);
        this[part] = numberEl;
      })
    }
  
  countdownFunction(){
      const currentDate = new Date();
      const datesToSkip = ['2023-04-30', '2023-05-1', '2023-05-07', '2023-05-14','2023-05-20', '2023-05-21', '2023-05-28', '2023-06-4', '2023-06-11', '2023-06-14', '2023-06-18', '2023-06-24', '2023-06-25', '2023-06-26', '2023-06-27', '2023-07-2', ];
    console.log(new Date)
      if(currentDate > this.targetDate) return clearInterval(this.intervalId);
      let remaining = this.getRemaining(this.targetDate, currentDate);
      let skippedDates = 0;
      datesToSkip.forEach(date => {
        if (new Date(date) >= currentDate && new Date(date) < this.targetDate) {
          skippedDates++;
        }
      });
      remaining.days -= skippedDates;
      if (remaining.days < 0) {
        return clearInterval(this.intervalId);
      }
      Object.entries(remaining).forEach(([part,value]) => {
        this[part].style.setProperty("--value", value)
        this[part].innerText = value
      })  
    }
  
    
    getRemaining(target, now){
      let seconds = Math.floor((target - (now))/1000);
      let minutes = Math.floor(seconds/60);
      let hours = Math.floor(minutes/60);
      let days = Math.floor(hours/24);
      hours = hours-(days*24);
      minutes = minutes-(days*24*60)-(hours*60);
      seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
      return { days, hours, minutes, seconds }      
    }
  
  }
  
  const countdownEls= document.querySelectorAll(".countdown") || [];
  countdownEls.forEach(countdownEl => new Countdown(countdownEl))
  