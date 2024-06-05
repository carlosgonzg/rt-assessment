using System;
namespace backend.Models
{
	public interface IUserDetailContext
	{
        IEnumerable<User> getUsers();
        User updateUser(int id, User data);
    }
}

