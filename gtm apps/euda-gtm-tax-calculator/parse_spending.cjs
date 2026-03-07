const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const workbook = XLSX.readFile('Spain_Government_Spending_2024.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

const categories = {};

data.forEach((row) => {
    const categoryName = row.Category;
    const subcategoryName = row.Subcategory;
    const percentage = parseFloat(row.Percent_of_Total_Spending) / 100; // Convert to decimal

    if (!categoryName) return;

    if (!categories[categoryName]) {
        categories[categoryName] = {
            name: categoryName,
            percentage: 0,
            subcategories: []
        };
    }

    if (subcategoryName === 'Total') {
        categories[categoryName].percentage = percentage;
    } else {
        categories[categoryName].subcategories.push({
            name: subcategoryName,
            percentage: percentage
        });
    }
});

fs.writeFileSync(
    path.join(__dirname, 'src/lib/spendingData.json'),
    JSON.stringify(Object.values(categories), null, 2)
);

console.log('Spending data converted and saved to src/lib/spendingData.json');
