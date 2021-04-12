import app from '../index';
import db from '../db/db';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3010;

// Connect to Database
// ======================================
db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(e => {
  console.log(`Server not running. Error message: ${e.message}`);
  process.exit(1);
});
