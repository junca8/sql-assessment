Select year, make, model, firstname, lastname
From Vehicles Join Users On (Users.id = Vehicles.ownerid)
Where year > 2000
Order By year desc;
