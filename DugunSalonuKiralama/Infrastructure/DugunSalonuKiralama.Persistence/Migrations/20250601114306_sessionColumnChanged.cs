using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DugunSalonuKiralama.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class sessionColumnChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Session",
                table: "WeddingHalls");

            migrationBuilder.AddColumn<string>(
                name: "Session",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Session",
                table: "Bookings");

            migrationBuilder.AddColumn<string>(
                name: "Session",
                table: "WeddingHalls",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
