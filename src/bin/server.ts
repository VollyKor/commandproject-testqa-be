import app from '../index';
import db from '../db/db';
<<<<<<< HEAD

import dotenv from 'dotenv';
dotenv.config();
=======
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3010;
>>>>>>> master

const PORT = process.env.PORT || 3010;

// Connect to MongoDB
// ======================================
db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(e => {
  console.log(`Server not running. Error message: ${e.message}`);
  process.exit(1);
});
