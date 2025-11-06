// Event listeners
document.querySelector("form").addEventListener("input", validateInput);

document.querySelector("form").addEventListener("submit", generateTable);
document.addEventListener("DOMContentLoaded", generateTable);

function validateInput(e) {
  if (e) e.preventDefault();

  // Initialize validity flag
  let valid = true;

  // Get the values of the input fields
  const minColStr = document.getElementById('minCol').value;
  const maxColStr = document.getElementById('maxCol').value;
  const minRowStr = document.getElementById('minRow').value;
  const maxRowStr = document.getElementById('maxRow').value;

  // Reset all errors
  document.getElementById('errorMinCol').textContent = '';
  document.getElementById('errorMaxCol').textContent = '';
  document.getElementById('errorMinRow').textContent = '';
  document.getElementById('errorMaxRow').textContent = '';

  // Check if the values are empty
  if (minColStr === '') {
    document.getElementById('errorMinCol').textContent = 'Value is required';
    valid = false;
  }
  if (maxColStr === '') {
    document.getElementById('errorMaxCol').textContent = 'Value is required';
    valid = false;
  }
  if (minRowStr === '') {
    document.getElementById('errorMinRow').textContent = 'Value is required';
    valid = false;
  }
  if (maxRowStr === '') {
    document.getElementById('errorMaxRow').textContent = 'Value is required';
    valid = false;
  }

  // Convert the values to numbers
  const minCol = Number(minColStr);
  const maxCol = Number(maxColStr);
  const minRow = Number(minRowStr);
  const maxRow = Number(maxRowStr);

  // Column checks
  if (minCol > maxCol) {
    document.getElementById('errorMinCol').textContent = 'Min column must be ≤ max column';
    valid = false;
  }
  if (minCol < -50 || minCol > 50) {
    document.getElementById('errorMinCol').textContent = 'Value must be between -50 and 50';
    valid = false;
  }
  if (maxCol < -50 || maxCol > 50) {
    document.getElementById('errorMaxCol').textContent = 'Value must be between -50 and 50';
    valid = false;
  }
  if (!Number.isInteger(minCol)) {
    document.getElementById('errorMinCol').textContent = 'Value must be an integer';
    valid = false;
  }
  if (!Number.isInteger(maxCol)) {
    document.getElementById('errorMaxCol').textContent = 'Value must be an integer';
    valid = false;
  }

  // Row checks
  if (minRow > maxRow) {
    document.getElementById('errorMinRow').textContent = 'Min row must be ≤ max row';
    valid = false;
  }
  if (minRow < -50 || minRow > 50) {
    document.getElementById('errorMinRow').textContent = 'Value must be between -50 and 50';
    valid = false;
  }
  if (maxRow < -50 || maxRow > 50) {
    document.getElementById('errorMaxRow').textContent = 'Value must be between -50 and 50';
    valid = false;
  }
  if (!Number.isInteger(minRow)) {
    document.getElementById('errorMinRow').textContent = 'Value must be an integer';
    valid = false;
  }
  if (!Number.isInteger(maxRow)) {
    document.getElementById('errorMaxRow').textContent = 'Value must be an integer';
    valid = false;
  }

  // Enable/disable submit button based on validity
  document.getElementById('submit').disabled = !valid;
}

function generateTable(e) {
    if (e) e.preventDefault();

    // Get the values of the input fields
    const minCol = parseInt(document.getElementById('minCol').value);
    const maxCol = parseInt(document.getElementById('maxCol').value);
    const minRow = parseInt(document.getElementById('minRow').value);
    const maxRow = parseInt(document.getElementById('maxRow').value);

    // Clear the table
    const container = document.getElementsByClassName('table')[0];
    container.innerHTML = "";

    // Create the table
    const table = document.createElement("table");

    // Create the body of the table
    const tbody = document.createElement("tbody");
    const headerRow = document.createElement("tr");

    // Create the header row
    for (let i = minCol; i <= maxCol; i++) {
        if (i === minCol) {
            const topLeft = document.createElement("th");
            topLeft.classList.add("topLeft");
            headerRow.appendChild(topLeft);
        }
        const th = document.createElement("th");
        th.classList.add("header-cell");
        th.textContent = i;
        headerRow.appendChild(th);
    }

    // Append the header row to the body
    tbody.appendChild(headerRow);

    // Create the rows of the table
    for (let r = minRow; r <= maxRow; r++) {
        const row = document.createElement("tr");
        for (let c = minCol; c <= maxCol; c++) {
            if (c === minCol) {
                // Create the vertical header cell
                const rowValues = document.createElement("th");
                rowValues.classList.add("vertical-header-cell");
                rowValues.textContent = r;
                row.append(rowValues);
            }
            // Create the cell
            const cell = document.createElement("td");
            cell.textContent = r * c;
            row.appendChild(cell);
        }
        // Append the row to the body
        tbody.appendChild(row);
    }

    // Append the body to the table
    table.appendChild(tbody);
    container.appendChild(table);
}