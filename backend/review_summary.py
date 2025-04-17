"""
Implements a review summarization feature using Azure AI Inference.
"""
import os
import sys, json
from typing import List
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
from prompts import REVIEW_SUMMARY_PROMPT
from sentiment_analysis import review_sentiment
from server_utils import return_review_data
from book_api import get_book

# Configuration
endpoint = "https://models.inference.ai.azure.com"
model_name = "gpt-4.1"
token = "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"

def generate_review_summary(reviews: List[dict], book_data) -> str:
    """
    Generate a summary of multiple book reviews using Azure AI Inference.
    
    Parameters:
    reviews (List[str]): A list of book review texts to summarize
    
    Returns:
    str: A concise summary of the key points across all reviews
    """
    if not reviews:
        return "No reviews available to summarize."
    
    # Initialize Azure AI client
    client = ChatCompletionsClient(
        endpoint=endpoint,
        credential=AzureKeyCredential(token),
    )
    
    # Format the reviews as a single string with clear separations
    formatted_reviews = "\n\n---\n\n".join([f"REVIEW {i+1} | Sentiment = {review_sentiment(json.dumps(review))}:\n{json.dumps(review)}" for i, review in enumerate(reviews)])
    user_message = f"Book Context (json):\n{book_data}\n####\nHere are the reviews to summarize:\n\n{formatted_reviews}\n####"
    
    try:
        # Call the Azure AI Inference API
        response = client.complete(
            messages=[
                SystemMessage(REVIEW_SUMMARY_PROMPT),
                UserMessage(user_message),
            ],
            temperature=0.3,  # Lower temperature for more focused and consistent summaries
            max_tokens=1000,  # Limiting the response length
            model=model_name
        )
        
        # Extract and return the summary
        summary = response.choices[0].message.content
        return summary
    
    except Exception as e:
        print(f"Error generating review summary: {str(e)}")
        return f"Failed to generate review summary due to an error: {str(e)}"
    
def review_analysis(book_id: str) -> str:
    """
    Analyze reviews for a specific book and generate a summary.
    
    Parameters:
    book_id (str): The ID of the book to analyze
    
    Returns:
    str: A summary of the reviews for the specified book
    """

    # Fetch review data for the specified book ID
    reviews_data = return_review_data(book_id)

    if not reviews_data or 'reviews_list' not in reviews_data:
        return "No review data available for this book."
    
    # Generate and return the review summary
    book_data = get_book(book_id)
    test_reviews = [
        "I absolutely loved this book! The character development was incredible and the plot kept me engaged throughout.",
        "The writing style was beautiful, but the pacing was too slow for my taste. Some parts dragged on unnecessarily.",
        "A masterpiece! The author's ability to create such a vivid world is remarkable. Highly recommend to all fantasy lovers.",
        "Disappointing. The premise seemed promising but the execution fell flat. The ending felt rushed and unsatisfying.",
        "The book starts strong but loses its way in the middle. The protagonist's journey is compelling though."
    ]
    
    return generate_review_summary(reviews_data['reviews_list'], book_data)

# Test the functionality if this script is run directly
if __name__ == "__main__":
    # Example reviews
    test_reviews = [
        "I absolutely loved this book! The character development was incredible and the plot kept me engaged throughout.",
        "The writing style was beautiful, but the pacing was too slow for my taste. Some parts dragged on unnecessarily.",
        "A masterpiece! The author's ability to create such a vivid world is remarkable. Highly recommend to all fantasy lovers.",
        "Disappointing. The premise seemed promising but the execution fell flat. The ending felt rushed and unsatisfying.",
        "The book starts strong but loses its way in the middle. The protagonist's journey is compelling though."
    ]

    summary = review_analysis("OL262384W")
    print("\n=== REVIEW SUMMARY ===\n")
    print(summary)
