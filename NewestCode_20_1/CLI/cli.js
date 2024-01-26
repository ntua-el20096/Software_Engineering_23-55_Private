process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const axios = require('axios');
const yargs = require('yargs');
const fs = require('fs');
const FormData = require('form-data');

const baseURL = 'https://localhost:8765/energy/api';

// Define the CLI commands
yargs
  .command({
    command: 'resetall',
    describe: 'Reset all data on the server',
    handler: async (argv) => {
      try {
        // Make the corresponding REST API call
        const response = await axios.post(`${baseURL}/admin/resetall`, {});

        // Output the response based on the specified format
        if (argv.format && argv.format.toLowerCase() === 'csv') {
          // Handle CSV format
          console.log('CSV format not supported for this endpoint');
        } else {
          // Default to JSON format
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'healthcheck',
    describe: 'Perform a health check on the server',
    handler: async (argv) => {
      try {
        // Make the corresponding REST API call for healthcheck
        const response = await axios.get(`${baseURL}/admin/healthcheck`);

        // Output the response based on the specified format
        if (argv.format && argv.format.toLowerCase() === 'csv') {
          // Handle CSV format
          console.log('CSV format not supported for this endpoint');
        } else {
          // Default to JSON format
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .command({
    command: 'titlebasics',
    describe: 'Upload titlebasics data',
    builder: (yargs) => {
      return yargs.option('filename', {
        describe: 'Path to the file containing titlebasics data',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      try {
        const filename = argv.filename;
  
        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('truncated_title.basics', fs.createReadStream(filename), { filename });

        // Make the corresponding REST API call for titlebasics
        const response = await axios.post(`${baseURL}/admin/upload/titlebasics`, formData, {
          headers: {
            ...formData.getHeaders(),
          },
        });
  
        // Output the response based on the specified format
        if (argv.format && argv.format.toLowerCase() === 'csv') {
          // Handle CSV format
          console.log('CSV format not supported for this endpoint');
        } else {
          // Default to JSON format
          console.log(JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  })
  .option('format', {
    describe: 'Output format (json or csv)',
    type: 'string',
  })
  .parse();
