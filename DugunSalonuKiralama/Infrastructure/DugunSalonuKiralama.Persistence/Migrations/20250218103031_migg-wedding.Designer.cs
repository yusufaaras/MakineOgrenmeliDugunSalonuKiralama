﻿// <auto-generated />
using System;
using DugunSalonuKiralama.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DugunSalonuKiralama.Persistence.Migrations
{
    [DbContext(typeof(WeddingHallContext))]
    [Migration("20250218103031_migg-wedding")]
    partial class miggwedding
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Availability", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("interval");

                    b.Property<bool>("IsAvailable")
                        .HasColumnType("boolean");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("interval");

                    b.Property<int>("WeddingHallId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("WeddingHallId");

                    b.ToTable("Availabilities");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Booking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("BookingDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("GuestCount")
                        .HasColumnType("integer");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("TotalPrice")
                        .HasColumnType("numeric");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<int>("WeddingId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("WeddingId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Feature", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Features");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Schedule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("interval");

                    b.Property<DateTime>("EventDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsReserved")
                        .HasColumnType("boolean");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("interval");

                    b.Property<int>("WeddingHallId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("WeddingHallId");

                    b.ToTable("Schedules");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Testimonial", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Rating")
                        .HasColumnType("integer");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("WeddingId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("WeddingId");

                    b.ToTable("Testimonials");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Wedding", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("LocationId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("LocationId");

                    b.ToTable("Weddings");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.WeddingFeature", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("FeatureId")
                        .HasColumnType("integer");

                    b.Property<int>("WeddingId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("FeatureId");

                    b.HasIndex("WeddingId");

                    b.ToTable("WeddingFeatures");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.WeddingHall", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Capacity")
                        .HasColumnType("integer");

                    b.Property<int>("CategoryId")
                        .HasColumnType("integer");

                    b.Property<string>("DetailImageUrl1")
                        .HasColumnType("text");

                    b.Property<string>("DetailImageUrl2")
                        .HasColumnType("text");

                    b.Property<string>("DetailImageUrl3")
                        .HasColumnType("text");

                    b.Property<string>("DetailImageUrl4")
                        .HasColumnType("text");

                    b.Property<string>("HomeImageUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("LocationId")
                        .HasColumnType("integer");

                    b.Property<string>("LongDescription")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ShortDescription")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("LocationId");

                    b.ToTable("WeddingHalls");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.WeddingPricing", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Currency")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric");

                    b.Property<int>("WeddingId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("WeddingId");

                    b.ToTable("WeddingPricings");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Availability", b =>
                {
                    b.HasOne("DugunSalonuKiralama.Domain.Entities.WeddingHall", "WeddingHall")
                        .WithMany()
                        .HasForeignKey("WeddingHallId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WeddingHall");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Booking", b =>
                {
                    b.HasOne("DugunSalonuKiralama.Domain.Entities.Wedding", "Wedding")
                        .WithMany()
                        .HasForeignKey("WeddingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Wedding");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Schedule", b =>
                {
                    b.HasOne("DugunSalonuKiralama.Domain.Entities.WeddingHall", "WeddingHall")
                        .WithMany()
                        .HasForeignKey("WeddingHallId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WeddingHall");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Testimonial", b =>
                {
                    b.HasOne("DugunSalonuKiralama.Domain.Entities.Wedding", "Wedding")
                        .WithMany("Testimonials")
                        .HasForeignKey("WeddingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Wedding");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Wedding", b =>
                {
                    b.HasOne("DugunSalonuKiralama.Domain.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DugunSalonuKiralama.Domain.Entities.Location", "Location")
                        .WithMany("Weddings")
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Location");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.WeddingFeature", b =>
                {
                    b.HasOne("DugunSalonuKiralama.Domain.Entities.Feature", "Feature")
                        .WithMany("WeddingFeatures")
                        .HasForeignKey("FeatureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DugunSalonuKiralama.Domain.Entities.Wedding", "Wedding")
                        .WithMany("WeddingFeatures")
                        .HasForeignKey("WeddingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Feature");

                    b.Navigation("Wedding");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.WeddingHall", b =>
                {
                    b.HasOne("DugunSalonuKiralama.Domain.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DugunSalonuKiralama.Domain.Entities.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Location");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.WeddingPricing", b =>
                {
                    b.HasOne("DugunSalonuKiralama.Domain.Entities.Wedding", "Wedding")
                        .WithMany("WeddingPricings")
                        .HasForeignKey("WeddingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Wedding");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Feature", b =>
                {
                    b.Navigation("WeddingFeatures");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Location", b =>
                {
                    b.Navigation("Weddings");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Wedding", b =>
                {
                    b.Navigation("Testimonials");

                    b.Navigation("WeddingFeatures");

                    b.Navigation("WeddingPricings");
                });
#pragma warning restore 612, 618
        }
    }
}
