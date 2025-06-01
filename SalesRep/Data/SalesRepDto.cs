namespace SalesRep.Data
{
    public class SalesRepDto
    {
        public int SalesRepId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Region { get; set; }
        public string Platform { get; set; }
    }

    public class CreateSalesRepDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Region { get; set; }
        public string Platform { get; set; }
    }

    public class UpdateSalesRepDto : CreateSalesRepDto { }
}