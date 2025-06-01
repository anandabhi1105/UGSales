namespace SalesRep.Models
{
    public class ProductSale
    {
        public int ProductId { get; set; }
        public int SalesRepId { get; set; }
        public string Product { get; set; }
        public decimal Amount { get; set; }
        public DateTime SaleDate { get; set; }

        public SalesRepresentative SalesRepresentative { get; set; }
    }
}