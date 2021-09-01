  const els = {    
    s: initElements('s'),
    m: initElements('m'),
    h: initElements('h'),
    d: initElements('d'),
  }

  let flag = []

  function initElements(type) {
       
    const els = [{}];
    
    if (!['s', 'm', 'h', 'd'].includes(type)) return els;

    const target = document.querySelector(`.flip-time-${type}`);

    if (!target) return els;

    let el;

    el = els;    
    el.number = target.querySelector('.number');    
    el.card = el.number.querySelector('.card');
    el.cardFaces = el.card.querySelectorAll('.card-face');
    el.cardFaceA = el.cardFaces[0];
    el.cardFaceB = el.cardFaces[1];

    
   
    return els;
  }


function runCountdown() {
    console.log(flag)
    if (!document.hidden) {
        const date = new Date("September 01, 2021 22:00:00").getTime()    
        const now = new Date().getTime()                
        const difference = date - now

       if (date <= now) {
        clearInterval(timerID)
        alert('Time has expired')
        return
       }

        const seconds = 1000
        const minutes = seconds * 60
        const hours = minutes * 60
        const days = hours * 24

        let secondsLeft = Math.floor((difference % minutes) / seconds)
        let minutesLeft = Math.floor((difference % hours) / minutes)
        let hoursLeft = Math.floor((difference % days) / hours)
        let daysLeft = Math.floor(difference / days)

      let values = {

        d: daysLeft, 
        h: hoursLeft,
        m: minutesLeft,
        s: secondsLeft

      }
      
      
      values.d = values.d < 10 ? `0${values.d}` : `${values.d}`
      values.h = values.h < 10 ? `0${values.h}` : `${values.h}`
      values.m = values.m < 10 ? `0${values.m}` : `${values.m}`
      values.s = values.s < 10 ? `0${values.s}` : `${values.s}`

     
      console.log(`${values.d}:${values.h}:${values.m}:${values.s}`)
      
     

      for (const t of Object.keys(els)) {
        
          const curr = values[`${t}`];         
          let next = +curr - 1;

          if (t === 'd') {            
                if (next < 0 ) { 
                    next = '00'
                    flag[0] = true
                } else if (next < 10) {
                    next = `0${next}`
                }
          }
          if (t === 'h') {
                if (next < 0) {
                    if (flag[0]) {
                        flag[1] = true
                        next = '00'
                    } else {
                        next = '23'
                    }
                    flag ? next = '00' : next = '23'
                } else if (next < 10) {
                    next = `0${next}`
                } 
          }
          if (t === 'm') {           
                if (next < 0 ) {
                    if (flag[1]) {
                        flag[2] = true
                        next = '00'                        
                    } else {
                        next = '59'
                    }                    
                } else if (next < 10) {
                    next = `0${next}`
                }
                 
          }
          if (t === 's') {            
                if (next < 0 ) { 
                    if (flag[2]) {
                        flag[3] = true
                        next = '00'                      
                        
                    }  else {
                        next = '59'
                    } 
                } else if (next < 10) {
                    next = `0${next}`
                } 
                
          }
          const el = els[t];
          if (el && el.number) {
            
            if (!el.number.dataset.numberBefore) {               
              el.number.dataset.numberBefore = curr;
              el.cardFaceA.textContent = el.number.dataset.numberBefore;
            
              el.number.dataset.numberAfter = next;
              el.cardFaceB.textContent = el.number.dataset.numberAfter;
            
            } else if (el.number.dataset.numberBefore !== curr) {                
                el.card.addEventListener('transitionend', function () {
                el.number.dataset.numberBefore = curr;
                el.cardFaceA.textContent = el.number.dataset.numberBefore;
            
                const cardClone = el.card.cloneNode(true);
                cardClone.classList.remove('flipped');
                el.number.replaceChild(cardClone, el.card);
                el.card = cardClone;
                el.cardFaces = el.card.querySelectorAll('.card-face');
                el.cardFaceA = el.cardFaces[0];
                el.cardFaceB = el.cardFaces[1];

                el.number.dataset.numberAfter = next;
                el.cardFaceB.textContent = el.number.dataset.numberAfter;                

              }, { once: true });
              if (!el.card.classList.contains('flipped')) {
                el.card.classList.add('flipped');
              }
            } //End else if
          } // End if (el && el.number)
        } //End of Loop
     
    } //End if(!document.hidden)

    
    
}   

const timerID = setInterval(runCountdown, 1000);
    


 
        