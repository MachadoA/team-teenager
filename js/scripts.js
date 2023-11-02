const dateToday = document.getElementById('dateToday');
const readings = document.querySelector('#readingToDay');
const information = document.querySelector('#information');
const copyBtn = document.getElementById('copyBtn');
const textShowup = document.getElementById('textShowup');
const whatsappBtn = document.getElementById('whatsappBtn');
const container = document.querySelector('.container');


const date = new Date();
const dateSettings = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formatDate = date.toLocaleDateString('pt-BR',dateSettings);
//console.log(formatDate)

dateToday.textContent = formatDate

function readingsDay(day) {
  const startDate = new Date(2023, 9, 19); // considere este como dia 1
  const diferencaEmDias = Math.floor((day - startDate) / (24 * 60 * 60 * 1000));
  return diferencaEmDias;
}

fetch('/js/joaoteen.json')
  .then(response => response.json())
  .then(data => {
    // console.log(data)
    const idToday = readingsDay(date);
    const readingsToDay = data.find(item => item.id === idToday);
   

    if (readingsToDay) {
        readings.innerHTML = readingsToDay.read
    } else {
      readings.innerHTML = 'Nenhuma leitura encontrada para hoje'
    }
  })
  .catch(error => {
    console.error('Erro ao carregar o arquivo JSON:', error);
  });

copyBtn.addEventListener('click', () => {

    information.focus();
    const informationContent = information.textContent;
    console.log(informationContent);

    navigator.clipboard.writeText(informationContent).then(() => {
      textShowup.style.display = 'block';
      container.classList.add('active');

      setTimeout(() => {
        textShowup.style.display = 'none';
        container.classList.remove('active');
      },15000)
    }).catch((error) => {
        console.error('Erro ao copiar o conteúdo:', error);
    });
})

whatsappBtn.addEventListener('click', () => {
  const informationContent = information.textContent;
  const encodedText = encodeURIComponent(informationContent)
  var url = `https://api.whatsapp.com/send?text=${encodedText}`
  window.open(url, "_blank");
})





