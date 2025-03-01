book_info = input("Please enter the json object for the book")

book_ISBN = book_info.split(":")
book_title = book_info[book_ISBN]["title"]
book_author = book_info[book_ISBN]["author"]