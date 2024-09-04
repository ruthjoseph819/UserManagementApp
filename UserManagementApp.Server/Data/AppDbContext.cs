using Microsoft.EntityFrameworkCore;
using UserManagementApp.Server.Models;

namespace UserManagementApp.Server.Data
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map the User entity to the ADM_USERS table
            modelBuilder.Entity<User>().ToTable("TestUsers");

            // You can add further configurations here, like primary keys, indexes, etc.
        }
    }
}
