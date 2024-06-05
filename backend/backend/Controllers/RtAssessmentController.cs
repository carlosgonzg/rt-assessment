using System;
using System.Collections.Generic;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class RtAssessmentController : ControllerBase
{

    private readonly UserDetailContext _userDetailContext;

    private readonly ILogger<RtAssessmentController> _logger;

    public RtAssessmentController(ILogger<RtAssessmentController> logger, UserDetailContext userDetailContext)
    {
        _logger = logger;
        _userDetailContext = userDetailContext;
    }

    [HttpGet]
    public IEnumerable<User> Get()
    {
        return _userDetailContext.getUsers();
    }

    [HttpPut("{id}")]
    public void Update(int id, [FromBody] User data)
    {
        _userDetailContext.updateUser(id, data);
    }
}

