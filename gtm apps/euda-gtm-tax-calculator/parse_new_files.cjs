const XLSX = require('xlsx');

// Parse Sources
const sourcesWorkbook = XLSX.readFile('Spain_Government_Spending_Sources.xlsx');
const sourcesSheet = sourcesWorkbook.Sheets[sourcesWorkbook.SheetNames[0]];
const sources = XLSX.utils.sheet_to_json(sourcesSheet);
console.log('=== SOURCES ===');
console.log(JSON.stringify(sources, null, 2));

// Parse Tax Rules
const taxWorkbook = XLSX.readFile('Spain_Raw_Tax_and_Social_Security_Info.xlsx');
taxWorkbook.SheetNames.forEach(sheetName => {
    const sheet = taxWorkbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log(`\n=== ${sheetName} ===`);
    console.log(JSON.stringify(data, null, 2));
});
