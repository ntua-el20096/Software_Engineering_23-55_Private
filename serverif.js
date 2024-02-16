//afro
// Define an endpoint handler for /searchtitle
app.get(`${baseURL}/searchtitle`, async (req, res) => {
  const titlePart = req.body.titlePart; // Extract titlePart from query parameters
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'csv')
      return res.status(400).send(converter.csv2json(response));
    return res.status(400).json(response); // Bad Request: No file uploaded
  } //checks that it has a file in the body

  if (!titlePart) {
    if(format === "json"){
      return res.status(400).json({ status: 'failed', message: 'titlePart is required' });
    }
    else{
      res.status(400).send(converter.json2csv({status: 'failed', message: 'titlePart is required'}));
    }
  }

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  try {
    const query = `SELECT tb.title_id AS titleID, 
    tb.title_type AS type, 
    tb.title_originalTitle AS originalTitle, 
    tb.title_posterURL AS titlePoster, 
    tb.title_startYear AS startYear, 
    tb.title_endYear AS endYear, 
    tb.title_genre AS genres,
    tr.rating_avg AS avRating,
    tr.rating_numVotes AS nVotes
  FROM title_basics tb
  LEFT JOIN title_ratings tr ON tb.title_id = tr.title_title_id 
  WHERE tb.title_originalTitle LIKE ?`;
  const likeTitlePart = `%${titlePart}%`; // SQL LIKE query format

  const [titleResult] = await connection.promise().query(query,likeTitlePart);
  var titleObjectList = [];
  for (var i = 0; i < titleResult.length; i++) {
    var titleObject = titleResult[i];
    titleObject.genres = titleObject.genres.split(',').map(genre => ({ genreTitle: genre.trim() }));
    const akasQuery = `SELECT aka_title AS akaTitle, AKA_region AS regionAbbrev FROM title_AKAs WHERE title_title_id = ?`;
    const [akasResult] = await connection.promise().query(akasQuery, [titleObject.titleID]);
    titleObject.titleAkas = akasResult;
    const principalsQuery = `
      SELECT 
          np.principal_id AS nameID, 
          np.principal_name AS name, 
          tp.principal_category AS category
      FROM title_principals tp
      JOIN principal np ON tp.principal_principal_id = np.principal_id
      INNER JOIN title_basics tb ON tp.title_title_id = tb.title_id
      WHERE tb.title_id = ?`;
  const [principalsResult] = await connection.promise().query(principalsQuery, [titleObject.titleID]);
  titleObject.principals = principalsResult;
  titleObjectList.push(titleObject);
  }
  
  if(format === "json"){
    res.status(200).json({titleObjectList}); // Success: Data uploaded successfully
  }
  else{
    res.status(200).send(converter.json2csv({titleObjectList }));
  }
  }
  catch {
    console.error('Database error:', error);
    if(format === "json"){
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
      else{
        res.status(500).send(converter.json2csv({ message: 'Internal server error', error: error.message }));
      }
   
  }
  finally {
    connection.end();
  }

});
app.post(`${baseURL}/searchtitle`, async (req, res) => {
  const titlePart = req.body.titlePart; // Extract titlePart from query parameters
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'csv')
      return res.status(400).send(converter.csv2json(response));
    return res.status(400).json(response); // Bad Request: No file uploaded
  } //checks that it has a file in the body

  if (!titlePart) {
    if(format === "json"){
      return res.status(400).json({ status: 'failed', message: 'titlePart is required' });
    }
    else{
      res.status(400).send( {status: 'failed', message: 'titlePart is required'});
    }
  }

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  try {
    const query = `SELECT tb.title_id AS titleID, 
    tb.title_type AS type, 
    tb.title_originalTitle AS originalTitle, 
    tb.title_posterURL AS titlePoster, 
    tb.title_startYear AS startYear, 
    tb.title_endYear AS endYear, 
    tb.title_genre AS genres,
    tr.rating_avg AS avRating,
    tr.rating_numVotes AS nVotes
  FROM title_basics tb
  LEFT JOIN title_ratings tr ON tb.title_id = tr.title_title_id 
  WHERE tb.title_originalTitle LIKE ?`;
  const likeTitlePart = `%${titlePart}%`; // SQL LIKE query format

  const [titleResult] = await connection.promise().query(query,likeTitlePart);
  var titleObjectList = [];
  for (var i = 0; i < titleResult.length; i++) {
    var titleObject = titleResult[i];
    titleObject.genres = titleObject.genres.split(',').map(genre => ({ genreTitle: genre.trim() }));
    const akasQuery = `SELECT aka_title AS akaTitle, AKA_region AS regionAbbrev FROM title_AKAs WHERE title_title_id = ?`;
    const [akasResult] = await connection.promise().query(akasQuery, [titleObject.titleID]);
    titleObject.titleAkas = akasResult;
    const principalsQuery = `
      SELECT 
          np.principal_id AS nameID, 
          np.principal_name AS name, 
          tp.principal_category AS category
      FROM title_principals tp
      JOIN principal np ON tp.principal_principal_id = np.principal_id
      INNER JOIN title_basics tb ON tp.title_title_id = tb.title_id
      WHERE tb.title_id = ?`;
  const [principalsResult] = await connection.promise().query(principalsQuery, [titleObject.titleID]);
  titleObject.principals = principalsResult;
  titleObjectList.push(titleObject);
  }
  
    if(format === "json"){
      res.status(200).json({titleObjectList});
    }
    else{
      res.status(200).send(converter.json2csv({titleObjectList}));
    }
  }

  catch {
    console.error('Database error:', error);
    if(format === "json"){
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
    else{
      res.status(500).send(converter.json2csv({ message: 'Internal server error', error: error.message }));
    }
  }
  finally {
    connection.end();
  }

});
app.get(`${baseURL}/bygenre`, async (req, res) => {
  const { qgenre, minrating, yrFrom, yrTo } = req.body;
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'csv')
      return res.status(400).send(converter.csv2json(response));
    return res.status(400).json(response); // Bad Request: No file uploaded
  } //checks that it has a file in the body

  // Start building the query
  let query = `
      SELECT 
          tb.title_id AS titleID, 
          tb.title_type AS type, 
          tb.title_originalTitle AS originalTitle, 
          tb.title_posterURL AS titlePoster, 
          tb.title_startYear AS startYear, 
          tb.title_endYear AS endYear, 
          tb.title_genre AS genres,
          tr.rating_avg AS avRating
      FROM title_basics tb
      LEFT JOIN title_ratings tr ON tb.title_id = tr.title_title_id
      WHERE tb.title_genre LIKE ? AND tr.rating_avg >= ?
  `;

  const queryParams = [`%${qgenre}%`, minrating];

  // Add year range conditions if provided
  if (yrFrom) {
      query += ` AND tb.title_startYear >= ?`;
      queryParams.push(yrFrom);
  }
  if (yrTo) {
      query += ` AND tb.title_startYear <= ?`;
      queryParams.push(yrTo);
  }

  try {
      // Establish a connection to the database
      const connection = mysql.createConnection(databaseConfig);

      // Execute the query
      const [results] = await connection.promise().query(query, queryParams);
  var titleObjectList = [];
  for (var i = 0; i < results.length; i++) {
    var titleObject = results[i];
    titleObject.genres = titleObject.genres.split(',').map(genre => ({ genreTitle: genre.trim() }));
    let akasQuery = `SELECT 
      aka_title AS akaTitle,
      AKA_region AS regionAbbrev 
      FROM title_AKAs 
      WHERE title_title_id = ?`;
    const [akasResult] = await connection.promise().query(akasQuery, [titleObject.titleID]);
    titleObject.titleAkas = akasResult;
    let principalsQuery = `
      SELECT 
          np.principal_id AS nameID, 
          np.principal_name AS name, 
          tp.principal_category AS category
      FROM title_principals tp
      JOIN principal np ON tp.principal_principal_id = np.principal_id
      WHERE tp.title_title_id = ?`;
  const [principalsResult] = await connection.promise().query(principalsQuery, [titleObject.titleID]);
  titleObject.principals = principalsResult;
  titleObjectList.push(titleObject);
  }
    if(format === "json"){
      res.status(200).json({titleObjectList});
    }
    else{
      res.status(200).send(converter.json2csv({titleObjectList}));
    }

    // Close the database connection
    connection.end();
  } catch (error) {
      console.error('Database error:', error);
      if(format === "json"){
        res.status(500).json({ message: 'Internal server error', error: error.message });
      }
      else{
        res.status(500).send(converter.json2csv({ message: 'Internal server error', error: error.message}));
      }
  }
});



