const axios = require('axios');
const fs = require('fs');

const numRows = 10;
const apiUrl = 'https://api.mockaroo.com/api/generate.json'; 
const apiKey = 'd12a0ef0'; 

const schema = {
    fields: [
        { name: 'ID', type: 'GUID' },
        { name: 'Name', type: 'First Name' },
        { name: 'Email', type: 'Email Address' },
        { name: 'Phone', type: 'Phone', format: '+# ### ### ####'},
        { name: 'City', type: 'Custom List', values: ['Pune', 'Delhi', 'Mumbai'] },
        { name: 'Arrived', type: 'Datetime', start_date: '01-12-2024', end_date: '01-12-2030' }
    ],
    count: numRows
};

axios.get(apiUrl, {
    params: {
        key: apiKey,
        fields: JSON.stringify(schema.fields), 
        count: schema.count
    }
})
.then(response => {
 
    let csvData = '';
    csvData += Object.keys(response.data[0]).join(',') + '\n'; 
    response.data.forEach(record => {
        csvData += Object.values(record).join(',') + '\n';
    });

    fs.writeFile('dataa.csv', csvData, (err) => {
        if (err) throw err;
        console.log('Detail created successfully!');
    });
})
.catch(error => {
    console.error('Error fetching data from Mockaroo:', error);
});
