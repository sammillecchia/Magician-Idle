export default function updateProgressBar(timeInSeconds, barFill, textElement, doFunction, prog) {
    let progress = prog;
    
    //This works for now, probably should rewrite this later when I want it to work with minutes/hours!
    if (progress <= 100) {
    let temp = timeInSeconds - Math.trunc(progress * (timeInSeconds / 10)) / 10;
    textElement.textContent = `${Math.trunc(temp * 10) / 10}s`; 
    barFill.style.width = `${progress}%`;
    progress++;

    setTimeout(() => updateProgressBar(timeInSeconds, barFill, textElement, doFunction, progress), timeInSeconds * 10);
  } else {
    progress = 0;
    textElement.textContent = `${Math.trunc(timeInSeconds * 100) / 100}s`; 
    barFill.style.width = `${progress}%`;
    doFunction();
  }
}