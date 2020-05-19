using DerogationSystemWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace DerogationSystemWeb.Model.Configs
{
    public sealed class ApplicationContext : DbContext
    {
        public DbSet<FactoryDepartment> Departments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<DerogationHeader> DerogationHeaders { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FactoryDepartment>().HasKey(d => d.Department);

            modelBuilder.Entity<DerogationHeader>().HasKey(dHeader => dHeader.DerogationID);

            modelBuilder.Entity<User>()
                .HasOne(user => user.FactoryDepartment)
                .WithMany(department => department.Users)
                .HasForeignKey(user => user.Department);

            //-------------- DerogationHeader ---------------------
            modelBuilder.Entity<DerogationHeader>()
                .HasOne(dHeader => dHeader.FactoryDepartment)
                .WithMany(dept => dept.DerogationHeaders)
                .HasForeignKey(dHeader => dHeader.Department);

            modelBuilder.Entity<DerogationHeader>()
                .HasOne(dHeader => dHeader.Author)
                .WithMany(user => user.DerogationHeaders)
                .HasForeignKey(dHeader => dHeader.Owner)
                .HasPrincipalKey(user => user.DerogationUser);

            //------------ DerogationDepartment -------------------
            modelBuilder.Entity<DerogationDepartment>().HasNoKey();

            modelBuilder.Entity<DerogationDepartment>()
                .HasOne(dDepartment => dDepartment.FactoryDepartment)
                .WithMany()
                .HasForeignKey(dDepartment => dDepartment.Department);

            modelBuilder.Entity<DerogationDepartment>()
                .HasOne(dDepartment => dDepartment.User)
                .WithMany()
                .HasForeignKey(dDepartment => dDepartment.DerogationUser)
                .HasPrincipalKey(user => user.DerogationUser);

            modelBuilder.Entity<DerogationDepartment>()
                .HasOne(dDept => dDept.DerogationHeader)
                .WithMany(dHeader => dHeader.DerogationDepartments)
                .HasForeignKey(dDept => dDept.DerogationId);
        }
    }
}