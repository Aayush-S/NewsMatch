
NewsMatch: A Political Bias Recommendation and Visualization Website.

We have built a system that clusters news topics by topic and determines
their bias. Our visualization system makes it easy for users to see the
distribution of different metadata across articles as well as find
interesting articles for them to read. NewsMatch also provides users
with recommendations for similar and different ideological articles to
give different perspectives on a given topic.

# Installation

### Setting up the Dataset

If you only want to use the first 10k articles of the dataset, no setup is needed!

If you want to download more of the dataset (*will run slower*):

1.  Install the most recent
    [SQLite](https://www.sqlite.org/download.html) command-line tools
2.  Download the *clustered_articles_100k.csv* file (or whichever size
    file you like) from
    [here](https://drive.google.com/drive/folders/1kjbQ4NviL3I_tuPdivm5rQaS3NYefk5g?usp=sharing)
    and save the file to the `CODE/app/server` directory
3.  Add the CSV file to the server file by going into
    `CODE/app/server/setup.sql` and change line 14 to hold the name of
    your file
    -   This step is already complete if you are using the
        *clustered_articles_100k.csv* file
4.  Open a terminal window and navigate to the `CODE/app/server`
    directory
5.  Run the command `sqlite3 full_database.db < setup.sql`
    -   For the *clustered_articles_100k.csv* file, this command will
        take about 60 seconds to run
6.  Confirm that the file *full_database.db* is now in the
    `CODE/app/server` directory
7.  Input the new database name in line 27 of `CODE/app/server/app.py`.

### Backend

Ensure you have [Python](https://www.python.org/) installed. You can use
a conda environment to install the required Python packages if desired.

From the home directory, run the following commands:\
*Note: it is recommended that this is run in a python or conda
environment*

    cd CODE/app/server
    pip install -r requirements.txt

### Frontend

Install the most recent [Node](https://nodejs.org/en) runtime.

From the home directory, run the following commands:

    cd CODE/app/client
    npm install

# Execution

### Backend

From the home directory, run the following commands:

    cd CODE/app/server
    python app.py

Now the backend is running on `http://127.0.0.1:5000`!

### Frontend

Open a new terminal, and from the home directory, run the following
commands:

    cd CODE/app/client
    npm install
    npm start

The app is now viewable in any browser at `http://localhost:3000`! To
use our system, first select a topic, then select an article, and
finally view recommendations.

# Files

Below is a description of all of the important directories and files in this repository. 

DOC: folder containing project report and poster
CODE: folder containing all project code
    app: folder containing the project app visualization
    dev: folder containing all data processing and model training code 

	Bias_Classification: folder containing data processing and model training code for classifying bias
	    Process_Data.ipynb: Google Colab notebook for pre-processing dataset
	    Sklearn_Models.ipynb: Google Colab notebook for training and saving sklearn models using processed dataset
	    sklearn: folder containing saved sklearn model checkpoints for various experiments (1)
	    Fine_Tune.ipynb: Google Colab notebook for fine-tuning and saving DistilBERT models using processed dataset
	    fine_tune: folder containing saved DistilBERT model checkpoints for various experiments (2)
	
	Keyword_Clustering: folder containing code for keyword extaction and clustering
	    Keyword_Extraction.ipynb: Google Colab notebook for clearning article text and extracting keywords
	    Keyword_Clustering.ipynb: Google Colab notebook for clustering extracted keywords and assigning topic labels

*(1) Provided model checkpoints are only forthe last training epoch to reduce the size of this 
repository; however, each experiment folder contains a `logs.json` file containing training
and validation metrics for all epochs
*(2) Each experiment folder contains an {EXPERIMENT_NAME}.txt file containing a Google Drive link 
to the model checkpoints and `logs.json` file containing training and validation metrics for all epochs
