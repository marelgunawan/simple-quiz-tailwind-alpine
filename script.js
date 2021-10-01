document.addEventListener('alpine:init', () => {
      Alpine.data('quiz', () => ({
            datas: [
                  {
                        id: 1,
                        question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, cupiditate 1.",
                        answer: [
                              "Lorem ipsum dolor sit amet A.",
                              "Lorem ipsum dolor sit amet B.",
                              "Lorem ipsum dolor sit amet C.",
                              "Lorem ipsum dolor sit amet D.",
                        ],
                        correct: 1,
                        random: true
                  },
                  {
                        id: 2,
                        question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, cupiditate 2.",
                        answer: [
                              "Lorem ipsum dolor sit amet A.",
                              "Lorem ipsum dolor sit amet B.",
                              "Lorem ipsum dolor sit amet C.",
                              "Lorem ipsum dolor sit amet D.",
                        ],
                        correct: 2,
                        random: false
                  },
                  {
                        id: 3,
                        question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, cupiditate 3.",
                        answer: [
                              "Lorem ipsum dolor sit amet A.",
                              "Lorem ipsum dolor sit amet B.",
                              "Lorem ipsum dolor sit amet C.",
                              "Lorem ipsum dolor sit amet D.",
                        ],
                        correct: 3,
                        random: false
                  },
                  {
                        id: 4,
                        question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, cupiditate 4.",
                        answer: [
                              "Lorem ipsum dolor sit amet A.",
                              "Lorem ipsum dolor sit amet B.",
                              "Lorem ipsum dolor sit amet C.",
                              "Lorem ipsum dolor sit amet D.",
                        ],
                        correct: 0,
                        random: false
                  },
                  {
                        id: 5,
                        question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, cupiditate 5.",
                        answer: [
                              "Lorem ipsum dolor sit amet A.",
                              "Lorem ipsum dolor sit amet B.",
                              "Lorem ipsum dolor sit amet C.",
                              "Lorem ipsum dolor sit amet D.",
                        ],
                        correct: 1,
                        random: false
                  },
            ],
            record: [],
            answer: "",
            activeQuest: 0,
            init() {
                  // Load record on localstorage
                  if(localStorage.getItem('recordQuiz')) this.record = JSON.parse(localStorage.getItem('recordQuiz'))

                  this.setAnswer()
            },
            selectAnswer(answer){
                  let idQuest = this.datas[this.activeQuest].id
                  // If data on record has idQuest
                  if(this.record.find(e => e.idQuest == idQuest)) {
                        // Change answer with correct answer user
                        this.record.forEach(e => {
                              if(e.idQuest == idQuest) e.answer = answer
                        }) 
                  }else {
                        // If nothing data on record var
                        this.record.push({idQuest, answer: this.answer})
                  }
                  this.saveRecord()
            },
            saveRecord() {
                  // Save to localstorage
                  localStorage.setItem('recordQuiz', JSON.stringify(this.record))
            },
            nextQuest(){
                  if(this.activeQuest < (this.datas.length - 1)) this.activeQuest++

                  this.setAnswer()
            },
            prevQuest(){
                  if(this.activeQuest > 0) this.activeQuest--

                  this.setAnswer()
            },
            setAnswer() {
                  let idQuest = this.datas[this.activeQuest].id
                  let history = this.record.find(e => e.idQuest == idQuest)
                  
                  this.answer = (history == undefined) ? "" : history.answer
            },
            submit() {
                  if(this.record.length < this.datas.length) alert('Please complate all question.')
                  else this.validateQuiz()
            },
            validateQuiz() {
                  let correctPoint = 0
                  this.datas.forEach((e, i) => {
                        if(e.correct == this.record.find(r => r.idQuest == e.id).answer)
                              correctPoint++
                  })

                  alert((100 / this.datas.length) * correctPoint)
            },
      }))
})