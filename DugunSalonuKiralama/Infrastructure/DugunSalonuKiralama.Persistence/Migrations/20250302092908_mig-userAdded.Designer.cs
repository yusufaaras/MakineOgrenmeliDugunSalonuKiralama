﻿// <auto-generated />
using System;
using DugunSalonuKiralama.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DugunSalonuKiralama.Persistence.Migrations
{
    [DbContext(typeof(WeddingHallContext))]
    [Migration("20250302092908_mig-userAdded")]
    partial class miguserAdded
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Booking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("BookingDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("GuestCount")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("TotalPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("WeddingHallId")
                        .HasColumnType("int");

                    b.Property<int>("WeddingId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WeddingHallId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Feature", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Features");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Schedule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("time");

                    b.Property<DateTime>("EventDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsReserved")
                        .HasColumnType("bit");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("time");

                    b.Property<int>("WeddingHallId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WeddingHallId");

                    b.ToTable("Schedules");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Testimonial", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("WeddingHallId")
                        .HasColumnType("int");

                    b.Property<int>("WeddingId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WeddingHallId");

                    b.ToTable("Testimonials");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.WeddingFeature", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("FeatureId")
                        .HasColumnType("int");

                    b.Property<int>("WeddingHallId")
                        .HasColumnType("int");

                    b.Property<int>("WeddingId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FeatureId");

                    b.HasIndex("WeddingHallId");

                    b.ToTable("WeddingFeatures");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.WeddingHall", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Capacity")
                        .HasColumnType("int");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("DetailImageUrl1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DetailImageUrl2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DetailImageUrl3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DetailImageUrl4")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HomeImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LocationId")
                        .HasColumnType("int");

                    b.Property<string>("LongDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShortDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("LocationId");

                    b.ToTable("WeddingHalls");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.WeddingPricing", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Currency")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("WeddingHallId")
                        .HasColumnType("int");

                    b.Property<int>("WeddingId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WeddingHallId");

                    b.ToTable("WeddingPricings");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Booking", b =>
                {
                    b.HasOne("DugunSalonuKiralama.Domain.Entities.WeddingHall", "WeddingHall")
                        .WithMany()
                        .HasForeignKey("WeddingHallId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WeddingHall");
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
                    b.HasOne("DugunSalonuKiralama.Domain.Entities.WeddingHall", "WeddingHall")
                        .WithMany()
                        .HasForeignKey("WeddingHallId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WeddingHall");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.WeddingFeature", b =>
                {
                    b.HasOne("DugunSalonuKiralama.Domain.Entities.Feature", "Feature")
                        .WithMany("WeddingFeatures")
                        .HasForeignKey("FeatureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DugunSalonuKiralama.Domain.Entities.WeddingHall", "WeddingHall")
                        .WithMany()
                        .HasForeignKey("WeddingHallId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Feature");

                    b.Navigation("WeddingHall");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.WeddingHall", b =>
                {
                    b.HasOne("DugunSalonuKiralama.Domain.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DugunSalonuKiralama.Domain.Entities.Location", "Location")
                        .WithMany("WeddingHalls")
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Location");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.WeddingPricing", b =>
                {
                    b.HasOne("DugunSalonuKiralama.Domain.Entities.WeddingHall", "WeddingHall")
                        .WithMany()
                        .HasForeignKey("WeddingHallId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WeddingHall");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Feature", b =>
                {
                    b.Navigation("WeddingFeatures");
                });

            modelBuilder.Entity("DugunSalonuKiralama.Domain.Entities.Location", b =>
                {
                    b.Navigation("WeddingHalls");
                });
#pragma warning restore 612, 618
        }
    }
}
