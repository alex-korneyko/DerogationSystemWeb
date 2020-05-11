using DerogationSystemWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace DerogationSystemWeb.Model.Configs
{
    public class ApplicationContext : DbContext
    {
        public DbSet<FactoryDepartment> Departments { get; set; }
        public DbSet<User> Users { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(u => u.Id);

            modelBuilder.Entity<FactoryDepartment>().HasKey(d => d.Department);

            modelBuilder.Entity<User>()
                .HasOne(user => user.FactoryDepartment)
                .WithMany(department => department.Users)
                .HasForeignKey(user => user.Department);
        }
    }
}