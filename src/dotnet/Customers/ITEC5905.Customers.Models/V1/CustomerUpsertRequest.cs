using IkeMtz.NRSRx.Core.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Customers.Models.V1
{
    public partial class CustomerUpsertRequest : IIdentifiable
    {
        public Guid Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
    }
}