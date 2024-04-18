# political-bias-viz
Political Bias Visualization website for CSE 6242

## Setting up dataset
1. Download the *clustered_articles_10k.csv* file (or whichever size file you like) and add it to the server file.
* If your file isn't called *clustered_articles_10k.csv*, then go into *setup.sql* and change line 14 to hold the name of your file.
2. Open a terminal window and navigate to the server folder.
3. Run the command `sqlite3 full_database.db < setup.sql`
* This command will take about 60 seconds to run. Confirm that the file *full_database.db* is now in the server folder.
* If the database you'd like to use has a different name than *full_database.db*, make sure to input the database name in line 13 of *app.py*.

## Running the backend
1. Install dependencies (how to do this)
2. Run the command 'python app.py'.
