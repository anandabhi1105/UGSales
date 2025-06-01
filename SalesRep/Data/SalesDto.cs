using System;

namespace SalesRep.Data
{
    public class SalesDto
    {
        public string Product { get; set; }
        public decimal Amount { get; set; }
        public DateTime SaleDate { get; set; }
        public string SalesRepName { get; set; }
        public string Region { get; set; }
        public string Platform { get; set; }
    }
}