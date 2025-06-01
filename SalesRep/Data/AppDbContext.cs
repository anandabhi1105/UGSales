using Microsoft.EntityFrameworkCore;
using SalesRep.Models;

namespace SalesRep.Data
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext(){}
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<SalesRepresentative> SalesRepresentatives { get; set; }
        public DbSet<ProductSale> ProductSales { get; set; }
        public DbSet<Users> Users{ get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<SalesRepresentative>(entity =>
            {
                entity.HasKey(d => d.SalesRepId);

                entity.Property(d => d.FirstName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(d => d.LastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(d => d.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(d => d.Phone)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(d => d.Region)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(d => d.CreatedAt).HasColumnType("datetime");

                entity.Property(d => d.Platform)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ProductSale>(entity =>
            {
                entity.HasKey(d => new { d.Product, d.SalesRepId });

                entity.Property(d => d.Product)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(d => d.Amount)
                    .HasColumnType("decimal(18,2)");

                entity.Property(d => d.SaleDate).HasColumnType("datetime");

                entity.HasOne(d => d.SalesRepresentative)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.SalesRepId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_SalesRepresentative_ProductSale");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.ToTable("Users");

                entity.HasKey(u => u.Userid);

                entity.Property(u => u.Username)
                    .HasMaxLength(255)
                    .IsRequired(false);

                entity.Property(u => u.Email)
                    .HasMaxLength(255)
                    .IsRequired(false);

                entity.Property(u => u.PasswordHash)
                    .HasMaxLength(255)
                    .IsRequired(false);

                entity.Property(u => u.Role)
                    .HasMaxLength(50)
                    .IsRequired(false);

                entity.Property(u => u.PhoneNo)
                    .HasMaxLength(15)
                    .IsRequired(false);
                    });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
