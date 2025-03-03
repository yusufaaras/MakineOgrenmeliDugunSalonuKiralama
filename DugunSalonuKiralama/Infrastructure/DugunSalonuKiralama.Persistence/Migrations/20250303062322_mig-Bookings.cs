using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DugunSalonuKiralama.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class migBookings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bookings_WeddingHallId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "WeddingId",
                table: "Bookings");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_WeddingHallId",
                table: "Bookings",
                column: "WeddingHallId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bookings_WeddingHallId",
                table: "Bookings");

            migrationBuilder.AddColumn<int>(
                name: "WeddingId",
                table: "Bookings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_WeddingHallId",
                table: "Bookings",
                column: "WeddingHallId");
        }
    }
}
