using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DugunSalonuKiralama.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class migFixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeddingHalls_Categories_CategoryId",
                table: "WeddingHalls");

            migrationBuilder.DropForeignKey(
                name: "FK_WeddingHalls_Locations_LocationId",
                table: "WeddingHalls");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropIndex(
                name: "IX_WeddingHalls_CategoryId",
                table: "WeddingHalls");

            migrationBuilder.DropIndex(
                name: "IX_WeddingHalls_LocationId",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "WeddingHalls");

            migrationBuilder.RenameColumn(
                name: "LocationId",
                table: "WeddingHalls",
                newName: "PostalCode");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "WeddingHalls",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Alcohol",
                table: "WeddingHalls",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CategoryName",
                table: "WeddingHalls",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "WeddingHalls",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Cookie",
                table: "WeddingHalls",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "WeddingHalls",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Food",
                table: "WeddingHalls",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "Alcohol",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "CategoryName",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "City",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "Cookie",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "WeddingHalls");

            migrationBuilder.DropColumn(
                name: "Food",
                table: "WeddingHalls");

            migrationBuilder.RenameColumn(
                name: "PostalCode",
                table: "WeddingHalls",
                newName: "LocationId");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "WeddingHalls",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostalCode = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WeddingHalls_CategoryId",
                table: "WeddingHalls",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_WeddingHalls_LocationId",
                table: "WeddingHalls",
                column: "LocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_WeddingHalls_Categories_CategoryId",
                table: "WeddingHalls",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WeddingHalls_Locations_LocationId",
                table: "WeddingHalls",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
