using FluentValidation;
using SalesRep.Data;

namespace SalesRep.Validators
{
    public class CreateSalesRepDtoValidator : AbstractValidator<CreateSalesRepDto>
    {
        public CreateSalesRepDtoValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().MaximumLength(100);
            RuleFor(x => x.LastName).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Phone).NotEmpty().MaximumLength(50);
            RuleFor(x => x.Region).NotEmpty();
            RuleFor(x => x.Platform).NotEmpty();
        }
    }

    public class UpdateSalesRepDtoValidator : AbstractValidator<UpdateSalesRepDto>
    {
        public UpdateSalesRepDtoValidator()
        {
            Include(new CreateSalesRepDtoValidator());
        }
    }
}