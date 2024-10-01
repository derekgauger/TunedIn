using System;

namespace LoginSystem.Backend.Models
{
    public class Membership
    {
      public int Id { get; set; }
      public string Title { get; set; }
      public string Price { get; set; }
      public List<string> Features { get; set; }
      public string Color { get; set; }
      public string Image { get; set; }
    }
    
}