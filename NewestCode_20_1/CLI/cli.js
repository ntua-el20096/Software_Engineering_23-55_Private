process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const axios = require('axios');
const yargs = require('yargs');
const fs = require('fs');
const FormData = require('form-data');


const baseURL = 'https://localhost:8765/energy/api';


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
    command: 'newtitles',
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
  .command({
    command: 'newakas',
    describe: 'Upload titleakas data',
    builder: (yargs) => {
      return yargs.option('filename', {
        describe: 'Path to the file containing titleakas data',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      try {
        const filename = argv.filename;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('truncated_title.akas', fs.createReadStream(filename), { filename });

        // Make the corresponding REST API call for titleakas
        const response = await axios.post(`${baseURL}/admin/upload/titleakas`, formData, {
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
  .command({
    command: 'newnames',
    describe: 'Upload namebasics data',
    builder: (yargs) => {
      return yargs.option('filename', {
        describe: 'Path to the file containing namebasics data',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      try {
        const filename = argv.filename;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('truncated_name.basics', fs.createReadStream(filename), { filename });

        // Make the corresponding REST API call for namebasics
        const response = await axios.post(`${baseURL}/admin/upload/namebasics`, formData, {
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
  .command({
    command: 'newcrew',
    describe: 'Upload titlecrew data',
    builder: (yargs) => {
      return yargs.option('filename', {
        describe: 'Path to the file containing titlecrew data',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      try {
        const filename = argv.filename;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('truncated_title.crew', fs.createReadStream(filename), { filename });

        // Make the corresponding REST API call for titlecrew
        const response = await axios.post(`${baseURL}/admin/upload/titlecrew`, formData, {
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
  .command({
    command: 'newepisode',
    describe: 'Upload titleepisode data',
    builder: (yargs) => {
      return yargs.option('filename', {
        describe: 'Path to the file containing titleepisode data',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      try {
        const filename = argv.filename;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('truncated_title.episode', fs.createReadStream(filename), { filename });

        // Make the corresponding REST API call for titleepisode
        const response = await axios.post(`${baseURL}/admin/upload/titleepisode`, formData, {
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
  .command({
    command: 'newprincipals',
    describe: 'Upload titleprincipals data',
    builder: (yargs) => {
      return yargs.option('filename', {
        describe: 'Path to the file containing titleprincipals data',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      try {
        const filename = argv.filename;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('truncated_title.principals', fs.createReadStream(filename), { filename });

        // Make the corresponding REST API call for titleprincipals
        const response = await axios.post(`${baseURL}/admin/upload/titleprincipals`, formData, {
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
  .command({
    command: 'newratings',
    describe: 'Upload titleratings data',
    builder: (yargs) => {
      return yargs.option('filename', {
        describe: 'Path to the file containing titleratings data',
        type: 'string',
        demandOption: true,
      });
    },
    handler: async (argv) => {
      try {
        const filename = argv.filename;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('truncated_title.ratings', fs.createReadStream(filename), { filename });

        // Make the corresponding REST API call for titleratings
        const response = await axios.post(`${baseURL}/admin/upload/titleratings`, formData, {
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
