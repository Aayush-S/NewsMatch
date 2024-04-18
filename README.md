# political-bias-viz
Political Bias Visualization website for CSE 6242

## Setting up dataset
1. If you only want to use the first 10k articles of the dataset, no setup is needed!

If you want to download more of the dataset:

1. Download the *clustered_articles_100k.csv* file (or whichever size file you like) and add it to the server file.
* If your file isn't called *clustered_articles_100k.csv*, then go into *setup.sql* and change line 14 to hold the name of your file.
2. Open a terminal window and navigate to the server folder.
3. Run the command `sqlite3 full_database.db < setup.sql`
* This command will take about 60 seconds to run. Confirm that the file *full_database.db* is now in the server folder.
* Input the new database name in line 13 of *app.py*.

## Running the backend
1. Install dependencies (how to do this)
2. Run the command 'python app.py'.
