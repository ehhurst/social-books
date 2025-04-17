import nltk
import re
from nltk.corpus import stopwords
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Download required NLTK resources (only needs to be run once)
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('vader_lexicon')

# Set up stopwords and VADER
stops = set(stopwords.words('english'))
sid = SentimentIntensityAnalyzer()

# Text cleaning function
def clean_text(text):
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = re.sub(r'@\w+', '', text)
    text = re.sub(r'#(\w+)', r'\1', text)
    text = re.sub(r'[^A-Za-z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# Stopword removal function
def remove_stopwords(text):
    words = nltk.word_tokenize(text.lower())
    return ' '.join(w for w in words if w not in stops)

# 🎯 Main function to analyze sentiment
def analyze_sentiment(review):
    cleaned = clean_text(review)
    filtered = remove_stopwords(cleaned)
    scores = sid.polarity_scores(filtered)
    return scores

def categorize_sentiment(score_dict):
    """
    Categorizes sentiment based on VADER compound score.

    Parameters:
    score_dict (dict): A dictionary with sentiment scores containing at least the 'compound' key.

    Returns:
    str: One of 'Positive', 'Negative', or 'Neutral'.
    """
    compound = score_dict.get('compound')
    
    if compound is None:
        return "Invalid input: 'compound' score missing."

    if compound >= 0.05:
        return 'Positive'
    elif compound <= -0.05:
        return 'Negative'
    else:
        return 'Neutral'
    
# Sentiment Categorization
def review_sentiment(review):
    """
    Categorizes the sentiment of a review based on its text.

    Parameters:
    review (str): The review text to analyze.

    Returns:
    str: One of 'Positive', 'Negative', or 'Neutral'.
    """
    score = analyze_sentiment(review)
    return categorize_sentiment(score)

# 🧪 Example usage
if __name__ == "__main__":
    review = "The book was ok, but I've read much better books."
    result = analyze_sentiment(review)
    category = review_sentiment(review)
    print("📊 Sentiment Scores:", result)
    print("Sentiment Category:", category)
