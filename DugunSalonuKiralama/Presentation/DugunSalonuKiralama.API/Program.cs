using DugunSalonuKiralama.Application.Features.CQRS.Handlers;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Persistence.Context;
using DugunSalonuKiralama.Application.Services;
using DugunSalonuKiralama.Persistence.Repositories;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.Wedding;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.Weddings;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.GetWeddingHallWithLocationQueryHandler;
using System.Globalization;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.Locations;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.Bookings;
using DugunSalonuKiralama.Application.Interfaces.AppRoleInterfaces;
using DugunSalonuKiralama.Application.Interfaces.AppUserInterfaces;
using DugunSalonuKiralama.Persistence.Repositories.AppRoleRepositories;
using DugunSalonuKiralama.Persistence.Repositories.AppUserRepositories;

namespace DugunSalonuKiralama.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddHttpClient();

            
            CultureInfo.DefaultThreadCurrentCulture = CultureInfo.InvariantCulture;
            CultureInfo.DefaultThreadCurrentUICulture = CultureInfo.InvariantCulture;


            builder.Services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", builder =>
                {
                    builder.AllowAnyHeader()
                    .AllowAnyMethod()
                    .SetIsOriginAllowed((host) => true)
                    .AllowCredentials();
                });
            });

            //Repos
            builder.Services.AddScoped<WeddingHallContext>();
            builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            builder.Services.AddScoped(typeof(IWeddingRepository), typeof(WeddingHallRepository));
            builder.Services.AddScoped(typeof(IAppUserRepository), typeof(AppUserRepository));
            builder.Services.AddScoped(typeof(IAppRoleRepository), typeof(AppRoleRepository));

            //Category
            builder.Services.AddScoped<GetCategoryQueryHandler>();
            builder.Services.AddScoped<GetCategoryByIdQueryHandler>();
            builder.Services.AddScoped<CreateCategoryCommandHandler>();
            builder.Services.AddScoped<UpdateCategoryCommandHandler>();
            builder.Services.AddScoped<RemoveCategoryCommandHandler>();

            //Location
            builder.Services.AddScoped<GetLocationQueryHandler>();
            builder.Services.AddScoped<GetLocationByIdQueryHandler>();
            builder.Services.AddScoped<CreateLocationCommandHandler>();
            builder.Services.AddScoped<UpdateLocationCommandHandler>();
            builder.Services.AddScoped<RemoveLocationCommandHandler>();

            //WeddingHall
            builder.Services.AddScoped<GetWeddingHallQueryHandler>();
            builder.Services.AddScoped<GetWeddingHallByIdQueryHandler>();
            builder.Services.AddScoped<CreateWeddingHallCommandHandler>();
            builder.Services.AddScoped<UpdateWeddingHallCommandHandler>();
            builder.Services.AddScoped<RemoveWeddingHallCommandHandler>();
            builder.Services.AddScoped<GetWeddingHallWithLocationQueryHandler>();

            //Booking
            builder.Services.AddScoped<CreateBookingCommandHandler>();
            builder.Services.AddScoped<UpdateBookingCommandHandler>();
            builder.Services.AddScoped<RemoveBookingCommandHandler>();
            builder.Services.AddScoped<GetBookingByIdQueryHandler>();
            builder.Services.AddScoped<GetBookingQueryHandler>();

            builder.Services.AddApplicationService(builder.Configuration);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
