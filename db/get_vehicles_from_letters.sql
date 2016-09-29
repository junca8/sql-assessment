Select make, model, year, firstname
From Vehicles Join Users On (Users.id = Vehicles.ownerid)
Where firstname like $1 || '%';
