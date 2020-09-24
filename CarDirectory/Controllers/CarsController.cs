using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDirectory.Controllers
{
    public class CarsController : Controller
    {
        public IActionResult AllCars()
        {
            return View();
        }
        public IActionResult CarInfo()
        {
            return View();
        }
    }
}
