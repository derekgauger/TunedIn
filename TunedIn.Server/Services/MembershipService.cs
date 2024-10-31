using LoginSystem.Backend.Models;
using Microsoft.EntityFrameworkCore;
using TunedIn.Server.Data;

namespace TunedIn.Server.Services
{
    public class MembershipService
    {
        private readonly ApplicationDbContext _context;

        public MembershipService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Membership>> GetMembershipsAsync()
        {
            return await _context.Memberships
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Membership> GetMembershipByIdAsync(int id)
        {
            return await _context.Memberships
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<Membership> GetMembershipByTitleAsync(string title)
        {
            return await _context.Memberships
            .AsNoTracking()
            .FirstOrDefaultAsync(m => m.Title.ToLower() == title.ToLower());
        }
    }
}