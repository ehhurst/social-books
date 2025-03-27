import sqlite3
import os
import time

# Monitors size of tables currently present in the database. Returns in a neat object.
# Returns number of users currently present in database.
DATABASE = "./social-books.db"
def db_connect():
    """ Opens a connection to the database. Hosted at 127.0.0.1 IP (localhost) """
    try:
        # Connect to the sqlite database. Modify the path at the top.
        conn = sqlite3.connect(DATABASE)
        print(f"Connection to database {DATABASE} successful.")
    except sqlite3.Error as error:
        print(f"ERROR CONNECTING {DATABASE}: errcode {error}")
        
    return conn
        
def check_binary(conn: sqlite3.Connection):
    """ Check compilation options for the sqlite3 binary file. """
    query = "PRAGMA compile_options"
    stats = conn.execute(query)
    for row in stats:
        print(row)

def tablestats(conn: sqlite3.Connection):
    """ Return the statistics for all tables and the table names """
    query = "SELECT name FROM sqlite_master WHERE type='table';"
    stats = conn.execute(query)
    print("-----------TABLES-----------")
    for idx, row in enumerate(stats):
        if idx % 5 == 0 and idx != 0:
            print()
        print(f"{row[0]}", end = " ")
    print("\n------------SIZE------------")
    query = """
    SELECT (page_count * page_size) AS size FROM pragma_page_count(), pragma_page_size();
    """
    stats = conn.execute(query)
    for row in stats:
        print(f"Total size: {row[0]}B", end = "")
    print("\n----------------------------")
    
    
def qtime(conn: sqlite3.Connection):
    query = """
    INSERT INTO reader_profiles (username) VALUES ('testname111');
    """
    time1 = time.time()
    conn.execute(query)
    query = """
    SELECT * FROM reader_profiles WHERE username = 'testname111';
    """
    conn.execute(query)
    time2 = time.time()
    
    query = """
    DELETE FROM reader_profiles WHERE username = 'testname111';
    """
    conn.execute(query)
    
    print(f"{time2-time1:6f}:lookup (s)") 
    
def users(conn: sqlite3.Connection):
    query = """
    SELECT COUNT(*) FROM reader_profiles;
    """
    stats = conn.execute(query)
    for row in stats:
        print(f"{row[0]} users in db.")
    
    
if __name__ == "__main__":
    
    conn = db_connect()
    
    print("""
███████ ██████  ████████ █████ ██         ██████  ██████  ██████ ██   █████████    
██     ██    ████     ████   ████         ██   ████    ████    ████  ██ ██         
█████████    ████     ███████████         ██████ ██    ████    ███████  ███████    
     ████    ████     ████   ████         ██   ████    ████    ████  ██      ██    
███████ ██████  ██████████   █████████    ██████  ██████  ██████ ██   █████████
          """
          )

    print("help for cmd list, qq to quit")

    # This loop runs the terminal
    while True:
        print("[socialbooks]:", end = " ")
        cmd = input()
        match cmd:
            case "qq":
                conn.close()
                print("Closing connection and exiting.")
                break
            case "help":
                print(
    """
    Commands:
    ---------
    tables: print table names and total size
    users: print the # of users in db
    whichbin: check the compilation options for the sqlite3 binary
    qtime: Test user addition, removal, and lookup time
    qq: exit terminal
    """
                )
            case "tables":
                tablestats(conn)
            case "whichbin":
                check_binary(conn)
            case "qtime":
                qtime(conn)
            case "users":
                users(conn)
            case _:
                print(f'invalid cmd: "{cmd}"')