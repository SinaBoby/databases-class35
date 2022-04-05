### 1. What columns violate 1NF?

  member_address, dinner_date, food_code, food_description.
   
### 2.What entities do you recognize that could be extracted?

members, dinners, venues, foods to be in 3.5NF

### 3.Name all the tables and columns that would make a 3NF compliant solution.

members(member_id INT NOT NULL, member_name VARCHAR(50) NOT NULL, house_no INT, street TEXT)

dinners(dinner_id INT NOT NULL, dinner_date DATE, venue_code INT)

member_dinner(member_id INT NOT NULL, dinner_id INT NOT NULL)

venues(venue_code INT NOT NULL, venue_description TEXT)

foods(food_code INT NOT NULL, food_description TEXT)

dinner_food(dinner_id INT NOT NULL, food_code INT NOT NULL)



  