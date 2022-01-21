document.getElementById("start").addEventListener("click",
  function () {
    for (i = 0; i < document.getElementsByClassName("invis").length; i++) {
      document.getElementsByClassName("invis")[i].style.display = "none"
    }
    document.getElementById("chosensort").style.display = "none"
    document.getElementById("difficulty").style.display = "none"
    document.getElementById("start").style.display = "none"
    let timemultiplier
    if (document.getElementById("difficulty").value == "easy") {
      timemultiplier = 1
    } else {
      timemultiplier = 0.7
    }
    console.log(timemultiplier)
    for (i = 0; i < document.getElementsByClassName("numberholder").length; i++) {
      listener(i);
      document.getElementsByClassName("numberholder")[i].style.position = "absolute";
      document.getElementsByClassName("numberholder")[i].style.left = `${i * 30}px`;
      document.getElementsByClassName("numberholder")[i].style.top = `5px`;
      document.getElementsByClassName("numberholder")[i].style.height = `${i * 2 + 40}px`;
      document.getElementsByClassName("numberholder")[i].style.backgroundColor = `rgb(200,${i * 10},${i * 27})`;
      if (document.getElementById("difficulty").value == "hard") {
        document.getElementsByClassName("numberholder")[i].innerText = `${(Math.floor(Math.random() * 10)) + (10 * i)}`
      }

    }
    for (i = 0; i < document.getElementsByClassName("botnumberholder").length; i++) {

      document.getElementsByClassName("botnumberholder")[i].style.position = "absolute";
      document.getElementsByClassName("botnumberholder")[i].style.left = `${i * 30}px`;
      document.getElementsByClassName("botnumberholder")[i].style.top = `${300 + i * 2}px`;
      document.getElementsByClassName("botnumberholder")[i].style.height = `${i * 2 + 40}px`;

      document.getElementsByClassName("botnumberholder")[i].style.backgroundColor = `rgb(${i * 4},${i * 15 + 100},${i * 10})`;
    }
    let sorted = false;
    let orderarray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let botarray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    orderarray = shuffle(orderarray);
    botarray = shuffle(botarray)
    arraytopos(orderarray)
    botarraytopos(botarray)
    function listener(i) {
      document.getElementsByClassName("numberholder")[i].addEventListener("click", () => {
        if (document.getElementsByClassName("selected").length == 0 && sorted == false) {
          document.getElementsByClassName("numberholder")[i].className = "numberholder selected"
        } else {
          for (t = 0; t < document.getElementsByClassName("selected").length; t++) {
            let left = 10 * Number(document.getElementsByClassName("selected")[t].style.left.substring(0, document.getElementsByClassName("selected")[t].style.left.indexOf("p") - 1));
            console.log(left)
            // console.log(left % 30)
            document.getElementsByClassName("selected")[t].style.left = `${left - (left % 30)}px`;

            document.getElementsByClassName("selected")[t].style.top = "5px";
            let index = orderarray.indexOf(Number(document.getElementsByClassName("selected")[t].id));
            if (index > -1) {
              orderarray.splice(index, 1);
            }
            orderarray.splice(((left) - ((left) % 30)) / 30, 0, Number(document.getElementsByClassName("selected")[t].id));
            console.log(orderarray)
            console.log(((left) - ((left) % 30)) / 30)
            arraytopos(orderarray)
            if (is_sorted(orderarray)) {
              sorted = true
              document.getElementById("sorted").innerText = "sorted"
              document.getElementById("sorted").style.color = "green"
              alert("You Won!")

            }
            document.getElementsByClassName("selected")[t].className = "numberholder"

          }
        }
      })
    }

    document.addEventListener("mousemove", function (ev) {
      if (document.getElementsByClassName("selected").length != 0) {
        document.getElementsByClassName("selected")[0].style.position = "absolute";
        document.getElementsByClassName("selected")[0].style.top = `${ev.clientY-100}px`;
        document.getElementsByClassName("selected")[0].style.left = `${ev.clientX}px`;

      }
    })

    function arraytopos(orderarray) {
      for (q = 1; q < orderarray.length + 1; q++) {
        document.getElementById(`${q}`).style.left = `${orderarray.indexOf(q) * 30}px`
      }
    }
    function botarraytopos(array) {
      if (sorted == false) {
        for (q = 1; q < array.length + 1; q++) {
          if (array.indexOf(q) != -1) {
            document.getElementById(`b${q}`).style.left = `${array.indexOf(q) * 30}px`
          }
        }
      }
    }
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    function is_sorted(arr) {
      var len = arr.length - 1;
      for (var i = 0; i < len; ++i) {
        if (arr[i] > arr[i + 1]) {
          return false;
        }
      }


      return true;
    }

    let time = 0
    function timeloop() {
      setTimeout(function () {
        document.getElementById("time").innerText = `${time} seconds`
        time += 0.1
        time = Math.ceil(time * 10) / 10
        if (sorted == false) {
          timeloop();
        }

      }, 100)
    }

    timeloop();
    console.log(document.getElementById("chosensort").value)
    if (document.getElementById("chosensort").value == "bubblesort") {
      bubble(botarray)
    } else if (document.getElementById("chosensort").value == "mergesort") {
      mergesort(botarray)
    } else if (document.getElementById("chosensort").value == "insertionsort") {
      insertionSort(botarray)
    } else if (document.getElementById("chosensort").value == "selectionsort") {
      Selection_Sort(botarray, function (a, b) { return a - b; })
    } else if (document.getElementById("chosensort").value == "heapsort") {
      heapSort(botarray)
    } else if (document.getElementById("chosensort").value == "shellsort") {
      shellSort(botarray)
    } else if (document.getElementById("chosensort").value == "bogosort") {
      bogoSort(botarray)
    } else if (document.getElementById("chosensort").value == "gnomesort") {
      gnome(botarray)
    } else if (document.getElementById("chosensort").value == "oddevensort") {
      oddEvenSort(botarray)
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function bubble(arr) {
      var len = arr.length;

      for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - i - 1; j++) { // this was missing
          if (arr[j] > arr[j + 1]) {
            if (sorted != false) {
              return null
            }
            // swap
            await sleep(1000 * timemultiplier)
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            console.log("sorting....")
            botarraytopos(arr)
          }
        }
      }
      if (sorted == false) {
        sorted = true;
        alert("The Sorting Algorithm won!")
      }
    }
    async function insertionSort(unsortedList) {
      var len = unsortedList.length;
      for (var i = 0; i < len + 1; i++) {
        var tmp = unsortedList[i]; //Copy of the current element.
        await sleep(300 * timemultiplier)
        /*Check through the sorted part and compare with the number in tmp. If large, shift the number*/
        for (var j = i - 1; j >= 0 && (unsortedList[j] > tmp); j--) {
          //Shift the number
          unsortedList[j + 1] = unsortedList[j];
          await sleep(900 * timemultiplier)
          console.log(botarray)
          botarraytopos(unsortedList)
        }
        //Insert the copied number at the correct position
        //in sorted part.
        unsortedList[j + 1] = tmp;
      }
      botarray = [...new Set(botarray)];
      botarraytopos(unsortedList)
      if (sorted == false) {
        sorted = true;

        alert("The Sorting Algorithm won!")
      }

    }
    async function Selection_Sort(arr, compare_Function) {

      function compare(a, b) {
        return a - b;
      }
      var min = 0;
      var index = 0;
      var temp = 0;

      //{Function} compare_Function Compare function
      compare_Function = compare_Function || compare;

      for (var i = 0; i < arr.length; i += 1) {
        index = i;
        min = arr[i];
        await sleep(500 * timemultiplier)
        botarraytopos(arr)

        for (var j = i + 1; j < arr.length; j += 1) {
          if (compare_Function(min, arr[j]) > 0) {
            await sleep(500 * timemultiplier)
            botarraytopos(arr)
            min = arr[j];
            index = j;
          }
        }

        temp = arr[i];
        arr[i] = min;
        arr[index] = temp;
      }

      //return sorted arr
      if (sorted == false) {
        botarraytopos(arr)
        sorted = true;
        alert("The Sorting Algorithm won!")
      }
    }
    var array_length;
    /* to create MAX  array */
    async function heap_root(input, i) {
      var left = 2 * i + 1;
      var right = 2 * i + 2;
      var max = i;

      if (left < array_length && input[left] > input[max]) {
        max = left;
      }

      if (right < array_length && input[right] > input[max]) {
        max = right;
      }

      if (max != i) {
        swap(input, i, max);
        heap_root(input, max);
      }
    }

    function swap(input, index_A, index_B) {
      var temp = input[index_A];

      input[index_A] = input[index_B];
      input[index_B] = temp;
    }

    async function heapSort(input) {

      array_length = input.length;

      for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
        heap_root(input, i);
        await sleep(1000 * timemultiplier)
        botarraytopos(input)
      }

      for (i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        array_length--;
        botarraytopos(input)
        await sleep(1000 * timemultiplier)


        heap_root(input, 0);
      }
      if (sorted == false) {
        sorted = true;
        alert("The Sorting Algorithm won!")
      }
    }
    async function shellSort(arr) {
      var increment = arr.length / 2;
      while (increment > 0) {
        for (i = increment; i < arr.length; i++) {
          var j = i;
          var temp = arr[i];
          botarraytopos(arr)
          await sleep(500 * timemultiplier)
          while (j >= increment && arr[j - increment] > temp) {
            arr[j] = arr[j - increment];
            j = j - increment;
            botarraytopos(arr)
            await sleep(500 * timemultiplier)
          }

          arr[j] = temp;
        }

        if (increment == 2) {
          increment = 1;
        } else {
          increment = parseInt(increment * 5 / 11);
        }
      }
      if (sorted == false) {
        sorted = true;
        alert("The Sorting Algorithm won!")
      }
    }
    async function bogoSort(arr) {
      for (i = 0; i < 3000000000; i++) {
        console.log(i)
        shuffle(arr)
        await sleep(1)
        botarraytopos(arr)
        if (is_sorted(arr)) {

          sorted = true
          alert("The Sorting Algorithm won!")
          break
        }
      }
    }

    async function gnome(arr) {

      const l = arr.length;

      let i = 1;

      while (i < l) {
        await sleep(600 * timemultiplier)
        botarraytopos(arr)

        if (i > 0 && (arr[i - 1] > arr[i])) {

          [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];

          i--;


        } else {

          i++;


        }

      }

      if (sorted == false) {
        sorted = true;
        alert("The Sorting Algorithm won!")

      }

    };
    async function oddEvenSort(list) {
      function swap(list, i, j) {
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
      }

      var oddsorted = false;
      while (!oddsorted) {
        oddsorted = true;
        for (var i = 1; i < list.length - 1; i += 2) {
          if (list[i] > list[i + 1]) {
            swap(list, i, i + 1);
            oddsorted = false;
            botarraytopos(list)
            await sleep(400 * timemultiplier)
          }
        }
        for (var i = 0; i < list.length - 1; i += 2) {
          if (list[i] > list[i + 1]) {
            swap(list, i, i + 1);
            oddsorted = false;
            botarraytopos(list)
            await sleep(400 * timemultiplier)
          }
        }
        botarraytopos(list)
        await sleep(400 * timemultiplier)
      }
      if (sorted == false) {
        sorted = true;
        alert("The Sorting Algorithm won!")

      }

    }








  }
)

document.getElementById("chosensort").addEventListener("change", () => {
  getDescription(document.getElementById("chosensort").value)
})

async function getDescription(algorithm) {
  return new Promise((resolve, reject) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "description.json", true);
    rawFile.onload = () => {
      console.log(rawFile.responseText)
      parsed = JSON.parse(rawFile.responseText)
      console.log(parsed)
      console.log(algorithm)
      console.log(parsed[algorithm])
      document.getElementById("descriptionholder").innerText = parsed[algorithm]
      resolve(parsed[algorithm])
    }
    rawFile.send(null);
  })
}
async function displayword(algorithm) {

  if (await getDescription(algorithm)) {
    alert(`${await getDescription(algorithm)}`)
  }

}


document.getElementById("help").addEventListener("click",()=>{
  document.getElementById("helpbox").style.display = "block"

})
document.getElementById("helpbox").addEventListener("click", ()=>{
  document.getElementById("helpbox").style.display = "none"

  })