using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DugunSalonuKiralama.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RemoveWeddingEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Weddings_WeddingId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Testimonials_Weddings_WeddingId",
                table: "Testimonials");

            migrationBuilder.DropForeignKey(
                name: "FK_WeddingFeatures_Weddings_WeddingId",
                table: "WeddingFeatures");

            migrationBuilder.DropForeignKey(
                name: "FK_WeddingPricings_Weddings_WeddingId",
                table: "WeddingPricings");

            migrationBuilder.DropTable(
                name: "Weddings");

            migrationBuilder.DropIndex(
                name: "IX_WeddingPricings_WeddingId",
                table: "WeddingPricings");

            migrationBuilder.DropIndex(
                name: "IX_WeddingFeatures_WeddingId",
                table: "WeddingFeatures");

            migrationBuilder.DropIndex(
                name: "IX_Testimonials_WeddingId",
                table: "Testimonials");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_WeddingId",
                table: "Bookings");

            migrationBuilder.AddColumn<int>(
                name: "WeddingHallId",
                table: "WeddingPricings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WeddingHallId",
                table: "WeddingFeatures",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WeddingHallId",
                table: "Testimonials",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WeddingHallId",
                table: "Bookings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WeddingPricings_WeddingHallId",
                table: "WeddingPricings",
                column: "WeddingHallId");

            migrationBuilder.CreateIndex(
                name: "IX_WeddingFeatures_WeddingHallId",
                table: "WeddingFeatures",
                column: "WeddingHallId");

            migrationBuilder.CreateIndex(
                name: "IX_Testimonials_WeddingHallId",
                table: "Testimonials",
                column: "WeddingHallId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_WeddingHallId",
                table: "Bookings",
                column: "WeddingHallId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_WeddingHalls_WeddingHallId",
                table: "Bookings",
                column: "WeddingHallId",
                principalTable: "WeddingHalls",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Testimonials_WeddingHalls_WeddingHallId",
                table: "Testimonials",
                column: "WeddingHallId",
                principalTable: "WeddingHalls",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WeddingFeatures_WeddingHalls_WeddingHallId",
                table: "WeddingFeatures",
                column: "WeddingHallId",
                principalTable: "WeddingHalls",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WeddingPricings_WeddingHalls_WeddingHallId",
                table: "WeddingPricings",
                column: "WeddingHallId",
                principalTable: "WeddingHalls",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_WeddingHalls_WeddingHallId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Testimonials_WeddingHalls_WeddingHallId",
                table: "Testimonials");

            migrationBuilder.DropForeignKey(
                name: "FK_WeddingFeatures_WeddingHalls_WeddingHallId",
                table: "WeddingFeatures");

            migrationBuilder.DropForeignKey(
                name: "FK_WeddingPricings_WeddingHalls_WeddingHallId",
                table: "WeddingPricings");

            migrationBuilder.DropIndex(
                name: "IX_WeddingPricings_WeddingHallId",
                table: "WeddingPricings");

            migrationBuilder.DropIndex(
                name: "IX_WeddingFeatures_WeddingHallId",
                table: "WeddingFeatures");

            migrationBuilder.DropIndex(
                name: "IX_Testimonials_WeddingHallId",
                table: "Testimonials");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_WeddingHallId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "WeddingHallId",
                table: "WeddingPricings");

            migrationBuilder.DropColumn(
                name: "WeddingHallId",
                table: "WeddingFeatures");

            migrationBuilder.DropColumn(
                name: "WeddingHallId",
                table: "Testimonials");

            migrationBuilder.DropColumn(
                name: "WeddingHallId",
                table: "Bookings");

            migrationBuilder.CreateTable(
                name: "Weddings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Weddings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Weddings_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Weddings_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WeddingPricings_WeddingId",
                table: "WeddingPricings",
                column: "WeddingId");

            migrationBuilder.CreateIndex(
                name: "IX_WeddingFeatures_WeddingId",
                table: "WeddingFeatures",
                column: "WeddingId");

            migrationBuilder.CreateIndex(
                name: "IX_Testimonials_WeddingId",
                table: "Testimonials",
                column: "WeddingId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_WeddingId",
                table: "Bookings",
                column: "WeddingId");

            migrationBuilder.CreateIndex(
                name: "IX_Weddings_CategoryId",
                table: "Weddings",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Weddings_LocationId",
                table: "Weddings",
                column: "LocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Weddings_WeddingId",
                table: "Bookings",
                column: "WeddingId",
                principalTable: "Weddings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Testimonials_Weddings_WeddingId",
                table: "Testimonials",
                column: "WeddingId",
                principalTable: "Weddings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WeddingFeatures_Weddings_WeddingId",
                table: "WeddingFeatures",
                column: "WeddingId",
                principalTable: "Weddings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WeddingPricings_Weddings_WeddingId",
                table: "WeddingPricings",
                column: "WeddingId",
                principalTable: "Weddings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
