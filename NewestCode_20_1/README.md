# Server code

server.js: fully done endpoints 1-9, populating the database, but 3,5,6 endpoints don't work because of the foreign keys? or not idk. 
3. title_akas, 5. title_crew, 6. title_episode

title_crew and title_episode NEEDS *INSERT IGNORE* to upload ID's that aren't yet inserted to referenced tables.
