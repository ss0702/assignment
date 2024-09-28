const chemicalData = [
    {"id": 1, "chemical_name": "Ammonium Persulfate", "vendor": "LG Chem", "density": 3525.92, "viscosity": 60.63, "packaging": "Bag", "pack_size": "100.00", "unit": "kg", "quantity": 6495.18},
    {"id": 2, "chemical_name": "Caustic Potash", "vendor": "Formosa", "density": 3172.15, "viscosity": 48.22, "packaging": "Bag", "pack_size": 100.00, "unit": "kg", "quantity": 8751.90},
    {"id": 3, "chemical_name": "Dimethylaminopropylamino", "vendor": "LG Chem", "density": 8435.37, "viscosity": 12.62, "packaging": "Barrel", "pack_size": 75.00, "unit": "L", "quantity": 5964.61},
    {"id": 4, "chemical_name": "Mono Ammonium Phosphate", "vendor": "Sinopec", "density": 1597.65, "viscosity": 76.51, "packaging": "Bag", "pack_size": 105.00, "unit": "kg", "quantity": 8183.73},
    {"id": 5, "chemical_name": "Ferric Nitrate", "vendor": "DowDuPont", "density": 364.04, "viscosity": 14.90, "packaging": "Bag", "pack_size": 105.00, "unit": "kg", "quantity": 4154.33},
    {"id": 6, "chemical_name": "n-Pentane", "vendor": "Sinopec", "density": 4535.26, "viscosity": 66.76, "packaging": "N/A", "pack_size": "N/A", "unit": "t", "quantity": 6272.34},
    {"id": 7, "chemical_name": "Glycol Ether PM", "vendor": "LG Chem", "density": 6495.18, "viscosity": 72.12, "packaging": "Bag", "pack_size": 250.00, "unit": "kg", "quantity": 8749.54}
];

let selectedRow = null;
let sortDirection = true; // true for ascending, false for descending

function populateTable() {
    const tableBody = document.getElementById("table-body");
    let rows = '';
    chemicalData.forEach(item => {
        rows += `<tr onclick="selectRow(this)">
            <td>${item.id}</td>
            <td>${item.chemical_name}</td>
            <td>${item.vendor}</td>
            <td>${item.density}</td>
            <td>${item.viscosity}</td>
            <td>${item.packaging}</td>
            <td>${item.pack_size}</td>
            <td>${item.unit}</td>
            <td>${item.quantity}</td>
        </tr>`;
    });
    tableBody.innerHTML = rows;
}

function sortTable(columnIndex) {
    sortDirection = !sortDirection;
    chemicalData.sort((a, b) => {
        let keyA = Object.values(a)[columnIndex];
        let keyB = Object.values(b)[columnIndex];
        if (typeof keyA === 'string') {
            return sortDirection ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA);
        } else {
            return sortDirection ? keyA - keyB : keyB - keyA;
        }
    });
    populateTable();
}

function selectRow(row) {
    if (selectedRow) {
        selectedRow.classList.remove('table-active');
    }
    selectedRow = row;
    selectedRow.classList.add('table-active');
}

function addRow() {
    const newRow = {
        "id": chemicalData.length + 1,
        "chemical_name": "New Chemical",
        "vendor": "New Vendor",
        "density": 0,
        "viscosity": 0,
        "packaging": "New Packaging",
        "pack_size": "0",
        "unit": "N/A",
        "quantity": 0
    };
    chemicalData.push(newRow);
    populateTable();
}

function moveRowUp() {
    if (!selectedRow) return alert("Select a row to move");
    const index = Array.from(selectedRow.parentElement.children).indexOf(selectedRow);
    if (index > 0) {
        const temp = chemicalData[index - 1];
        chemicalData[index - 1] = chemicalData[index];
        chemicalData[index] = temp;
        populateTable();
        selectRow(document.getElementById("table-body").children[index - 1]);
    }
}

function moveRowDown() {
    if (!selectedRow) return alert("Select a row to move");
    const index = Array.from(selectedRow.parentElement.children).indexOf(selectedRow);
    if (index < chemicalData.length - 1) {
        const temp = chemicalData[index + 1];
        chemicalData[index + 1] = chemicalData[index];
        chemicalData[index] = temp;
        populateTable();
        selectRow(document.getElementById("table-body").children[index + 1]);
    }
}

function deleteRow() {
    if (!selectedRow) return alert("Select a row to delete");
    const index = Array.from(selectedRow.parentElement.children).indexOf(selectedRow);
    chemicalData.splice(index, 1);
    populateTable();
    selectedRow = null;
}

function refreshData() {
    selectedRow = null;
    populateTable();
}

function saveData() {
    console.log("Data saved:", JSON.stringify(chemicalData));
    alert("Data saved to console. Check console log.");
}

window.onload = populateTable;