using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDirectory.Models
{
    public class CarsContext : DbContext
    {
        public DbSet<Car> Cars { get; set; }
        public DbSet<DataBaseHistory> DataBaseHistories { get; set; }
        public CarsContext(DbContextOptions<CarsContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
