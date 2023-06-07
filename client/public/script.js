


const fetchDataFromBackend = () => {
  try {
    fetch('http://localhost:8000/api/data')
      .then(response => response.json())
      .then(data => {
        console.log('Data received from backend:', data);

        let tableData = '';
        data.forEach((item, index) => {
          tableData += `
            <tr>
              <td class="align-middle"><h4 class="table-text">${index + 1}</h4></td>
              <td class="align-middle">
                <a target="_blank" href="">
                  <h4 class="table-text">
                   
                    <span class="exchange-name">${item.name}</span>
                  </h4>
                </a>
              </td>
              <td class="align-middle"><h4 class="table-text">₹${item.last}</h4></td>
              <td class="align-middle">
                <h4 class="table-text">
                  <span>₹${item.buy} </span>/ <span>₹${item.sell} </span>
                </h4>
              </td>
              <td class="align-middle"><h4 class="table-text color-green">▲${item.volume}</h4></td>
              <td class="align-middle"><h4 class="table-text color-green"> ${item.base_unit}</h4></td>
            </tr>
          `;
        });

        document.getElementById("table_body").innerHTML = tableData;
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
      });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call the function to fetch data from the backend
fetchDataFromBackend();
function countdown() {
  var endDate = new Date("2023-12-31T23:59:59").getTime();

  var timer = setInterval(function() {
    var now = new Date().getTime();
    var distance = endDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").textContent = seconds;

    if (distance < 0) {
      clearInterval(timer);
      document.getElementById("timer").textContent = "EXPIRED";
    }
  }, 1000);
}

countdown();