app.post(`${baseURL}/bygenre`, async (req, res) => {
  const { qgenre, minrating, yrFrom, yrTo } = req.body;
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'csv')
      return res.status(400).send(converter.csv2json(response));
    return res.status(400).json(response); // Bad Request: No file uploaded
  } //checks that it has a file in the body

  // Start building the query
  let query = `
      SELECT 
          tb.title_id AS titleID, 
          tb.title_type AS type, 
          tb.title_originalTitle AS originalTitle, 
          tb.title_posterURL AS titlePoster, 
          tb.title_startYear AS startYear, 
          tb.title_endYear AS endYear, 
          tb.title_genre AS genres,
          tr.rating_avg AS avRating
      FROM title_basics tb
      LEFT JOIN title_ratings tr ON tb.title_id = tr.title_title_id
      WHERE tb.title_genre LIKE ? AND tr.rating_avg >= ?
  `;

  const queryParams = [`%${qgenre}%`, minrating];

  // Add year range conditions if provided
  if (yrFrom) {
      query += ` AND tb.title_startYear >= ?`;
      queryParams.push(yrFrom);
  }
  if (yrTo) {
      query += ` AND tb.title_startYear <= ?`;
      queryParams.push(yrTo);
  }

  try {
      // Establish a connection to the database
      const connection = mysql.createConnection(databaseConfig);

      // Execute the query
      const [results] = await connection.promise().query(query, queryParams);
  var titleObjectList = [];
  for (var i = 0; i < results.length; i++) {
    var titleObject = results[i];
    titleObject.genres = titleObject.genres.split(',').map(genre => ({ genreTitle: genre.trim() }));
    let akasQuery = `SELECT 
      aka_title AS akaTitle,
      AKA_region AS regionAbbrev 
      FROM title_AKAs 
      WHERE title_title_id = ?`;
    const [akasResult] = await connection.promise().query(akasQuery, [titleObject.titleID]);
    titleObject.titleAkas = akasResult;
    let principalsQuery = `
      SELECT 
          np.principal_id AS nameID, 
          np.principal_name AS name, 
          tp.principal_category AS category
      FROM title_principals tp
      JOIN principal np ON tp.principal_principal_id = np.principal_id
      WHERE tp.title_title_id = ?`;
  const [principalsResult] = await connection.promise().query(principalsQuery, [titleObject.titleID]);
  titleObject.principals = principalsResult;
  titleObjectList.push(titleObject);
  }
    if(format === "json"){
      res.status(200).json({titleObjectList});
    }
    else{
      res.status(200).send(converter.json2csv({titleObjectList}));
    }

    // Close the database connection
    connection.end();
  } catch (error) {
    console.error('Database error:', error);
    if(format === "json"){
      res.status(500).json({
        message: 'Internal server error',
        error: error.message,
        titleObjectList: []
      });
    }
    else{
      res.status(500).send(converter.json2csv({ 
        message: 'Internal server error',
        error: error.message,
        titleObjectList: []
      }));
    }
  }
});
//afro















