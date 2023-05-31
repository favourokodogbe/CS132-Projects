"""
Code demo from Final Project Lecture 22wi, providing
an example of using MySQL with Python for an animal adoption
agency database (inspired by 21wi midterm).
"""
import sys  # to print error messages to sys.stderr
import mysql.connector
# To get error codes from the connector, useful for user-friendly
# error-handling
import mysql.connector.errorcode as errorcode

# Debugging flag to print errors when debugging that shouldn't be visible
# to an actual client. Set to False when done testing.
DEBUG = False


# ----------------------------------------------------------------------
# SQL Utility Functions
# ----------------------------------------------------------------------
def get_conn():
    """"
    Returns a connected MySQL connector instance, if connection is successful.
    If unsuccessful, exits.
    """
    try:
        conn = mysql.connector.connect(
          host='localhost',
          user='app_admin',
          # Find port in MAMP or MySQL Workbench GUI or with
          # SHOW VARIABLES WHERE variable_name LIKE 'port';
          port='3306',
          password='adopt_admin',
          database='adoptdb'
        )
        print('Successfully connected.')
        return conn
    except mysql.connector.Error as err:
        # Remember that this is specific to _database_ users, not
        # application users. So is probably irrelevant to a client in your
        # simulated program. Their user information would be in a users table
        # specific to your database.
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR and DEBUG:
            sys.stderr('Incorrect username or password when connecting to DB.')
        elif err.errno == errorcode.ER_BAD_DB_ERROR and DEBUG:
            sys.stderr('Database does not exist.')
        elif DEBUG:
            sys.stderr(err)
        else:
            sys.stderr('An error occurred, please contact the administrator.')
        sys.exit(1)


# ----------------------------------------------------------------------
# Functions for Command-Line Options/Query Execution
# ----------------------------------------------------------------------
def show_animals_by_state():
    """
    Prompts the user to choose a region that they are looking to 
    adopt a dog from.
    
    Note that more functionality can be easily added to give other
    filters/sorting options to clients.
    """
    ans = input('Are you looking to adopt a dog from Nevada?')
    dog_NV = True
    if ans and ans.lower()[0] == 'y':
        sql = """
    SELECT adoption_center.org_id, dog_info.dog_name, dog_info.dog_url
    FROM dog_info NATURAL JOIN adoption_center
    WHERE adoption_center.contact_state = 'NV'
    ORDER BY dog_info.dog_name ASC;
    """ # escape parameters for secure execution
    else:
        sql = """SELECT adoption_center.org_id, dog_info.dog_name, dog_info.dog_url 
            FROM dog_info NATURAL JOIN adoption_center 
            WHERE adoption_center.contact_state = 'AZ' ORDER BY dog_info.dog_name ASC;"""
        dog_NV = False
    try:
        cursor = conn.cursor()
        cursor.execute(sql)
        rows = cursor.fetchall()
    except mysql.connector.Error as err:
        if DEBUG:
            sys.stderr(err)
            sys.exit(1)
        else:
            sys.stderr('An error occurred when searching for available animals.')
            return
    if not rows:
        print('No results found.')
    else:
        if dog_NV:
            print('Dogs in Nevada:')
        else: 
            print('Dogs in Arizona:')
        for row in rows:
            print(row)

def find_female_dogs():
    """
    Finds all female dogs
    """
    cursor = conn.cursor()
    sql = """
    SELECT dog_name, dog_url 
    FROM dog_info 
    WHERE dog_gender = 'F';
    """

    try:
        cursor.execute(sql)
        rows = cursor.fetchall()
    except mysql.connector.Error as err:
        if DEBUG:
            sys.stderr(err)
            sys.exit(1)
        else:
            sys.stderr('An error occurred when searching for available animals.')
            return
    if not rows:
        print('No results found.')
    else:
        print('Here are the female dogs available for adoption: \n')
        for row in rows:
            print(row)

def num_dogs_per_state():
    """
    Finds all dogs per state
    """
    cursor = conn.cursor()
    sql = """
    SELECT adoption_center.contact_state AS state, 
    COUNT(dog_info.dog_id) as num_dogs
    FROM dog_info NATURAL JOIN adoption_center
    WHERE dog_info.org_id = adoption_center.org_id
    GROUP BY adoption_center.contact_state;
    """
    try:
        cursor.execute(sql)
        rows = cursor.fetchall()
    except mysql.connector.Error as err:
        if DEBUG:
            sys.stderr(err)
            sys.exit(1)
        else:
            sys.stderr('An error occurred when searching for number of dogs.')
            return
    if not rows:
        print('No results found.')
    else:
        print('Here are the number of dogs for adoption per state.\n')
        for row in rows:
            print(row)

def find_male_dogs():
        """
           Finds all male dogs
        """
        cursor = conn.cursor()
        sql = """
        SELECT dog_name, dog_url 
        FROM dog_info 
        WHERE dog_gender = 'M';
        """

        try:
            cursor.execute(sql)
            rows = cursor.fetchall()
        except mysql.connector.Error as err:
            if DEBUG:
                sys.stderr(err)
                sys.exit(1)
            else:
                sys.stderr('An error occurred when searching for available animals.')
                return
        if not rows:
            print('No results found.')
        else:
            print('Here are the male dogs available for adoption: \n')
            for row in rows:
                print(row)


