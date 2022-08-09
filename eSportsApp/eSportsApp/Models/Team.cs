using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eSportsApp.Models
{
    public class Team
    {
        public int TeamID { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public int Ranking { get; set; }
        public string PhotoFileName { get; set; }
    }
}