app.get(`${baseURL}/name/:nameID`, async (req, res) => {
  const nameID = req.params.nameID;
  
  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'csv')
      return res.status(400).send(converter.json2csv(response));
    return res.status(400).json(response); // Bad Request: No file uploaded
  } 

  // Establish a connection to the database
  const connection = mysql.createConnection(databaseConfig);

  try {
      // Query to fetch data for the nameObject
      const nameQuery = `
          SELECT 
              np.principal_id AS nameID, 
              np.principal_name AS name, 
              np.principal_imageURL AS namePoster, 
              np.principal_birthYr AS birthYr, 
              np.principal_deathYr AS deathYr, 
              np.principal_profession AS profession
          FROM principal np
          WHERE np.principal_id = ?`;

      // Execute the query for name details
      const [nameResult] = await connection.promise().query(nameQuery, [nameID]);

      if (!nameResult.length) {

        if(format === "json"){
          return res.status(404).json({ message: 'Name not found' });
           }
          
            else{
              return res.status(404).send(converter.json2csv({ message: 'Name not found' })) ;
            }
           
      }

      const nameObject = nameResult[0];

      // Fetch nameTitles
      const titlesQuery = `
          SELECT 
              tp.title_title_id AS titleID, 
              tp.principal_category AS category
          FROM title_principals tp
          WHERE tp.principal_principal_id = ?`;
      const [titlesResult] = await connection.promise().query(titlesQuery, [nameID]);
      nameObject.nameTitles = titlesResult;

      // Return the nameObject

      if(format === "json"){
        res.status(200).json({ nameObject });}
        else{
          res.status(200).send(converter.json2csv({ nameObject })) ;
        }
 
  } catch (error) {
      console.error('Database error:', error);

      if(format === "json"){
        res.status(500).json({ message: 'Internal server error', error: error.message });}
        else{
          res.status(500).send(converter.json2csv({ message: 'Internal server error', error: error.message }));
        }

       
  } finally {
      // Close the database connection
      connection.end();
  }
});

