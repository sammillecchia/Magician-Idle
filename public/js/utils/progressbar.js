//getElementByIds

//TODO: Add text functionality, showing time until timer completes
//updates a progress bars width to match the progress
export function updateProgressBar(progress, bar) {
  //Idk about text rn as it should be time eg; seconds/minutes until timer is up
  bar.style.width = `${progress}%`;

}


//updates a given circles width and height to match the progress
export function updateProgressCircle(progress, circle) {
  if (circle) {
    // console.log(progress);
  circle.style.width = `${progress}%`;
  circle.style.height = `${progress}%`;
  } else {
    console.log('no circle')
  }
}






//unused?, s
export function updateProgressBar2(timeInSeconds, barFill, textElement, doFunction, prog) {
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