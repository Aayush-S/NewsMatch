# NewsMatch
NewsMatch: A Political Bias Recommendation and Visualization Website.

We have built a system that clusters news topics by topic and determines their bias. Our visualization system makes it easy for users to see the distribution of different metadata across articles as well as find interesting articles for them to read. NewsMatch also provides users with recommendations for similar and different ideological articles to give different perspectives on a given topic.

## Setting up the Dataset
1. If you only want to use the first 10k articles of the dataset, no setup is needed!

If you want to download more of the dataset (*will run slower*):

1. Download the *clustered_articles_100k.csv* file (or whichever size file you like) and add it to the server file.
* If your file isn't called *clustered_articles_100k.csv*, then go into *setup.sql* and change line 14 to hold the name of your file.
2. Open a terminal window and navigate to the server folder.
3. Run the command `sqlite3 full_database.db < setup.sql`
* This command will take about 60 seconds to run. Confirm that the file *full_database.db* is now in the server folder.
* Input the new database name in line 13 of *app.py*.

## Running the Backend

From the home directory, run the following commands:
1. `cd server`
2. `pip install -r requirements.txt`
3. `python app.py`

## Running the Frontend

Open a new terminal and run the following commands:
1. `cd client`
2. `npm install`
3. `npm start`