// Define an endpoint handler for /searchname
app.get(`${baseURL}/searchname`, async (req, res) => {
  const namePart = req.body.namePart; // Extract namePart from query parameters
  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'csv')
      return res.status(400).send(converter.json2csv(response));
    return res.status(400).json(response); // Bad Request: No file uploaded
  } 

  if (!namePart) {
    if(format === "json"){
       
      return res.status(400).json({ status: 'failed', message: 'namePart is required' });}
      
        else{
          return res.status(400).send(converter.json2csv({ status: 'failed', message: 'namePart is required' })) ;
        }

     
  }

  const connection = mysql.createConnection(databaseConfig);

  try {
    const query = `SELECT 
    np.principal_id AS nameID, 
    np.principal_name AS name, 
    np.principal_imageURL AS namePoster, 
    np.principal_birthYr AS birthYr, 
    np.principal_deathYr AS deathYr, 
    np.principal_profession AS profession
    FROM principal np
    WHERE np.principal_name LIKE ?`;
    const likenamePart = `%${namePart}%`; // SQL LIKE query format

    const [nameResult] = await connection.promise().query(query, [likenamePart]);

    if (!nameResult.length) {
      if(format === "json"){
       
      return res.status(404).json({ message: 'No match found'});}
      
        else{
          return res.status(404).send(converter.json2csv({ message: 'No match found'})) ;
        }
    }

    var nameObjectList = [];
    for (var i = 0; i < nameResult.length; i++) {
      var nameObject = nameResult[i];
      const titlesQuery = `
          SELECT 
              tp.title_title_id AS titleID, 
              tp.principal_category AS category
          FROM title_principals tp
          WHERE tp.principal_principal_id = ?`;
      const [titlesResult] = await connection.promise().query(titlesQuery, [nameObject.nameID]);
      nameObject.nameTitles = titlesResult;
      nameObjectList.push(nameObject);
    }    

    if(format === "json"){
      res.status(200).json({ nameObjectList });}
      else{
        res.status(200).send(converter.json2csv({ nameObjectList })) ;
      }
   

  } catch (error) {
    console.error('Database error:', error);
    if(format === "json"){
      res.status(500).json({ message: 'Internal server error', error: error.message });}
      else{
        res.status(500).send(converter.json2csv({ message: 'Internal server error', error: error.message }));
      }
    
  } finally {
    connection.end();
  }
  
});

