using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarDirectory.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarDirectory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataBaseHistoriesAPIController : ControllerBase
    {
        CarsContext db;
        public DataBaseHistoriesAPIController(CarsContext context)
        {
            db = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DataBaseHistory>>> Get()
        {
            return await db.DataBaseHistories.ToListAsync();
        }
    }
}
