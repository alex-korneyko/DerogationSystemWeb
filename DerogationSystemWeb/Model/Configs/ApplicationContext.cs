using DerogationSystemWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic.CompilerServices;

namespace DerogationSystemWeb.Model.Configs
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Department> Departments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>()
                .Property(department => department.Mandatory).HasConversion(
                    v => Conversions.ToInteger(v).ToString(),
                    v => Conversions.ToBoolean(Conversions.ToInteger(v)));

            modelBuilder.Entity<Department>()
                .Property(department => department.LtimeAccess).HasConversion(
                    v => Conversions.ToInteger(v).ToString(),
                    v => Conversions.ToBoolean(Conversions.ToInteger(v)));

            modelBuilder.Entity<Department>()
                .Property(department => department.DCostAccess).HasConversion(
                    v => Conversions.ToInteger(v).ToString(),
                    v => Conversions.ToBoolean(Conversions.ToInteger(v)));

            modelBuilder.Entity<Department>()
                .Property(department => department.ToBeAdded).HasConversion(
                    v => Conversions.ToInteger(v).ToString(),
                    v => Conversions.ToBoolean(Conversions.ToInteger(v)));

            modelBuilder.Entity<Department>()
                .Property(department => department.OnlyMail).HasConversion(
                    v => Conversions.ToInteger(v).ToString(),
                    v => Conversions.ToBoolean(Conversions.ToInteger(v)));
        }
    }
}