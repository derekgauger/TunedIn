using LoginSystem.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using TunedIn.Server.Services;

namespace TunedIn.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembershipController : ControllerBase
    {
        private readonly MembershipService _membershipService;

        public MembershipController(MembershipService membershipService)
        {
            _membershipService = membershipService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Membership>>> GetMemberships()
        {
            var memberships = await _membershipService.GetMembershipsAsync();
            return Ok(memberships);
        }

        [HttpGet("{title}")]
        public async Task<ActionResult<Membership>> GetMembershipByTitle(string title)
        {
            var membership = await _membershipService.GetMembershipByTitleAsync(title);
            if (membership == null)
            {
                return NotFound("Membership not found");
            }
            return Ok(membership);
        }
    }
}