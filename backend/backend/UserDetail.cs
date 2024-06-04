namespace backend;

public class UserDetail
{
    public int Id { get; set; }
    public DateTime Created { get; set; }
    public int Calories { get; set; }
    public int Fat { get; set; }
    public int Carbs { get; set; }
    public int Protein { get; set; }
}

public class User
{
    public int Id { get; set; }

    public string Name { get; set; }

    public int Age { get; set; }

    public List<UserDetail> Details { get; set; }
}