def update_adoption():
    """
    this updates adoption status for dog
    """
    cursor = conn.cursor()
    dogid_input = input('Enter dog_id: ')
    status_input = input('Enter new status: ')
    sql1 = '''CALL sp_change_adoption_status('%s', '%s');''' % (dogid_input, status_input)
    sql2 = '''UPDATE adoption_status SET dog_status = '%s' WHERE dog_id = '%s';
    ''' % (status_input, dogid_input)
    try:
        cursor.execute(sql1)
        cursor.execute(sql2)
        print("\nAdoption status changed.")
    except mysql.connector.Error as err:
        if DEBUG:
            sys.stderr(err)
            sys.exit(1)
        else:
            sys.stderr('An error occurred when trying to update adoption status.')
            return
    
def adopt_dog():
    """
    allows a client to adopt a dog
    """
    cursor = conn.cursor()
    print('We are so happy that you have chosen a dog!')
    adoptdog_input = input('Enter dog_id: ')
    user_input = input('Enter your username: ')
    sql1 = '''INSERT INTO adoption_info VALUES ('%s', '%s');''' % (user_input, adoptdog_input)
    sql2 = '''
    SELECT dog_name FROM dog_info WHERE dog_id LIKE '%s';
    ''' % (adoptdog_input)
    sql3 = '''
    DELETE FROM dog_info WHERE dog_id LIKE '%s';''' % (adoptdog_input)

    try:
        cursor.execute(sql2)
        row = cursor.fetchone()
        cursor.execute(sql1)
        cursor.execute(sql3)
        print("\nCongrats! You have adopted a dog!")
    except mysql.connector.Error as err:
        if DEBUG:
            sys.stderr(err)
            sys.exit(1)
        else:
            sys.stderr('An error occurred when trying to update \
                       adoption status or delete from list of dog.')
            return
    if row:
        row_str = str(row)
        dog_row_name = ""
        for i in range(len(row_str)):
            if i > 1 and i < len(row_str) - 3:
                dog_row_name += row_str[i]
        print(dog_row_name + ' is excited to meet you!')
    else:
        print('Error')

def view_clients():
    """
    allows admin to view clients who have accounts in the agency
    """
    cursor = conn.cursor()
    sql = """
    SELECT *
    FROM adopter_info;
    """
    try:
        cursor.execute(sql)
        rows = cursor.fetchall()
    except mysql.connector.Error as err:
        if DEBUG:
            sys.stderr(err)
            sys.exit(1)
        else:
            sys.stderr('An error occurred when searching for adopters.')
            return
    if not rows:
        print('No results found.')
    else:
        print('Here are all clients: \n')
        for row in rows:
            print(row)

def view_adopters():
    """
    allows admin to view clients who have accounts in the agency
    and have adopted dogs
    """
    cursor = conn.cursor()
    sql = """
    SELECT adopter_usr, COUNT(adopted_id) AS dogs_adopted
    FROM adoption_info
    GROUP BY adopter_usr;
    """
    try:
        cursor.execute(sql)
        rows = cursor.fetchall()
    except mysql.connector.Error as err:
        if DEBUG:
            sys.stderr(err)
            sys.exit(1)
        else:
            sys.stderr('An error occurred when searching for adopters.')
            return
    if not rows:
        print('No results found.')
    else:
        print('Here are all adopters: \n')
        for row in rows:
            print(row)

def find_adoption_status():
    """
    Find adoption status of dog 
    """
    dog_id = input('Please input dog id: ')
    sql = """
    SELECT *
    FROM adoption_status
    WHERE dog_id LIKE '%s';
    """ % (dog_id) 
    try:
        cursor = conn.cursor()
        cursor.execute(sql)
        row = cursor.fetchone()
    except mysql.connector.Error as err:
        if DEBUG:
            sys.stderr(err)
            sys.exit(1)
        else:
            sys.stderr('An error occurred when searching for dog.')
            return
    if not row:
        print('This dog is no longer available for adoption.')
    else:
        print('Current adoption status: ')
        print('N- still in processing and A- ready for adoption')
        print(row)

def find_dog_location():
    """
    Find adoption status of dog 
    """
    dog_id = input('Please input dog id: ')
    sql = """
    SELECT adoption_center.org_id,
    adoption_center.contact_city,
    adoption_center.contact_state,
    adoption_center.contact_zip
    FROM adoption_center NATURAL JOIN dog_info
    WHERE adoption_center.org_id = dog_info.org_id
    AND dog_id LIKE '%s'; 
    """ % (dog_id) 
    try:
        cursor = conn.cursor()
        cursor.execute(sql)
        row = cursor.fetchone()
    except mysql.connector.Error as err:
        if DEBUG:
            sys.stderr(err)
            sys.exit(1)
        else:
            sys.stderr('An error occurred when searching for location.')
            return
    if not row:
        print('Incorrect dog ID. Try again!')
    else:
        print('Here is the dog location and organization: \n')
        print(row)
