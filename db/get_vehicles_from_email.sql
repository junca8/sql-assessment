Select make, model, year, email
From Vehicles Join Users On (Users.id = Vehicles.ownerid)
Where email = $1;
