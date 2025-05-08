import re

""" 
Gen. AI was used to debug the following code. The prompt is below.

import re

def is_profane(review):
    output = set() 

    with open("profanity-list.txt", "r") as proflist:
        for profanity in proflist:
            profane_arr = profanity.strip().split(":")
            prof_word = profane_arr[0].strip()
            if len(profane_arr) > 1: 
                safe_list = profane_arr[1]

            regex = r"\b\w*" + re.escape(prof_word) + r"\w*\b"
            unsafe_matches = re.findall(regex, review)
            
            for match in unsafe_matches:
                regex_prof = r"^" + re.escape(match) + r"$"
                check = re.findall(regex_prof, safe_list)
                if not check:
                    print(check)
                    output.add(match)
                    
    return list(output)  

if __name__ == "__main__":
    print(is_profane("$swank$swank vermillion ver$million"))

swank matches, incorrect handling of regex is likely.
"""

def is_profane(review):
    output = set()

    with open("profanity-list.txt", "r") as proflist:
        for profanity in proflist:
            profane_arr = profanity.strip().split(":")
            prof_word = profane_arr[0].strip()
            safe_list = profane_arr[1].strip() if len(profane_arr) > 1 else ""

            regex = r"\b" + re.escape(prof_word) + r"\b"
            unsafe_matches = re.findall(regex, review)

            for match in unsafe_matches:
                if safe_list:
                    safe_words = safe_list.split(",")
                    for safe_word in safe_words:
                        if match == safe_word:
                            break
                    else:
                        output.add(match)
                else:
                    output.add(match)

    return list(output)