# ----------------------------------------------------------------------
# Functions for Logging Users In
# ----------------------------------------------------------------------
def login_user():
    """
    Allows clients and admin to long into the system. 
    """
    cursor = conn.cursor()
    print('\nWelcome to Our Dog Adoption Agency!\n')
    print('We hope to connect you to the dog that can be your new pet!\n')
    print('How can we help you today?')

    while True:
        print(' (1) client login')
        print(' (2) administration login')
        print(' (q) exit')

        inp_choice = input().lower()
        if inp_choice == '2':
            correct_admin_usr = 'adoption_admin'
            correct_admin_pwd = 'dogs4life'
            admin_usrname = input(' Enter admin username: ').lower()
            admin_pswrd = input(' Enter admin password: ').lower()

            try:
                if admin_usrname == correct_admin_usr and admin_pswrd == correct_admin_pwd:
                    admin = True
                    break
                else:
                    print('Incorrect login information. Please try again!\n')
            except mysql.connector.Error as err:
                if DEBUG:
                    sys.stderr(err)
                    sys.exit(1)
                else:
                    sys.stderr('Login error. Set debug = True')
        elif inp_choice == '1':
            admin = False
            client_usrname = input(' Enter client username: ').lower()
            client_pswrd = input(' Enter client password: ').lower()
            sql1 = '''SELECT authenticate('%s', '%s');''' % (client_usrname, client_pswrd)
            try:
                cursor.execute(sql1)
                correct_info = cursor.fetchone()
                if correct_info[0] == 1:
                    admin = False
                    break
                else:
                    sql1 = '''CALL sp_add_user('%s', '%s');''' % (client_usrname, client_pswrd)
                    sql2 = '''INSERT INTO adopter_info VALUES ('%s', '%s');''' % (client_usrname, client_pswrd)
                    cursor.execute(sql2)
            except mysql.connector.Error as err:
                if DEBUG:
                    sys.stderr(err)
                    sys.exit(1)
                else:
                    sys.stderr('Login error. Set debug = True')
            break
        elif inp_choice == 'q':
            quit_ui()
        else:
            print('Invalid! Try again.')

    if admin:
        print('\nWelcome, admin!')
        show_admin_options()
    else:
        print('\nWelcome, client!')
        show_options()
            

# ----------------------------------------------------------------------
# Command-Line Functionality
# ----------------------------------------------------------------------
def show_options():
    """
    Displays options users can choose in the application.
    """
    print('What would you like to do? ')
    print('  (f) - find female dogs available for adoption')
    print('  (m) - find male dogs available for adoption')
    print('  (s) - find available animals by state')
    print('  (v) - view adoption status for dog')
    print('  (r) - find dog location')
    print('  (p) - view number of dogs for adoption per state')
    print('  (a) - adopt a dog')
    print('  (l) - return back to login')
    print('  (q) - quit')
    while True:
        ans = input('Enter an option: ')[0].lower()
        if ans == 'q':
            quit_ui()
        elif ans == 's':
            show_animals_by_state()
        elif ans == 'l':
            login_user()
        elif ans == 'v':
            find_adoption_status()
        elif ans == 'r':
            find_dog_location()
        elif ans == 'a':
            adopt_dog()
        elif ans == 'p':
            num_dogs_per_state()
        elif ans == 'f':
            find_female_dogs()
        elif ans == 'm':
            find_male_dogs()
        else:
            print('Unknown option.')


# You may choose to support admin vs. client features in the same program, or
# separate the two as different client and admin Python programs using the same
# database.
def show_admin_options():
    """
    Displays options specific for admins.
    """
    print('What would you like to do? ')
    print('  (s) - update adoption status for dog')
    print('  (a) - view adoption status for dog')
    print('  (v) - view all clients')
    print('  (h) - view all adopters')
    print('  (p) - view number of dogs for adoption per state')
    print('  (l) - return back to login')
    print('  (q) - quit')
    print()
    while True:
        ans = input('Enter an option: ')[0].lower()
        if ans == 'q':
            quit_ui()
        elif ans == 's':
            update_adoption()
        elif ans == 'l':
            login_user()
        elif ans == 'a':
            find_adoption_status()
        elif ans == 'p':
            num_dogs_per_state()
        elif ans == 'h':
            view_adopters()
        elif ans == 'v':
            view_clients()
        else:
            print('Unknown option.')


def quit_ui():
    """
    Quits the program, printing a good bye message to the user.
    """
    print('Good bye!')
    exit()


def main():
    """
    Main function for starting things up.
    """
    login_user()


if __name__ == '__main__':
    # This conn is a global object that other functinos can access.
    # You'll need to use cursor = conn.cursor() each time you are
    # about to execute a query with cursor.execute(<sqlquery>)
    conn = get_conn()
    main()
