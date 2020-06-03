using DerogationSystemWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace DerogationSystemWeb.Model.Configs
{
    public sealed class SecondAppContext : DbContext
    {
        public DbSet<Part> Parts { get; set; }
        public DbSet<Workorder> WorkOrders { get; set; }

        public SecondAppContext(DbContextOptions<SecondAppContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Part>().ToTable("Parts").HasKey(part => part.Id);

            modelBuilder.Entity<Workorder>().ToTable("Workorders").HasKey(order => order.Id);
        }
    }
}