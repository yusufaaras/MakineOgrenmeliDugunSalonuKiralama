using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DugunSalonuKiralama.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class allTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.CreateTable(
                name: "ViewedHalls",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WeddingHallId = table.Column<int>(type: "int", nullable: false),
                    ViewedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ViewedHalls", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ViewedHalls_WeddingHalls_WeddingHallId",
                        column: x => x.WeddingHallId,
                        principalTable: "WeddingHalls",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });


            migrationBuilder.CreateIndex(
                name: "IX_ViewedHalls_WeddingHallId",
                table: "ViewedHalls",
                column: "WeddingHallId");

            


           

           
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Authors");

            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropTable(
                name: "Testimonials");

            migrationBuilder.DropTable(
                name: "ViewedHalls");

            migrationBuilder.DropTable(
                name: "WeddingFeatures");

            migrationBuilder.DropTable(
                name: "WeddingPricings");

            migrationBuilder.DropTable(
                name: "Features");

            migrationBuilder.DropTable(
                name: "WeddingHalls");

            migrationBuilder.DropTable(
                name: "AppUsers");

            migrationBuilder.DropTable(
                name: "AppRoles");
        }
    }
}
