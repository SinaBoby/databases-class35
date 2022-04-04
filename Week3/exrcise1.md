### 1. What columns violate 1NF?

  member_address, dinner_date, food_code, food_description.
   
### 2.What entities do you recognize that could be extracted?

members, dinners, venues, foods to be in 3.5NF

### 3.Name all the tables and columns that would make a 3NF compliant solution.

members(member_id int, member_name varchar(50), house_no int, street text)

dinners(dinner_id int, dinner_date date, venue_code int)

member_dinner(member_id int, dinner_id int)

venues(venue_code int, venue_description text)

foods(food_code int, food_description text)

dinner_food(dinner_id int, food_code int)



  