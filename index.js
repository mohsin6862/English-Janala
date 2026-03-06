const displaySynonyms=(arr)=>{
    const createElement = arr.map(el => `<span class="btn ">${el}</span>`)
    return createElement.join(' ');
}

// listening function 
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
// console.log('i am from index.js files');
const loadLesson=()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res=>res.json())
    .then(data => displayLesson(data.data))
}

const removeActive=()=>{
    const allActiveBtn = document.querySelectorAll('.lesson-btn');
    // console.log(allActiveBtn);
    allActiveBtn.forEach(btn=>btn.classList.remove('active'))

}


const showSpiner = (status)=>{

    if(status==true){
        document.getElementById('spiner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');

    }
    else{
        document.getElementById('spiner').classList.add('hidden');
        document.getElementById('word-container').classList.remove('hidden');
    }

}

const loadWord=(id)=>{
    showSpiner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        removeActive();
        const lessonBtn = document.getElementById(`lesson-btn${id}`)
       
        // console.log(lessonBtn);
        lessonBtn.classList.add('active')

         displayWord(data.data)
    })
}

const displayLesson = (lessons) =>{
    const lessonContainer = document.getElementById('lesson-container')
    lessonContainer.innerHTML="";
    lessons.forEach(lesson => {
        
        const allLession = document.createElement('div');
        allLession.innerHTML=`
         <button id="lesson-btn${lesson.level_no}"  onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
               <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no} 
            </button>
        `
        lessonContainer.appendChild(allLession);
        
    });

}
 

// word details open as modal 

const openModal = async(id)=>{
    console.log(id)
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayDetails(details.data)
    // console.log(details.data);
}

const displayDetails=(details)=>{
    // console.log(details)
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML=''
    const wordDetails = document.createElement('div')
    wordDetails.innerHTML=`
    <h3 class="text-3xl font-bold">${details.word} (<i class="fa-solid fa-microphone-lines"></i>: ${details.pronunciation})</h3>
    <p class="pt-4 text-xl font-semibold">Meaning</p>
    <p class="pt-2 text-xl font-bangla font-medium">${details.meaning}</p>
    <p class="pt-4 text-xl font-semibold">Example</p>
    <p class="pt-2 text-lg  font-light italic">${details.sentence}</p>
    <p class="py-4 text-xl font-bangla font-semibold">Synonyms</p>
 
    <div class="pb-8">
    ${displaySynonyms(details.synonyms)}
    </div>
    <button class="btn btn-primary py-5">Complete Learning</button>
    `;
    modalContainer.appendChild(wordDetails)
    my_modal_5.showModal()

}

const displayWord =(words)=>{
    // console.log(words)
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML="";
      if (words.length === 0) {
    wordContainer.innerHTML = `
    <div class="col-span-full text-center py-10 space-y-6">
    <img class="mx-auto" src="./assets/alert-error.png" alt="">
    <p class="text-xxl font-semibold  col-span-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।  </p>
    <h4 class="text-4xl font-bold">নেক্সট Lesson এ যান </h4>
    </div>
    `;
     showSpiner(false)
    return;
  }
    words.forEach(word => {
        // console.log(word);
        const allWord = document.createElement('div');
        allWord.innerHTML=`
        <div class="bg-white p-10  rounded-lg text-center space-y-4 ">
                <h1 class="font-bold text-2xl">${word.word ? word.word : "No word found"}</h1>
                <p>Meaning / Pronounciation</p>
                <h4 class="font-bangla text-xl font-semibold">"${word.meaning ? word.meaning : 'No meaning found'} / ${word.pronunciation ? word.pronunciation:"No Pronounciation found"}"</h4>
                <div class="flex justify-between ">
                <button  id="modal-btn" onclick="openModal(${word.id})" class="btn  bg-[#1A91FF20] text-[#374957] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF20] text-[#374957] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `
        wordContainer.appendChild(allWord);
        showSpiner(false);
    })
}

document.getElementById('search-btn').addEventListener('click',()=>{
    removeActive()
    const input = document.getElementById('input-text');
    const searchWord = input.value.trim().toLowerCase() 
    console.log(searchWord)

    const url ='https://openapi.programming-hero.com/api/words/all'
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const allWord = data.data;
        // console.log(allWord)
        const filterWord = allWord.filter((word)=>word.word.toLowerCase().includes(searchWord));
        console.log(filterWord);
        displayWord(filterWord);
    })
})


loadLesson();