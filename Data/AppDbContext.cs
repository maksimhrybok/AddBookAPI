using Microsoft.EntityFrameworkCore;
using FitTrackAPI.Models;

namespace FitTrackAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; } // Таблица "Books"
    }
}
