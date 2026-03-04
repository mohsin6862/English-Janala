// console.log('i am from index.js files');
const loadLesson=()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res=>res.json())
    .then(data => displayLesson(data.data))
}

const loadWord=(id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayWord(data.data))
}

const displayLesson = (lessons) =>{
    const lessonContainer = document.getElementById('lesson-container')
    lessonContainer.innerHTML="";
    lessons.forEach(lesson => {
        
        const allLession = document.createElement('div');
        allLession.innerHTML=`
         <button onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary">
               <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no} 
            </button>
        `
        lessonContainer.appendChild(allLession);
        
    });

}

const displayWord =(words)=>{
    // console.log(words)
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML="";
      if (words.length === 0) {
    wordContainer.innerHTML = `<p class="text-2xl font-semibold text-center col-span-3">No words found!! </br> </br> please got next lesson</p>`;
    return;
  }
    words.forEach(word => {
        // console.log(word);
        const allWord = document.createElement('div');
        allWord.innerHTML=`
        <div class="bg-white p-8 rounded-lg text-center space-y-4 ">
                <h1 class="font-bold text-2xl">${word.word}</h1>
                <p>Meaning / Pronounciation</p>
                <h4 class="font-bangla text-xl font-semibold">"${word.meaning} / ${word.pronunciation}"</h4>
            </div>
        `
        wordContainer.appendChild(allWord);
    })
}


loadLesson();