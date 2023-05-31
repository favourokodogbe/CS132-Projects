README

Student Names: Riti Agarwal, Favour Okodogbe

Student emails: ragarwal@caltech.edu, fokodogb@caltech.edu

Introduction: 
The goal of this project is to create an app that can be used by dog adoption agencies. Mainly, it is an application system where the customer can adopt a dog and get information on possible options. Every adoption will be stored into the database. 

Data: Our data comes from: https://www.kaggle.com/datasets/whenamancodes/dog-adoption?select=allDogDescriptions.csv. We chose this dataset because it had most of the fields we required. We modified the original data by separating the adoption center information into one csv, the dog information into another csv, and the adoption statuses of each dog into another csv. 

Loading data: 
To load data from the command line, run mysql on your machine, and run the following prompts: 
Setup the database and tables using source setup.sql
Load the data using source load-data.sql
Create database password management using source setup-passwords.sql
Create database routines using source setup-routines.sql
Create client permissions by using source grant-permissions.sql
Quit mysql using quit
In the main command line, use python3 app.py to begin the app (see below for specific instructions on running our Python program).

Running the python program:
Run python3 app.py to begin the app
Choose to log in as either client or administration or exit. 
If you log in by administration by pressing 2, admin username = adoption_admin and admin password = dogs4life
If you log in as client by pressing 1, there are already 2 clients we have created: 
client1 = ('Favour', 'favourokodogbe1')
client2 = ('Riti', 'ragrawal2')
Or, you can create your own by putting in whatever you want for username or whatever you want for password. Your new login will be added to the administrator’s client list. 
As a client, you can then explore the app by choosing any of the following options! Hope you enjoy!

Here is the client view:

(base) favourokodogbe@Favours-MacBook-Pro CS121 Final Project % python3 app.py
Successfully connected.

Welcome to Our Dog Adoption Agency!

We hope to connect you to the dog that can be your new pet!

How can we help you today?
 (1) client login
 (2) administration login
 (q) exit
1
 Enter client username: Favour 
 Enter client password: favourokodogbe1

Welcome, client!
What would you like to do? 
  (f) - find female dogs available for adoption
  (m) - find male dogs available for adoption
  (s) - find available animals by state
  (v) - view adoption status for dog
  (r) - find dog location
  (p) - view number of dogs for adoption per state
  (a) - adopt a dog
  (l) - return back to login
  (q) - quit

As an administrator, you can then do the following functions by choosing any of the following options!
As seen below:

Welcome to Our Dog Adoption Agency!

We hope to connect you to the dog that can be your new pet!

How can we help you today?
 (1) client login
 (2) administration login
 (q) exit
2
 Enter admin username: adoption_admin
 Enter admin password: dogs4life

Welcome, admin!
What would you like to do? 
  (d) - add new dog for adoption
  (s) - update adoption status for dog
  (a) - view adoption status for dog
  (v) - view all clients
  (h) - view all adopters
  (p) - view number of dogs for adoption per state
  (l) - return back to login
  (q) - quit

You can exit the app whenever you want by typing q!
As seen below:
Welcome to Our Dog Adoption Agency!

We hope to connect you to the dog that can be your new pet!

How can we help you today?
 (1) client login
 (2) administration login
 (q) exit
q
Good bye!