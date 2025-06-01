using AutoMapper;
using SalesRep.Data;
using SalesRep.Models;

namespace SalesRep.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<SalesRepresentative, SalesRepDto>().ReverseMap();
            CreateMap<CreateSalesRepDto, SalesRepresentative>();
            CreateMap<UpdateSalesRepDto, SalesRepresentative>();
            CreateMap<Users, RegisterUserDto>().ReverseMap();

            CreateMap<ProductSale, SalesDto>()
                .ForMember(dest => dest.SalesRepName, opt => opt.MapFrom(src => src.SalesRepresentative.FirstName + " " + src.SalesRepresentative.LastName))
                .ForMember(dest => dest.Region, opt => opt.MapFrom(src => src.SalesRepresentative.Region))
                .ForMember(dest => dest.Platform, opt => opt.MapFrom(src => src.SalesRepresentative.Platform));
        }
    }
}