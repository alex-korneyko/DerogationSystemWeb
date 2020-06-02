using DerogationSystemWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace DerogationSystemWeb.Model.Configs
{
    public sealed class ApplicationContext : DbContext
    {
        public DbSet<FactoryDepartment> Departments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<DerogationHeader> DerogationHeaders { get; set; }
        public DbSet<DerogationDepartment> DerogationDepartments { get; set; }
        public DbSet<DerogationOperator> DerogationOperators { get; set; }
        public DbSet<DerogationItem> DerogationItems { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FactoryDepartment>().HasKey(d => d.Department);

            modelBuilder.Entity<DerogationHeader>().HasKey(dHeader => dHeader.DerogationId);

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

            //-------------- DerogationDepartment ------------------
            modelBuilder.Entity<DerogationDepartment>().HasKey(dDept => dDept.Id);

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

            //--------------- DerogationItem ----------------------
            modelBuilder.Entity<DerogationItem>().ToTable("DerogationHeadersItems").HasKey(dItem => dItem.Id);

            modelBuilder.Entity<DerogationItem>()
                .HasOne(dItem => dItem.DerogationHeader)
                .WithMany(dHeader => dHeader.DerogationItems)
                .HasForeignKey(dItem => dItem.DerogationId);

            //--------------- DerogationItem ----------------------
            modelBuilder.Entity<DerogationOperator>().ToTable("DerogationOperators").HasKey(dOper => dOper.Id);

            modelBuilder.Entity<DerogationOperator>()
                .HasOne(dOper => dOper.DerogationHeader)
                .WithMany(dHeader => dHeader.Operators)
                .HasForeignKey(dOper => dOper.DerogationId);

            modelBuilder.Entity<DerogationOperator>()
                .HasOne(dOper => dOper.Author)
                .WithMany()
                .HasForeignKey(dOper => dOper.DerogationUser)
                .HasPrincipalKey(user => user.DerogationUser);
        }
    }
}