import './css/styles.css';

function updateHTMLResults(results) {
  // Отримуємо доступ до елементів за їх id
  const maxNumberElement = document.getElementById('maxNumber');
  const minNumberElement = document.getElementById('minNumber');
  const averageElement = document.getElementById('average');
  const medianElement = document.getElementById('median');
  const increasingSequenceElement =
    document.getElementById('increasingSequence');
  const decreasingSequenceElement =
    document.getElementById('decreasingSequence');

  // Оновлюємо значення елементів з отриманими результатами
  maxNumberElement.insertAdjacentText('beforeend', `${results.maxNumber}`);
  minNumberElement.insertAdjacentText('beforeend', ` ${results.minNumber}`);
  averageElement.insertAdjacentText('beforeend', ` ${results.average}`);
  medianElement.insertAdjacentText('beforeend', `${results.median}`);
  increasingSequenceElement.insertAdjacentText(
    'beforeend',
    ` ${results.increasingSequence.join(', ')}`
  );
  decreasingSequenceElement.insertAdjacentText(
    'beforeend',
    `${results.decreasingSequence.join(', ')}`
  );
}

// Функція для завантаження файлу та перетворення даних в масив
function processFile(inputFile) {
  const fileReader = new FileReader();

  fileReader.onload = function (event) {
    const data = event.target.result; //список чисел з файлу
    // console.log(data);
    arrayConversion(data);
  };

  fileReader.onerror = function (event) {
    console.error('Помилка при читанні файлу:', event.target.error);
  };

  // Завантажуємо файл
  fileReader.readAsText(inputFile);
}

// Доступ до файлу

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', handleFiles, false);

function handleFiles() {
  const fileList = this.files;
  console.log(fileList);
  if (fileList) {
    processFile(fileList[0]);
  }
}

function arrayConversion(data) {
  // console.log(data);
  console.log(typeof data === 'string');
  let dataArray;
  if (typeof data === 'string') {
    // Видаляємо прбіли та перенесення рядків, потім разбиваємо по комам або перенесенням рядків
    dataArray = data.split(/[,;\n.]/).map(Number); // Перетворюємо список чисел в масив чисел
  } else if (Array.isArray(data)) {
    // якщо data вже є массивом, перетворюєм його елементи в числа
    dataArray = data.map(Number);
  } else {
    console.error('Непідтримуємий формат даних.');
  }
  calculateValues(dataArray);

  return dataArray;
}

// Розрахунок шуканих величин
function calculateValues(dataArray) {
  const sortedArray = dataArray.slice().sort((a, b) => a - b); // сортуємо масив від найменшого до найбільшого

  const minNumber = sortedArray[0];
  console.log(minNumber);
  const maxNumber = sortedArray[sortedArray.length - 1];
  console.log(maxNumber);

  //знаходимо середнє арифметичне

  const sum = dataArray.reduce((acc, num) => acc + num, 0);
  const average = sum / dataArray.length;
  console.log(average);

  // знаходимо медіану

  const middleIndex = sortedArray.length / 2;
  const median =
    sortedArray.length % 2 === 0
      ? (sortedArray[middleIndex - 1] + sortedArray[middleIndex]) / 2
      : sortedArray[middleIndex];
  console.log(median);

  const results = {
    maxNumber,
    minNumber,
    average,
    median,
    increasingSequence: findLongestSequence(dataArray, true),
    decreasingSequence: findLongestSequence(dataArray, false),
  };

  updateHTMLResults(results);

  return results;
}

// Найдовша найдовгішу  послідовність

function findLongestSequence(arr, increasing = true) {
  let longestSequence = [];
  let currentSequence = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    if (
      (increasing && arr[i] > arr[i - 1]) ||
      (!increasing && arr[i] < arr[i - 1])
    ) {
      // If the current number satisfies the condition, add it to the current sequence
      currentSequence.push(arr[i]);
    } else {
      // Otherwise, compare the current sequence with the longest sequence
      if (currentSequence.length > longestSequence.length) {
        longestSequence = currentSequence.slice();
      }
      // Start a new current sequence
      currentSequence = [arr[i]];
    }
  }

  // Check the last current sequence
  if (currentSequence.length > longestSequence.length) {
    longestSequence = currentSequence;
  }

  // console.log(longestSequence);
  return longestSequence;
}
