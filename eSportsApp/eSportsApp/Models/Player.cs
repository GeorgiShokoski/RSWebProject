using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eSportsApp.Models
{
    public class Player
    {
        public int PlayerID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public decimal Rating { get; set; }
        public int Age { get; set; }
        public string Country { get; set; }
        public string PhotoFileName { get; set; }
        public string Team { get; set; }

    }
}
