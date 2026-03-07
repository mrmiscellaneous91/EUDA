const XLSX = require('xlsx');
const workbook = XLSX.readFile('Spain_Government_Spending_2024.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);
console.log(JSON.stringify(data.slice(0, 5), null, 2));
