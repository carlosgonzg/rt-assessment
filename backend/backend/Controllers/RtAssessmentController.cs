using System;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class RtAssessmentController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private string[] maleNames = new string[] { "carlos", "russell", "felix", "pedro", "george", "adam", "adolfo", "adrian" };
    private string[] femaleNames = new string[] { "karen", "kim", "paula", "alison" };
    private string[] lastNames = new string[] { "gonzalez", "acosta", "carvajal", "adkins", "aguilar" };
    private Random rand = new Random(DateTime.Now.Second);

    private readonly ILogger<RtAssessmentController> _logger;

    private string getRandomName()
    {
        if (rand.Next(1, 2) == 1)
        {
            return maleNames[rand.Next(0, maleNames.Length - 1)] + " " + lastNames[rand.Next(0, lastNames.Length - 1)];
        }
        return femaleNames[rand.Next(0, femaleNames.Length - 1)] + " " + lastNames[rand.Next(0, lastNames.Length - 1)];
    }

    public RtAssessmentController(ILogger<RtAssessmentController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<User> Get([FromQuery(Name = "limit")] int limit = 100)
    {
        return Enumerable.Range(1, limit).Select(index => new User
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
        });
    }
}

