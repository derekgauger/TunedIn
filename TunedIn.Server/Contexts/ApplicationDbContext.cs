using Microsoft.EntityFrameworkCore;
using LoginSystem.Backend.Models;
using TunedIn.Server.Models;

namespace TunedIn.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Membership> Memberships { get; set; }
        public DbSet<FormModel> Forms { get; set; }
        public DbSet<Log> Logs { get; set; }
        public DbSet<Picture> Pictures { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the Membership entity
            modelBuilder.Entity<Membership>()
                .Property(m => m.Features)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());
        }
    }
}