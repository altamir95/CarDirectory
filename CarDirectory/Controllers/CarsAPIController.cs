using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarDirectory.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarDirectory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsAPIController : ControllerBase
    {
        CarsContext db;
        public CarsAPIController(CarsContext context)
        {
            db = context;
            if (!db.Cars.Any())
            {
                db.Cars.Add(new Car { CarBrand = "DeLorean", CarModel = "DMC-12", CarNum = "OUTATIME", CarColor = "Silver", CarPruductionYear = "1981", CarOwnerFirstName = "Марти", CarOwnerLastName = "Макфлай", });
                db.Cars.Add(new Car { CarBrand = "Aston Martin", CarModel = "DB5", CarNum = "BMT 216A", CarColor = "Silver", CarPruductionYear = "1970", CarOwnerFirstName = "Джеймс", CarOwnerLastName = "Бонд", });
                db.Cars.Add(new Car { CarBrand = "Chevrolet", CarModel = "Sport 108", CarNum = "Отсутствуют", CarColor = "Sea", CarPruductionYear = "1968", CarOwnerFirstName = "Фред", CarOwnerLastName = "Джонс", });
                db.Cars.Add(new Car { CarBrand = "British Leyland", CarModel = "Mini 1000", CarNum = "SLW 287R", CarColor = "Yellow", CarPruductionYear = "1976", CarOwnerFirstName = "Mr.", CarOwnerLastName = "Bean", });
                db.Cars.Add(new Car { CarBrand = "Peugeot", CarModel = "406", CarNum = "724NLB13", CarColor = "White", CarPruductionYear = "1995", CarOwnerFirstName = "Даниэль", CarOwnerLastName = "Моралес", });
                db.Cars.Add(new Car { CarBrand = "Audi", CarModel = "A8", CarNum = "247 BRD 06", CarColor = "Black", CarPruductionYear = "2006", CarOwnerFirstName = "Tom", CarOwnerLastName = "Tom", });
                db.SaveChanges();
            }
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> Get()
        {
            return await db.Cars.ToListAsync();
        }

        // GET api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> Get(int id)
        {
            Car user = await db.Cars.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
                return NotFound();
            return new ObjectResult(user);
        }

        // POST api/users
        [HttpPost]
        public async Task<ActionResult<Car>> Post(Car car)
        {
            if (car == null)
            {
                return BadRequest();
            }
            DataBaseHistory dataBaseHistory = new DataBaseHistory();
            dataBaseHistory.ChangeDate = DateTime.Now;
            dataBaseHistory.Information = "Добавлен автомабиль: "+car.CarBrand+" "+car.CarModel+" ,"+car.CarPruductionYear + "года"+car.CarColor+" цвета";
            db.DataBaseHistories.Add(dataBaseHistory);
            db.Cars.Add(car);
            await db.SaveChangesAsync();
            return Ok(car);
        }

        // PUT api/users/
        [HttpPut]
        public async Task<ActionResult<Car>> Put(Car car)
        {
            if (car == null)
            {
                return BadRequest();
            }
            if (!db.Cars.Any(x => x.Id == car.Id))
            {
                return NotFound();
            }
            

            DataBaseHistory dataBaseHistory = new DataBaseHistory();
            dataBaseHistory.ChangeDate = DateTime.Now;
            dataBaseHistory.Information = "Информация об автомабиле в ячейке "+car.Id+" изменина на:"+car.CarBrand+" "+car.CarModel+" "+car.CarNum+" "+car.CarPruductionYear+" "+car.CarOwnerFirstName+" "+car.CarOwnerLastName;
            db.DataBaseHistories.Add(dataBaseHistory);

            db.Update(car);
            await db.SaveChangesAsync();
            return Ok(car);
        }

        // DELETE api/users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Car>> Delete(int id)
        {
            Car car = db.Cars.FirstOrDefault(x => x.Id == id);
            if (car == null)
            {
                return NotFound();
            }
            DataBaseHistory dataBaseHistory = new DataBaseHistory();
            dataBaseHistory.ChangeDate = DateTime.Now;
            dataBaseHistory.Information = "Удален автомабиль: " + car.CarBrand + " " + car.CarModel + " ," + car.CarPruductionYear + "года" + car.CarColor + " цвета";
            
            db.DataBaseHistories.Add(dataBaseHistory);
            db.Cars.Remove(car);
            await db.SaveChangesAsync();
            return Ok(car);
        }
    }
}
