using System;
using System.Collections.Generic;
using static System.Reflection.Metadata.BlobBuilder;

namespace backend.Models
{
	public sealed class UserDetailContext
    {
        private static string[] maleNames = new string[] { "carlos", "russell", "felix", "pedro", "george", "adam", "adolfo", "adrian" };
        private static string[] femaleNames = new string[] { "karen", "kim", "paula", "alison" };
        private static string[] lastNames = new string[] { "gonzalez", "acosta", "carvajal", "adkins", "aguilar" };

        private static Random rand = new Random(DateTime.Now.Second);

        private IEnumerable<User> users = new List<User>();

        private static UserDetailContext _instance;
        private static readonly object _lock = new object();

        private UserDetailContext()
        {
            setUsers();
        }

        public static UserDetailContext instance
        {
            get
            {
                lock (_lock)
                {
                    if (_instance == null)
                    {
                        _instance = new UserDetailContext();
                    }
                    return _instance;
                }
            }
        }

        private static string getRandomName()
        {
            if (rand.Next(1, 2) == 1)
            {
                return maleNames[rand.Next(0, maleNames.Length - 1)] + " " + lastNames[rand.Next(0, lastNames.Length - 1)];
            }
            return femaleNames[rand.Next(0, femaleNames.Length - 1)] + " " + lastNames[rand.Next(0, lastNames.Length - 1)];
        }

        private void setUsers()
        {
            if(users.Count() != 0)
            {
                return;
            }
            users = Enumerable.Range(1, 100).Select(index => new User
            {
                Id = index,
                Name = getRandomName(),
                Age = rand.Next(20, 40),
                Details = Enumerable.Range(1, 10).Select(detailIndex => new UserDetail
                {
                    Id = detailIndex,
                    Created = DateTime.Now.AddDays(detailIndex),
                    Calories = rand.Next(1, 200),
                    Fat = rand.Next(1, 200),
                    Carbs = rand.Next(1, 200),
                    Protein = rand.Next(1, 200),
                }).ToList()
            }).ToArray();
        }

        public IEnumerable<User> getUsers()
        {
            return users;
        }

        public void updateUser(int id, User data)
        {
            var list = users.ToArray();
            for(var i = 0; i < list.Count(); i++)
            {
                if (list[i].Id == id)
                {
                    list[i] = data;
                    break;
                }
            }
            users = list.ToList();
            return;
        }
    }
}