app.post(`${baseURL}/searchname`, async (req, res) => {
  const namePart = req.body.namePart; // Extract namePart from query parameters
  
  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'csv')
      return res.status(400).send(converter.json2csv(response));
    return res.status(400).json(response); // Bad Request: No file uploaded
  } 


  if (!namePart) {

    if(format === "json"){
       
      return res.status(400).json({ status: 'failed', message: 'namePart is required' });}
      
        else{
          return res.status(400).send(converter.json2csv({ status: 'failed', message: 'namePart is required' })) ;
        }
     
  }

  const connection = mysql.createConnection(databaseConfig);

  try {
    const query = `SELECT 
    np.principal_id AS nameID, 
    np.principal_name AS name, 
    np.principal_imageURL AS namePoster, 
    np.principal_birthYr AS birthYr, 
    np.principal_deathYr AS deathYr, 
    np.principal_profession AS profession
    FROM principal np
    WHERE np.principal_name LIKE ?`;
    const likenamePart = `%${namePart}%`; // SQL LIKE query format

    const [nameResult] = await connection.promise().query(query, [likenamePart]);

    if (!nameResult.length) {
      if(format === "json"){
       
        return res.status(404).json({ message: 'No match found'});}
        
          else{
            return res.status(404).send(converter.json2csv({ message: 'No match found'})) ;
          }
       
    }

    var nameObjectList = [];
    for (var i = 0; i < nameResult.length; i++) {
      var nameObject = nameResult[i];
      const titlesQuery = `
          SELECT 
              tp.title_title_id AS titleID, 
              tp.principal_category AS category
          FROM title_principals tp
          WHERE tp.principal_principal_id = ?`;
      const [titlesResult] = await connection.promise().query(titlesQuery, [nameObject.nameID]);
      nameObject.nameTitles = titlesResult;
      nameObjectList.push(nameObject);
    }    
 
    if(format === "json"){
      res.status(200).json({ nameObjectList });}
      else{
        res.status(200).send(converter.json2csv({ nameObjectList })) ;
      }
   
  } catch (error) {
    //console.error('Database error:', error);
    if(format === "json"){
      res.status(500).json({ message: 'Internal server error', error: error.message });}
      else{
        res.status(500).send(converter.json2csv({ message: 'Internal server error', error: error.message }));
      }
     
  } finally {
    connection.end();
  }
  
});

// Define an endpoint handler for /admin/resetall
app.post(`${baseURL}/admin/resetall`, async (req, res) => {
  let format = req.query.format || 'json';

  if(!(format === 'json' || format === 'csv')) {
    const message = { message: 'Invalid format parameter! format should be json or csv', error: err ? err : '' };
    return res.status(400).send(message);
}
  if (!fileData) {
    const response = {
      status: 'failed',
      message: 'No file uploaded'
    };
    if (format === 'csv')
      return res.status(400).send(converter.json2csv(response));
    return res.status(400).json(response); // Bad Request: No file uploaded
  } //checks that it has a file in the body

  
  try {
    // Reset data in each table
    
    await resetTable('title_episode');
    await resetTable('title_crew');
    await resetTable('title_akas');
    await resetTable('title_principals');
    await resetTable('principal');
    await resetTable('title_ratings');
    await resetTable('title_basics');
    

    // For demonstration purposes, let's assume resetting is successful
    const response = {
      status: 'OK',
    };
    if(format === "json"){
    res.status(200).json(response);}
    else{
      res.status(200).send(converter.json2csv(response));
    }
  } catch (error) {
    // If an error occurs during the reset operation
    const response = {
      status: 'failed',
      reason: error.message, // Provide the specific reason for failure
    };
    if(format === "json"){
      res.status(500).json(response);}
      else{
        res.status(500).send(converter.json2csv(response));
      }
    
  }
});

const httpsServer = https.createServer({
  key: httpsOptions.key,
  cert: httpsOptions.cert,
  passphrase: httpsOptions.passphrase 
}, app);

httpsServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
