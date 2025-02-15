using DugunSalonuKiralama.Application.Features.CQRS.Handlers;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Persistence.Context;
using DugunSalonuKiralama.Application.Services;
using DugunSalonuKiralama.Persistence.Repositories;

namespace DugunSalonuKiralama.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddHttpClient();

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

            builder.Services.AddScoped<WeddingHallContext>();
            builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            // Categories için gerekli olan Handler'ları ekleyelim
            builder.Services.AddScoped<GetCategoryQueryHandler>();
            builder.Services.AddScoped<GetCategoryByIdQueryHandler>();
            builder.Services.AddScoped<CreateCategoryCommandHandler>();
            builder.Services.AddScoped<UpdateCategoryCommandHandler>();
            builder.Services.AddScoped<RemoveCategoryCommandHandler>();

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
