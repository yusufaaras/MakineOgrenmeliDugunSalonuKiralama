using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DugunSalonuKiralama.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class udategBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Bookings",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "GuestCount",
                table: "Bookings",
                newName: "Capacity");

            migrationBuilder.AddColumn<string>(
                name: "Alcohol",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Cookie",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Food",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Alcohol",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "Cookie",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "Food",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Bookings",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "Capacity",
                table: "Bookings",
                newName: "GuestCount");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPrice",
                table: "Bookings",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
