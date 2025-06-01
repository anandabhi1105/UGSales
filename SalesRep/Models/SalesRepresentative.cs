namespace SalesRep.Models
{
    public class SalesRepresentative
    {
        public SalesRepresentative()
        {
            Sales = new HashSet<ProductSale>();
        }
        public int SalesRepId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Region { get; set; }
        public string Platform { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<ProductSale> Sales { get; set; }
    }
}